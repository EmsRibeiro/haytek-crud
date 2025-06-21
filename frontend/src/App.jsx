import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import "./style.css";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Função de busca no Back-end - Lê o banco de dados: cRud
  const fetchProducts = () => {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  };

  // faz aquela busca ao abrir o link
  useEffect(() => {
    fetchProducts();
  }, []);

  // ao pressionar o btn Deletar, o Front faz a req para o Back remover aquele obj - cruD
  function handleDelete(id) {
    fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Produto deletado com sucesso!");
          fetchProducts(); // Atualiza a lista na tela
        } else {
          alert("Erro ao deletar o produto. Exclusão não efetuada!");
        }
      })
      .catch((error) => {
        console.error("Erro ao deletar:", error);
      });
  }

  // Quando o User clica no btn Edit, faz a chamada do Obj no Json e req o PUT para atualizar o obj - crUd
  function handleEdit(product) {
    setEditingProduct(product);
  }

  return (
    <div className="container">
      <div className="content">
        <div className="product-list">
          <h1>Lista de Produtos</h1>

          {/* Campo de busca (Filtro) */}
          <label htmlFor="">Busca: </label>
          <input
            type="text"
            placeholder="Digite o Modelo, a Marca ou tipo da lente aqui."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          {products.length === 0 ? (
            <p>Sem produtos cadastrados!</p>
          ) : (
            <ul>
              {products
                .filter((product) => {
                  const term = searchTerm.toLowerCase();
                  return (
                    product.model.toLowerCase().includes(term) ||
                    product.brand.toLowerCase().includes(term) ||
                    product.type.toLowerCase().includes(term)
                  );
                })
                .map((product) => (
                  <li key={product.id}>
                    <strong>Modelo da lente:</strong> {product.model} <br />
                    <strong>Marca:</strong> {product.brand} <br />
                    <strong>Tipo de lente:</strong> {product.type} <br />
                    <strong>Distância focal:</strong> {product.focalLength}{" "}
                    <br />
                    <strong>Abertura máxima:</strong> {product.maxAperture}{" "}
                    <br />
                    <strong>Montagem da lente:</strong> {product.mount} <br />
                    <strong>Peso - em gramas:</strong> {product.weight}g <br />
                    <strong>Tem Estabilização?</strong>{" "}
                    {product.hasStabilization ? "Sim" : "Não"} <br />
                    <strong>Temos em estoque?</strong>{" "}
                    {product.active ? "Sim" : "Não"} <br />
                    <hr />
                    <button onClick={() => handleDelete(product.id)}>
                      Deletar
                    </button>
                    <button onClick={() => handleEdit(product)}>Editar</button>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="form-section">
          <ProductForm
            onProductCreated={fetchProducts}
            editingProduct={editingProduct}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
