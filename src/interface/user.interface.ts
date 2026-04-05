import { Role, UserStatus } from "./enum.interface";

export interface IBase {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser extends IBase {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: Role;
  userStatus: UserStatus;
  needPasswordChange: boolean;
  isDeleted: boolean;

  player?: IPlayer | null;
  turfOwner?: ITurfOwner | null;
}

export interface IPlayer extends IBase {
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber?: string | null;
  isDeleted: boolean;
  userId: string;
}

export interface ITurfOwner extends IBase {
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber?: string | null;
  isDeleted: boolean;
  userId: string;
}
