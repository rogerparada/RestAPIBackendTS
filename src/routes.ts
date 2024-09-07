import { Router } from "express";
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleErrors } from "./middleware";

const router = Router();

router.get("/", getProducts);
router.get("/:id", param("id").isInt().withMessage("El id debe ser un numero"), handleErrors, getProductById);

router.post(
	"/",
	body("name").notEmpty().withMessage("el nombre no debe estar vacío"),
	body("price")
		.isNumeric()
		.withMessage("El valor debe ser numérico")
		.custom((value) => value > 0)
		.withMessage("El valor debe ser mayor a 0")
		.notEmpty()
		.withMessage("el producto no debe estar vacío"),
	handleErrors,
	createProduct
);

router.put(
	"/:id",
	param("id").isInt().withMessage("El id debe ser un numero"),
	body("name").notEmpty().withMessage("el nombre no debe estar vacío"),
	body("price")
		.isNumeric()
		.withMessage("El valor debe ser numérico")
		.custom((value) => value > 0)
		.withMessage("El valor debe ser mayor a 0")
		.notEmpty()
		.withMessage("el producto no debe estar vacío"),
	body("availability").isBoolean().withMessage("valor no valido"),
	handleErrors,
	updateProduct
);

router.patch("/:id", param("id").isInt().withMessage("ID no valido"), handleErrors, updateAvailability);

router.delete("/:id", param("id").isInt().withMessage("ID no valido"), handleErrors, deleteProduct);

export default router;
