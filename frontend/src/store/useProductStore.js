import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import supabase from "../lib/supabase";

export const useProductStore = create((set, get) => ({
  isProduct: false,
  isLoadingCategory: false,
  isLoadingForm: false,
  isLoadingUnit: false,
  isLoadingDeletingUnit: false,
  isLoadingStorage: false,
  isLoadingDeletingStorage: false,
  productsState: [],
  categories: [],
  dosageForms: [],
  unit: [],
  storage: [],

  getData: async () => {
    try {
      const response = await axiosInstance.get("/product/all-data");
      set({ productsState: response.data.medicineRes.data });
      set({ dosageForms: response.data.dosageRes.data });
      set({ unit: response.data.unitRes.data });
      set({ storage: response.data.storageRes.data });
      set({ categories: response.data.categoriesRes.data });
    } catch (error) {
      console.log("Error in set category: ", error);
      const err = error?.response?.data?.message || "Failed to add Category";
      toast.error(err);
    } finally {
    }
  },

  setProduct: async (data) => {
    set({ isProduct: true });
    try {
      const response = await axiosInstance.post("/product/add-product", data);
      set({ productsState: response.data });
      toast.success("Medicine added successfully");
      return { success: true };
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

  setEditProduct: async (data) => {
    set({ isProduct: true });
    try {
      const response = await axiosInstance.post("/product/edit-product", data);
      set({ productsState: response.data });
      toast.success("Product updated");
      return { success: true };
    } catch (error) {
      console.log("Error in set updated Product: ", error);
      const err = error?.response?.data?.message || "Failed to update Product";
      toast.error(err);
    } finally {
      set({ isProduct: false });
    }
  },

  setDeleteProduct: async (data) => {
    set({ isProduct: true });
    try {
      const response = await axiosInstance.post(
        "/product/delete-product",
        data
      );
      set({ productsState: response.data });
      toast.success("Product removed");
      return { success: true };
    } catch (error) {
      console.log("Error in set removed Product: ", error);
      const err = error?.response?.data?.message || "Failed to removed Product";
      toast.error(err);
    } finally {
      set({ isProduct: false });
    }
  },

  setCategory: async (data) => {
    set({ isLoadingCategory: true });
    try {
      const response = await axiosInstance.post("/product/add-categroy", data);
      set({ categories: response.data });
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

  setEditCategory: async (data) => {
    set({ isLoadingCategory: true });
    try {
      const response = await axiosInstance.post("/product/edit-category", data);
      set({ categories: response.data });
      toast.success("Category updated");
      return { success: true };
    } catch (error) {
      console.log("Error in set updated category: ", error);
      const err = error?.response?.data?.message || "Failed to update Category";
      toast.error(err);
    } finally {
      set({ isLoadingCategory: false });
    }
  },

  setDeleteCategory: async (data) => {
    set({ isLoadingCategory: true });
    try {
      const response = await axiosInstance.post(
        "/product/delete-category",
        data
      );
      set({ categories: response.data });
      toast.success("Category removed");
      return { success: true };
    } catch (error) {
      console.log("Error in set removed category: ", error);
      const err =
        error?.response?.data?.message || "Failed to removed Category";
      toast.error(err);
    } finally {
      set({ isLoadingCategory: false });
    }
  },

  setDosageForm: async (data) => {
    set({ isLoadingForm: true });
    try {
      const response = await axiosInstance.post(
        "/product/add-dosage-form",
        data
      );
      set({ dosageForms: response.data });
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

  setEditDosage: async (data) => {
    set({ isLoadingForm: true });
    try {
      const response = await axiosInstance.post("/product/edit-dosage", data);
      set({ dosageForms: response.data });
      toast.success("Dosage updated");
      return { success: true };
    } catch (error) {
      console.log("Error in set updated Dosage: ", error);
      const err = error?.response?.data?.message || "Failed to update Dosage";
      toast.error(err);
    } finally {
      set({ isLoadingForm: false });
    }
  },

  setDeleteDosage: async (data) => {
    set({ isLoadingForm: true });
    try {
      const response = await axiosInstance.post("/product/delete-dosage", data);
      set({ dosageForms: response.data });
      toast.success("Dosage form removed");
      return { success: true };
    } catch (error) {
      console.log("Error in set removed Dosage form: ", error);
      const err =
        error?.response?.data?.message || "Failed to removed Dosage form";
      toast.error(err);
    } finally {
      set({ isLoadingForm: false });
    }
  },

  setNewUnit: async (data) => {
    set({ isLoadingUnit: true });
    try {
      const response = await axiosInstance.post("/product/add-unit", data);
      set({ unit: response.data });
      toast.success("Unit Added", { id: "unit-success" });
      return { success: true };
    } catch (error) {
      console.log("Error in set unit: ", error);
      const err = error?.response?.data?.message || "Failed to add Unit";
      toast.error(err, { id: "unit-error" });
    } finally {
      set({ isLoadingUnit: false });
    }
  },

  setNewStorage: async (data) => {
    set({ isLoadingStorage: true });
    try {
      const response = await axiosInstance.post("/product/add-storage", data);
      set({ storage: response.data });
      toast.success("Storage form Added", { id: "storage-success" });
      return { success: true };
    } catch (error) {
      console.log("Error in set Storage: ", error);
      const err = error?.response?.data?.message || "Failed to add Storage";
      toast.error(err, { id: "storage-error" });
    } finally {
      set({ isLoadingStorage: false });
    }
  },

  // Delete

  deleteUnit: async (data) => {
    set({ isLoadingDeletingUnit: true });
    try {
      const response = await axiosInstance.post("/product/delete-unit", data);
      set({ unit: response.data });
      toast.success("Unit deleted", { id: "unit-success" });
    } catch (error) {
      console.log("Error in set unit: ", error);
      const err = error?.response?.data?.message || "Failed to delete unit";
      toast.error(err, { id: "unit-error" });
    } finally {
      set({ isLoadingDeletingUnit: false });
    }
  },

  deleteStorage: async (data) => {
    set({ isLoadingDeletingStorage: true });
    try {
      const response = await axiosInstance.post(
        "/product/delete-storage",
        data
      );
      set({ storage: response.data });
      toast.success("Unit deleted", { id: "unit-success" });
    } catch (error) {
      console.log("Error in set unit: ", error);
      const err = error?.response?.data?.message || "Failed to delete unit";
      toast.error(err, { id: "unit-error" });
    } finally {
      set({ isLoadingDeletingStorage: false });
    }
  },
}));
