import { LoginResponse } from "@/hooks/auth/apiTypes";
import axios from "axios";

const API_URL = "http://localhost:8080/auth"; // Địa chỉ API Spring Boot

// Login function
export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { username, password },
      { withCredentials: true }
    );
    return response.data; // Return data from API
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed. Please check your credentials.");
  }
};
// Google OAuth2 login function
export const googleLogin = async (googleToken: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/oauth2/google`, { token: googleToken });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Google login error:", error);
    throw new Error("Google login failed. Please try again.");
  }
};

// Register function
export const registerUser = async (
  username: string,
  password: string,
  email: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
      email,
    });
    return response.data; // Return data from API
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Registration failed. Please try again.");
  }
};

// // Logout function
// export const logoutUser = () => {
//   document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
//   console.log("Logged out, token cleared");
// };
