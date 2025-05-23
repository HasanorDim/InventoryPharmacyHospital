import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import supabase from "../lib/supabase";

export const useProductStore = create((set, get) => ({
  isProduct: false,

  setProduct: async (data) => {
    set({ isProduct: true });
    try {
      await axiosInstance.post("/product/add-product", data);

      toast.success("Medicine added successfully");
    } catch (error) {
      console.log("Error from adding product", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add Product!"
      );
    } finally {
      set({ isProduct: false });
    }
  },
}));
