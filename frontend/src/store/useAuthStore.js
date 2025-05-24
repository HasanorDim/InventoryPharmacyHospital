import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import supabase from "../lib/supabase.js";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: false,
  socket: null,

  checkUser: async () => {
    try {
      await axiosInstance.get("/auth/check");
    } catch (error) {
      if (window.stopCheckUserInterval) {
        window.stopCheckUserInterval(); // ✅ This clears that specific interval
      }
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLogingIn: true });
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      toast.success("Logged In");
    } catch (error) {
      console.log("Error in login Auth Store", error);
      toast.error(error.response?.data.message || "Failed to login");
    } finally {
      set({ isLogingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.log("Error in logout");
      toast.error("Failed to logout");
    }
  },
}));
