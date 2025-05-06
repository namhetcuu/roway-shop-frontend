import { UserResponse } from "types/user/user-creation-response.type";

export interface AuthResponse {
    user: UserResponse;
    token: string;
}


