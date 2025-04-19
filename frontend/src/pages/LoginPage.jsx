import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // make sure path is correct
import { loginUser } from "../services/auth";
import { showErrorToast, showSuccessToast } from "../utils/ToastHelper"; // Importing Toast helper functions

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ using AuthContext

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Attempt to login user and get access and refresh tokens
      const { access, refresh } = await loginUser(username, password);
      // Store tokens locally
      localStorage.setItem("token", access);
      localStorage.setItem("refreshToken", refresh);

      // Update context with new token
      login(access);

      // Show success toast
      showSuccessToast("Login successful!");
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      // Handle errors with detailed feedback
      if (err.response?.status === 401) {
        setError("Invalid username or password.");
        showErrorToast("Invalid username or password.");
      } else {
        setError("Something went wrong. Please try again.");
        showErrorToast("Something went wrong. Please try again.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Login</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
