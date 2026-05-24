import { cookies } from "next/headers";

export const setCookie = async (
    name: string,
    value: string,
    maxAge: number
) => {
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: maxAge,
    });
}


export const getCookie = async (name: string): Promise<string | undefined> => {
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get(name)?.value;
    return cookieValue;
}

export const deleteCookie = async (name: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(name)
}
