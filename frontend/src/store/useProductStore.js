import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  isProduct: false,

  setProduct: async (data) => {
    set({ isProduct: true });
    try {
      const response = await axiosInstance.post("/product/add-product", data);
    } catch (error) {
      console.log("Error from adding product", error);
      toast.error(error.response.data.message || "Failed to add Product!");
    } finally {
      set({ isProduct: false });
    }
  },
}));
