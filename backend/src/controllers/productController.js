const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "..", "data", "products.json");

// Listar todos os produtos (GET)
function getAllProducts(req, res) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erro ao ler o arquivo de produtos." });
    }

    const products = JSON.parse(data);
    res.status(200).json(products);
  });
}

// Criar um novo produto (POST)
function createProduct(req, res) {
  const {
    model,
    brand,
    type,
    focalLength,
    maxAperture,
    mount,
    weight,
    hasStabilization,
    active,
  } = req.body;

  if (
    !model ||
    !brand ||
    !type ||
    !focalLength ||
    !maxAperture ||
    !mount ||
    weight === undefined ||
    hasStabilization === undefined ||
    active === undefined
  ) {
    return res.status(400).json({
      error:
        "Preencha todos os campos obrigatórios: model, brand, type, focalLength, maxAperture, mount, weight, hasStabilization e active.",
    });
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erro ao ler o arquivo de produtos." });
    }

    const products = JSON.parse(data);

    const newProduct = {
      id: uuidv4(),
      model,
      brand,
      type,
      focalLength,
      maxAperture,
      mount,
      weight,
      hasStabilization,
      active,
    };

    products.push(newProduct);

    fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao salvar o novo produto." });
      }

      res.status(201).json(newProduct);
    });
  });
}

// Atualizar um produto por ID (PUT)
function updateProduct(req, res) {
  const { id } = req.params;
  const updatedData = req.body;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erro ao ler o arquivo de produtos." });
    }

    let products = JSON.parse(data);
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    products[index] = { ...products[index], ...updatedData };

    fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao atualizar o produto." });
      }

      res.status(200).json(products[index]);
    });
  });
}

// Deletar um produto por ID (DELETE)
function deleteProduct(req, res) {
  const { id } = req.params;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erro ao ler o arquivo de produtos." });
    }

    let products = JSON.parse(data);
    const filteredProducts = products.filter((product) => product.id !== id);

    if (products.length === filteredProducts.length) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    fs.writeFile(filePath, JSON.stringify(filteredProducts, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao excluir o produto." });
      }

      res.status(200).json({ message: "Produto deletado com sucesso." });
    });
  });
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
