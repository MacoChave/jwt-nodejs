import { Router } from "express";
import * as productsControl from "../controllers/products.controller";
import { authJWT } from "../middlewares";

const router = Router()

router.get('/', productsControl.getProducts)

router.get('/:productId', productsControl.getProductById)

router.post('/', [authJWT.verifyToken, authJWT.isModerator], productsControl.createProduct)

router.put('/:productId', [authJWT.verifyToken, authJWT.isModerator], productsControl.updateProductById)

router.delete('/:productId', [authJWT.verifyToken, authJWT.isAdmin], productsControl.deletProductById)

export default router