import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API}/token/`, { username, password });
    localStorage.setItem("token", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);
    return {
      access: response.data.access,
      refresh: response.data.refresh,
    };
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Optionally, you can throw an error to handle in the component
  }
};

export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) {
      throw new Error("No refresh token found.");
    }
    const response = await axios.post(`${API}/token/refresh/`, { refresh });
    localStorage.setItem("token", response.data.access);
    return response.data.access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    throw error; // This will force a logout if refreshing the token fails
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  // Optionally, redirect to login page here:
  // window.location.href = "/login";
};
