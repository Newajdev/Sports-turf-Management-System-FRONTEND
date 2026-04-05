export type UserRole = "SYSTEM_ADMIN" | "TURF_OWNER" | "PLAYER";

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify-email",
  "/auth/verify-otp",
];


export function isAuthRoute(pathname: string): boolean {
  return authRoutes.some((route:string)=> route === pathname);
}


export type RouteConfig = {
    exact: string[];
    pattern: RegExp[];
}

export const CommonProtectedRoutes: RouteConfig = {
    exact: ["/profile", "/change-password"],
    pattern: [],
}

export const SystemAdminRoutes: RouteConfig = {
    pattern: [/^\/admin(\/.*)?$/],
    exact: [],
}
export const TurfOwnerRoutes: RouteConfig = {
    pattern: [/^\/turf-owner(\/.*)?$/],
    exact: [],
}

export const PlayersRoutes: RouteConfig = {
    pattern: [/^\/dashboard/],
    exact: ["/payment/success", "/payment/failure"],
}

export const isRouteMatches = (pathname: string, route: RouteConfig) => {
    if (route.exact.includes(pathname)) {
        return true;
    }
    return route.pattern.some((pattern) => pattern.test(pathname));
}

export const getRouteOwner = (pathname: string): UserRole | "COMMON" | null => {
    if (isRouteMatches(pathname, CommonProtectedRoutes)) {
        return "COMMON";
    }
    if (isRouteMatches(pathname, SystemAdminRoutes)) {
        return "SYSTEM_ADMIN";
    }
    if (isRouteMatches(pathname, TurfOwnerRoutes)) {
        return "TURF_OWNER";
    }
    if (isRouteMatches(pathname, PlayersRoutes)) {
        return "PLAYER";
    }
    return null;
}

export const defaultDashboardRoute = (role: UserRole) => {
    if (role === "SYSTEM_ADMIN") {
        return "/admin/dashboard";
    } 
    if (role === "TURF_OWNER") {
        return "/turf-owner/dashboard";
    }
    if (role === "PLAYER") {
        return "/dashboard";
    }
    return "/"; 
}


export const isValidRedirectForRole = (redirectPath: string, role: UserRole) => {
    const routeOwner = getRouteOwner(redirectPath);
    if (routeOwner === "COMMON" || routeOwner === null) {
        return true;
    }
    if (routeOwner === role) {
        return true;
    }
    return false;
}
