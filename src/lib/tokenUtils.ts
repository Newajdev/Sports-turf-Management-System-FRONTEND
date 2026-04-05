"use server"

import  jwt, { JwtPayload }  from "jsonwebtoken";
import { setCookie } from "./cookieUtils";


const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

const getTokenExpiryTime = (token: string): number => {
    if (!token) return 0;
  try {
      const tokenPayload = JWT_ACCESS_SECRET
        ? (jwt.verify(token, JWT_ACCESS_SECRET as string) as JwtPayload)
        : (jwt.decode(token) as JwtPayload);
      
      if (tokenPayload && !tokenPayload.exp) {
          return 0;
      }

      const remainingtime = tokenPayload.exp as number - Math.floor(Date.now() / 1000);

      return remainingtime > 0 ? remainingtime : 0;

    } catch (error) {
        console.error("Invalid token:", error);
        return 0;
    }
};


export const setTokenInCookies = async (
    name: string,
    token: string
) => {
    const maxage = getTokenExpiryTime(token);

    await setCookie(name, token, maxage);
}