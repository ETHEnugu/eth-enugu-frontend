import axios from "axios";
import { toast } from "sonner";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      try {
        const cookies = document.cookie.split("; ");
        const authToken = cookies.find((cookie) =>
          cookie.startsWith("eth-enugu-token=")
        );
        if (authToken) {
          const token = authToken.split("=")[1];
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error parsing token from cookies:", error);
        toast.error("Failed to parse authentication token from cookies.");
      }
    }
    return config;
  },
  (error) => {
    toast.error("Request error: " + error.message);
    return Promise.reject(error);
  }
);

// Response interceptor with improved 401 handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.data?.detail?.includes(
        "please verify your email address"
      )
    ) {
      return Promise.reject(error);
    }

    const isBrowser = typeof window !== "undefined";

    if (error.response?.status === 401) {
      // Only redirect for 401 errors on protected routes
      if (isBrowser) {
        const currentPath = window.location.pathname;

        // Define protected routes that require authentication
        const isProtectedRoute = currentPath.startsWith("/admin");
        // currentPath.startsWith("/tutor") ||
        // currentPath.startsWith("/cart") ||
        // currentPath.startsWith("/wishlist") ||
        // currentPath.startsWith("/profile");

        // Only redirect if on a protected route
        if (isProtectedRoute) {
          toast.error("Session expired. Redirecting to login...");
          window.location.href = "/auth/login";
        }
      }
    } else {
      console.error(error.response?.data?.message || "An error occurred.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
