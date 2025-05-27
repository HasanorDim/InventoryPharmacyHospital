import express from "express";
import {
  addDosageForm,
  addingCategory,
  addingProduct,
  addStorage,
  addUnit,
  allData,
  deleteCategory,
  deleteDosage,
  deleteProduct,
  deleteStorage,
  deleteUnit,
  editCategory,
  editDosage,
  editProduct,
} from "../controller/product.controller.js";
const router = express.Router();

//Get
router.get("/all-data", allData);

//Adding
router.post("/add-product", addingProduct);
router.post("/add-categroy", addingCategory);
router.post("/add-dosage-form", addDosageForm);
router.post("/add-unit", addUnit);
router.post("/add-storage", addStorage);

//Edit
router.post("/edit-category", editCategory);
router.post("/edit-dosage", editDosage);
router.post("/edit-product", editProduct);

//Deleting
router.post("/delete-unit", deleteUnit);
router.post("/delete-storage", deleteStorage);
router.post("/delete-category", deleteCategory);
router.post("/delete-dosage", deleteDosage);
router.post("/delete-product", deleteProduct);

export default router;
