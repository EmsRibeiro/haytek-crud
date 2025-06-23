# CRUD de Produtos - Haytek

Projeto de CRUD (Create, Read, Update, Delete), desenvolvido como teste técnico para processo seletivo de Estágio.

## Tecnologias Utilizadas

- Node.js + Express (Back-end API REST);
- React + Vite (Front-end SPA);
- Fetch API (comunicação HTTP entre Front-end e Back-end);
- CSS puro para estilização (fontes externas personalizadas);
- Simulação de Banco de Dados via JSON.

---

## Como Rodar o Projeto

Abaixo está um passo a passo de instalação e execução para rodar o projeto corretamente.

### Back-end

```bash
cd backend
npm install
npm run dev
```

O back-end ficará disponível em:
http://localhost:3000

### Front-end

```bash
cd frontend
npm install
npm run dev
```

O front-end ficará disponível então em:
http://localhost:5173

## Exemplos de Requisições à API

A seguir veremos exemplos de requisições e uso da API

### Listar todos os produtos (GET)

```bash
GET http://localhost:3000/api/products
```

### Criar um novo produto (POST)

```bash
POST http://localhost:3000/api/products
Content-Type: application/json
{
  "model": "Canon 70-200mm",
  "brand": "Canon",
  "type": "Zoom",
  "focalLength": "70-200mm",
  "maxAperture": "f/2.8",
  "mount": "EF",
  "weight": "1500",
  "hasStabilization": true,
  "active": true
}
```

### Editar um produto (PUT)

```bash
PUT http://localhost:3000/api/products/uuid-exemplo-aqui
```

### Deletar um produto (DELETE)

```bash
DELETE http://localhost:3000/api/products/uuid-exemplo-aqui
```

---

### Funcionalidades Entregues

- Create;
- Read;
- Update;
- Delete;
- Filtro de busca por Modelo, Marca ou tipo de lente.
- Feedback visual através de alerts.
---
### Observações

- Banco de Dados simulado com arquivo JSON;
- O código contém comentários explicativos em pontos-chave, com finalidade de demonstrar o raciocínio utilizado e facilitar entendimento;
- A interface do usuário foi estilizada com base nas cores da logomarca da empresa Haytek, buscando alinhamento visual com a identidade da marca.
