import { getUserInfo } from "@/services/auth.services";
import NavbarContent from "./navbarContent";

export const Navber = async () => {
  const userInfo = await getUserInfo();

  return <NavbarContent userInfo={userInfo} />;
};
