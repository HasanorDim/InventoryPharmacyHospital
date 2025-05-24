import express from "express";
import {
  addDosageForm,
  addingCategory,
  addingProduct,
  dataCategory,
  dataDosageForm,
} from "../controller/product.controller.js";
const router = express.Router();

router.get("/category-form-data", dataCategory);
router.get("/dosage-form-data", dataDosageForm);

router.post("/add-product", addingProduct);
router.post("/add-categroy", addingCategory);
router.post("/add-dosage-form", addDosageForm);

export default router;
