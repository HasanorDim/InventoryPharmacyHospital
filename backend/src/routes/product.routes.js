import express from "express";
import {
  addDosageForm,
  addingCategory,
  addingProduct,
  addStorage,
  addUnit,
  allData,
  dataCategory,
  deleteCategory,
  deleteDosage,
  deleteStorage,
  deleteUnit,
  editCategory,
  editDosage,
} from "../controller/product.controller.js";
const router = express.Router();

//Get
router.get("/all-data", allData);
router.get("/category-form-data", dataCategory);

//Adding
router.post("/add-product", addingProduct);
router.post("/add-categroy", addingCategory);
router.post("/add-dosage-form", addDosageForm);
router.post("/add-unit", addUnit);
router.post("/add-storage", addStorage);

//Edit
router.post("/edit-category", editCategory);
router.post("/edit-dosage", editDosage);

//Deleting
router.post("/delete-unit", deleteUnit);
router.post("/delete-storage", deleteStorage);
router.post("/delete-category", deleteCategory);
router.post("/delete-dosage", deleteDosage);

export default router;
