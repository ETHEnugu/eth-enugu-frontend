/* eslint-disable */
import axios from "axios";
import { toast } from "sonner";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create a separate client for multipart requests
const multipartApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Shared token attachment function
const attachToken = (config: any) => {
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
};

// Shared error handler
const handleRequestError = (error: any) => {
  toast.error("Request error: " + error.message);
  return Promise.reject(error);
};

// Shared response error handler
const handleResponseError = (error: any) => {
  if (
    error?.response?.data?.detail?.includes("please verify your email address")
  ) {
    return Promise.reject(error);
  }

  const isBrowser = typeof window !== "undefined";

  if (error.response?.status === 401) {
    if (isBrowser) {
      const currentPath = window.location.pathname;
      const isProtectedRoute = currentPath.startsWith("/admin");

      if (isProtectedRoute) {
        toast.error("Session expired. Redirecting to login...");
        window.location.href = "/auth/login";
      }
    }
  } else {
    console.error(error.response?.data?.message || "An error occurred.");
  }
  return Promise.reject(error);
};

// Apply interceptors to regular API client
apiClient.interceptors.request.use(attachToken, handleRequestError);
apiClient.interceptors.response.use(
  (response) => response,
  handleResponseError
);

// Apply interceptors to multipart API client
multipartApiClient.interceptors.request.use(attachToken, handleRequestError);
multipartApiClient.interceptors.response.use(
  (response) => response,
  handleResponseError
);

export default apiClient;
export { multipartApiClient };
