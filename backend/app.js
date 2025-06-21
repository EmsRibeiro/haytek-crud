const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("API Haytek CRUD - Products is alive n' kickin!!");
});

// Importando e usando as rotas de produtos
const productRoutes = require("./src/routes/productRoutes");
app.use("/api", productRoutes);

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
