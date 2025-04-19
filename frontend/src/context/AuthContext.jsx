import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance"; // Custom Axios instance for API calls

export const AuthContext = createContext();

const getValidUserFromToken = (token) => {
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const [user, setUser] = useState(getValidUserFromToken(token));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Add error state

  // Automatically sync token and user info when token changes
  useEffect(() => {
    if (token) {
      const userFromToken = getValidUserFromToken(token);
      setUser(userFromToken);
    } else {
      setUser(null);
    }
  }, [token]);

  // Check token expiry and refresh if needed
  const checkTokenExpiry = () => {
    if (token) {
      const decodedToken = getValidUserFromToken(token);
      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        refreshAuthToken(); // Refresh if expired
      }
    }
  };

  useEffect(() => {
    checkTokenExpiry(); // Check expiry on initial load
  }, [token]);

  // Function to login the user and store token & refreshToken
  const login = (newToken, newRefreshToken) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    setToken(newToken);
    setRefreshToken(newRefreshToken);
    setError(null); // Reset error on successful login
  };

  // Function to logout the user and clear tokens
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    setError(null); // Reset error on logout
  };

  // Function to refresh the token using the refresh token
  const refreshAuthToken = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/auth/refresh/", {
        refresh_token: refreshToken,
      });
      const { access_token, refresh_token } = response.data;
      login(access_token, refresh_token); // Update tokens and re-login
    } catch (error) {
      console.error("Error refreshing token:", error);
      setError("Session expired. Please log in again.");
      logout(); // Log out on failure
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
