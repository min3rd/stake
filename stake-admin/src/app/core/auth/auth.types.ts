import { User } from "../user/user.types"

export interface SignIn {
    accessToken?: string;
    refreshToken?: string;
    socketToken?: string;
    user?: User;
}