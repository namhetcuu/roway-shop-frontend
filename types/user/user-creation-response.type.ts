// auth/user.types.ts
export interface UserResponse {
    id: number;
    username: string;
    name: string;
    authorities: RoleResponse
    email: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
}
  
export interface RoleResponse {
   role: string;
}
  export interface AuthResponse {
    user: UserResponse;
    token: string;
  }

