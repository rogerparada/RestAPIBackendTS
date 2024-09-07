"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("./handlers/product");
const express_validator_1 = require("express-validator");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
router.get("/", product_1.getProducts);
router.get("/:id", (0, express_validator_1.param)("id").isInt().withMessage("El id debe ser un numero"), middleware_1.handleErrors, product_1.getProductById);
router.post("/", (0, express_validator_1.body)("name").notEmpty().withMessage("el nombre no debe estar vacío"), (0, express_validator_1.body)("price")
    .isNumeric()
    .withMessage("El valor debe ser numérico")
    .custom((value) => value > 0)
    .withMessage("El valor debe ser mayor a 0")
    .notEmpty()
    .withMessage("el producto no debe estar vacío"), middleware_1.handleErrors, product_1.createProduct);
router.put("/:id", (0, express_validator_1.param)("id").isInt().withMessage("El id debe ser un numero"), (0, express_validator_1.body)("name").notEmpty().withMessage("el nombre no debe estar vacío"), (0, express_validator_1.body)("price")
    .isNumeric()
    .withMessage("El valor debe ser numérico")
    .custom((value) => value > 0)
    .withMessage("El valor debe ser mayor a 0")
    .notEmpty()
    .withMessage("el producto no debe estar vacío"), (0, express_validator_1.body)("availability").isBoolean().withMessage("valor no valido"), middleware_1.handleErrors, product_1.updateProduct);
router.patch("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), middleware_1.handleErrors, product_1.updateAvailability);
router.delete("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID no valido"), middleware_1.handleErrors, product_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=routes.js.map