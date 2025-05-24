import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import supabase from "../lib/supabase";

export const useProductStore = create((set, get) => ({
  isProduct: false,
  isLoadingCategory: false,
  isLoadingForm: false,
  categories: [],
  dosageForms: [],

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

  setCategory: async (data) => {
    set({ isLoadingCategory: true });
    try {
      await axiosInstance.post("/product/add-categroy", data);
      toast.success("Category Added");
      return { success: true };
    } catch (error) {
      console.log("Error in set category: ", error);
      const err = error?.response?.data?.message || "Failed to add Category";
      toast.error(err);
    } finally {
      set({ isLoadingCategory: false });
    }
  },

  getCategory: async () => {
    try {
      const response = await axiosInstance.get("/product/category-form-data");
      console.log("getCategory: ", response.data);
      set({ categories: response.data });
    } catch (error) {
      console.log("Error in set category: ", error);
      const err = error?.response?.data?.message || "Failed to add Category";
      toast.error(err);
    } finally {
    }
  },

  setDosageForm: async (data) => {
    set({ isLoadingForm: true });
    try {
      await axiosInstance.post("/product/add-dosage-form", data);
      toast.success("Dosage Form Added");
      return { success: true };
    } catch (error) {
      console.log("Error in set category: ", error);
      const err = error?.response?.data?.message || "Failed to add Dosage Form";
      toast.error(err);
    } finally {
      set({ isLoadingForm: false });
    }
  },

  getDosageForm: async () => {
    try {
      const response = await axiosInstance.get("/product/dosage-form-data");
      set({ dosageForms: response.data });
    } catch (error) {
      console.log("Error in set category: ", error);
      const err = error?.response?.data?.message || "Failed to add Category";
      toast.error(err);
    } finally {
    }
  },
}));
