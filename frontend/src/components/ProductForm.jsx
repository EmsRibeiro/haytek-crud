import { useState, useEffect } from "react";

function ProductForm({ onProductCreated, editingProduct }) {
  const [formData, setFormData] = useState({
    model: "",
    brand: "",
    type: "",
    focalLength: "",
    maxAperture: "",
    mount: "",
    weight: "",
    hasStabilization: false,
    active: true,
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        model: editingProduct.model,
        brand: editingProduct.brand,
        type: editingProduct.type,
        focalLength: editingProduct.focalLength,
        maxAperture: editingProduct.maxAperture,
        mount: editingProduct.mount,
        weight: editingProduct.weight,
        hasStabilization: editingProduct.hasStabilization,
        active: editingProduct.active,
      });
    }
  }, [editingProduct]);

  // Função para lidar com as mudanças nos campos
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // Lê o Input do User e passa para o Backend criar o objeto - Crud
  function handleSubmit(e) {
    e.preventDefault();

    const url = editingProduct
      ? `http://localhost:3000/api/products/${editingProduct.id}`
      : "http://localhost:3000/api/products";

    const method = editingProduct ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert(
            editingProduct ? "O Produto foi editado!" : "O Produto foi criado!!"
          );
          onProductCreated();
          setFormData({
            model: "",
            brand: "",
            type: "",
            focalLength: "",
            maxAperture: "",
            mount: "",
            weight: "",
            hasStabilization: false,
            active: true,
          });
        } else {
          alert("Erro ao salvar o produto.");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Produto</h2>
      <label htmlFor="model">Modelo:</label>
      <input
        type="text"
        name="model"
        value={formData.model}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="brand">Marca da lente:</label>
      <input
        type="text"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="type">Tipo de lente:</label>
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="focalLength">Distância focal:</label>
      <input
        type="text"
        name="focalLength"
        placeholder="ex: 24-70mm"
        value={formData.focalLength}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="maxAperture">Abertura máxima:</label>
      <input
        type="text"
        name="maxAperture"
        placeholder="ex: f/2.8"
        value={formData.maxAperture}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="mount">Mount da lente:</label>{" "}
      {/*mantive o termo tecnico mas quis dar maior contexto*/}
      <input
        type="text"
        name="mount"
        value={formData.mount}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="weight">Peso da lente (em gramas):</label>
      <input
        type="text"
        name="weight"
        placeholder="ex: 805"
        value={formData.weight}
        onChange={handleChange}
      />
      <br />
      <label>
        A lente tem estabilização?
        <input
          type="checkbox"
          name="hasStabilization"
          checked={formData.hasStabilization}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Disponível no estoque?
        <input
          type="checkbox"
          name="active"
          checked={formData.active}
          onChange={handleChange}
        />
      </label>
      <br />
      {/*O texto do btn muda dependendo do modo: Edição ou Cadastro!*/}
      <button type="submit">
        {editingProduct ? "Salvar Alterações" : "Cadastrar"}
      </button>
    </form>
  );
}

export default ProductForm;
