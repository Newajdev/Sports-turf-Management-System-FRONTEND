import { NextRequest, NextResponse } from "next/server";
import {
  defaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";
import { jwtUtils } from "./lib/jwtUtils";
import { isTokenExpiringSoon } from "./lib/tokenUtils";
import {
  getNewTokensWithRefreshToken,
  getUserInfo,
} from "./services/auth.services";

async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
  try {
    const refresh = await getNewTokensWithRefreshToken(refreshToken);
    if (!refresh) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const pathWithQuery = `${pathname}${request.nextUrl.search}`;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    const decodedAccessToken =
      accessToken &&
      jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
        .data;

    const isValidAccessToken =
      accessToken &&
      jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
        .success;

    let userRole: UserRole | null = null;

    if (decodedAccessToken) {
      userRole = decodedAccessToken.role as UserRole;
    }

    const routerOwner = getRouteOwner(pathname);

    const isAuth = isAuthRoute(pathname);

    if (
      isValidAccessToken &&
      refreshToken &&
      (await isTokenExpiringSoon(accessToken))
    ) {
      const requestHeaders = new Headers(request.headers);

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      try {
        const refreshed = await refreshTokenMiddleware(refreshToken);

        if (refreshed) {
          requestHeaders.set("x-token-refreshed", "1");
        }

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
          headers: response.headers,
        });
      } catch (error) {}

      return response;
    }

    if (
      isAuth &&
      isValidAccessToken &&
      pathname !== "/auth/verify-email" &&
      pathname !== "/auth/reset-password"
    ) {
      return NextResponse.redirect(
        new URL(defaultDashboardRoute(userRole as UserRole), request.url),
      );
    }

    if (pathname === "/auth/reset-password") {
      const email = request.nextUrl.searchParams.get("email");

      if (accessToken && email) {
        const userInfo = await getUserInfo();

        if (userInfo.needPasswordChange) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(
            new URL(defaultDashboardRoute(userRole as UserRole), request.url),
          );
        }
      }

      if (email) {
        return NextResponse.next();
      }

      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathWithQuery);
      return NextResponse.redirect(loginUrl);
    }

    if (routerOwner === null) {
      return NextResponse.next();
    }

    if (!accessToken || !isValidAccessToken) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathWithQuery);
      return NextResponse.redirect(loginUrl);
    }

    if (accessToken) {
      const userInfo = await getUserInfo();

      if (userInfo) {
        if (userInfo.emailVerified === false) {
          if (pathname !== "/auth/verify-email") {
            const verifyEmailUrl = new URL("/auth/verify-email", request.url);
            verifyEmailUrl.searchParams.set("email", userInfo.email);
            return NextResponse.redirect(verifyEmailUrl);
          }

          return NextResponse.next();
        }

        if (userInfo.emailVerified && pathname === "/auth/verify-email") {
          return NextResponse.redirect(
            new URL(defaultDashboardRoute(userRole as UserRole), request.url),
          );
        }

        if (userInfo.needPasswordChange) {
          if (
            pathname !== "/auth/change-password" &&
            pathname !== "/change-password"
          ) {
            const changePasswordUrl = new URL(
              "/auth/change-password",
              request.url,
            );
            changePasswordUrl.searchParams.set("email", userInfo.email);
            return NextResponse.redirect(changePasswordUrl);
          }

          return NextResponse.next();
        }

        if (
          !userInfo.needPasswordChange &&
          (pathname === "/auth/reset-password" ||
            pathname === "/auth/change-password" ||
            pathname === "/change-password")
        ) {
          return NextResponse.redirect(
            new URL(defaultDashboardRoute(userRole as UserRole), request.url),
          );
        }
      }
    }

    if (routerOwner === "COMMON") {
      return NextResponse.next();
    }

    if (
      routerOwner === "SYSTEM_ADMIN" ||
      routerOwner === "TURF_OWNER" ||
      routerOwner === "PLAYER"
    ) {
      if (routerOwner !== userRole) {
        return NextResponse.redirect(
          new URL(defaultDashboardRoute(userRole as UserRole), request.url),
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
