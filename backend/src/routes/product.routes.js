import express from "express";
import { addingProduct } from "../controller/product.controller.js";
const router = express.Router();

router.post("/add-product", addingProduct);

export default router;
