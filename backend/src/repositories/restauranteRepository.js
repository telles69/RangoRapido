const db = require('../config/database');

// Criar restaurante
const createRestaurant = async (usuario_id, nome_fantasia, cnpj, endereco, categoria_principal, descricao) => {
  return await db.run(
    `INSERT INTO restaurantes (usuario_id, nome_fantasia, cnpj, endereco, categoria_principal, descricao) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [usuario_id, nome_fantasia, cnpj, endereco, categoria_principal, descricao]
  );
};

// Buscar restaurante por ID
const getRestaurantById = async (id) => {
  return await db.get(
    'SELECT * FROM restaurantes WHERE id = ?',
    [id]
  );
};

// Buscar restaurante por usuário ID
const getRestaurantByUserId = async (usuario_id) => {
  return await db.get(
    'SELECT * FROM restaurantes WHERE usuario_id = ?',
    [usuario_id]
  );
};

// Listar todos os restaurantes
const getAllRestaurants = async () => {
  return await db.all(
    'SELECT * FROM restaurantes WHERE ativo = 1'
  );
};

// Atualizar restaurante
const updateRestaurant = async (id, nome_fantasia, descricao, categoria_principal) => {
  return await db.run(
    `UPDATE restaurantes SET nome_fantasia = ?, descricao = ?, categoria_principal = ? WHERE id = ?`,
    [nome_fantasia, descricao, categoria_principal, id]
  );
};

module.exports = {
  createRestaurant,
  getRestaurantById,
  getRestaurantByUserId,
  getAllRestaurants,
  updateRestaurant
};
