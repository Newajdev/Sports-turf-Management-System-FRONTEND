import { Role, UserStatus } from "@/interface/enum.interface";

export interface ILoginResponse {
  betterAuthToken: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string;
    role: Role;
    userStatus: UserStatus;
    needPasswordChange: boolean;
    isDeleted: boolean;
    deletedAt?: Date;
  };
}
   