import { Subscription } from "./subscription";
import { User as GoogleUser } from "firebase/auth";

export enum USER_TYPE {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum USER_STATE {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  REVOKED = "REVOKED",
}

export type User = {
  id: string;
  oauthUser?: GoogleUser;
  type: USER_TYPE;
  subcription: Subscription;
};
