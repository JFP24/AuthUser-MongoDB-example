import { Router } from "express";
import {
  createProducts,
  getProducts,
  getProductsById,
  updateProductsById,
  deleteProductsById,
} from "../controllers/producst.controller";
const router = Router();
import { authJwt } from "../middlewares/index";
//metodos para las funciones de los productos
router.get("/", getProducts);
router.get("/:id", getProductsById);
router.post(
  "/createProducts",
  [authJwt.verifyToken, authJwt.isModerator],
  createProducts
);
router.put(
  "/:id",
  authJwt.verifyToken,
  [authJwt.verifyToken, authJwt.isModerator],
  updateProductsById
);
router.delete(
  "/:id",
  authJwt.verifyToken,
  [authJwt.verifyToken, authJwt.isModerator],
  deleteProductsById
);

export default router;
