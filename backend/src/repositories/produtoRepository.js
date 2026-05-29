const db = require('../config/database');

// Criar produto
const createProduct = async (restaurante_id, nome, descricao, preco, imagem_url) => {
  return await db.run(
    `INSERT INTO produtos (restaurante_id, nome, descricao, preco, imagem_url) 
     VALUES (?, ?, ?, ?, ?)`,
    [restaurante_id, nome, descricao, preco, imagem_url]
  );
};

// Buscar produto por ID
const getProductById = async (id) => {
  return await db.get(
    'SELECT * FROM produtos WHERE id = ?',
    [id]
  );
};

// Listar produtos de um restaurante
const getProductsByRestaurantId = async (restaurante_id) => {
  return await db.all(
    'SELECT * FROM produtos WHERE restaurante_id = ? AND ativo = 1',
    [restaurante_id]
  );
};

// Atualizar produto
const updateProduct = async (id, nome, descricao, preco, imagem_url) => {
  return await db.run(
    `UPDATE produtos SET nome = ?, descricao = ?, preco = ?, imagem_url = ? WHERE id = ?`,
    [nome, descricao, preco, imagem_url, id]
  );
};

// Deletar produto
const deleteProduct = async (id) => {
  return await db.run(
    'UPDATE produtos SET ativo = 0 WHERE id = ?',
    [id]
  );
};

module.exports = {
  createProduct,
  getProductById,
  getProductsByRestaurantId,
  updateProduct,
  deleteProduct
};
