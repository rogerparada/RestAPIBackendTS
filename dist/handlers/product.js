"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateAvailability = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_model_1.default.findAll({
        order: [["id", "DESC"]],
    });
    res.status(200).json({ data: products });
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json({ data: product });
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_model_1.default.create(req.body);
    res.status(201).json({ data: product });
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    yield product.update(req.body);
    yield product.save();
    res.status(202).json({ data: product });
});
exports.updateProduct = updateProduct;
const updateAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    product.availability = !product.dataValues.availability;
    yield product.save();
    res.status(202).json({ data: product });
});
exports.updateAvailability = updateAvailability;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    product.destroy();
    res.status(200).json({ data: "Producto eliminado" });
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map