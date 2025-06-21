const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Rota para listar todos os produtos (GET)
router.get("/products", productController.getAllProducts);

// Rota para criar um novo produto (POST)
router.post("/products", productController.createProduct);

// Rota para atualizar um produto por ID (PUT)
router.put("/products/:id", productController.updateProduct);

// Rota para deletar um produto por ID (DELETE)
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
