const db = require('../config/database');

// Criar pedido
const createOrder = async (usuario_id, restaurante_id, status, valor_total) => {
  return await db.run(
    `INSERT INTO pedidos (usuario_id, restaurante_id, status, valor_total) 
     VALUES (?, ?, ?, ?)`,
    [usuario_id, restaurante_id, status, valor_total]
  );
};

// Buscar pedido por ID
const getOrderById = async (id) => {
  return await db.get(
    'SELECT * FROM pedidos WHERE id = ?',
    [id]
  );
};

// Listar pedidos de um usuário
const getOrdersByUserId = async (usuario_id) => {
  return await db.all(
    'SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY data_pedido DESC',
    [usuario_id]
  );
};

// Listar pedidos de um restaurante
const getOrdersByRestaurantId = async (restaurante_id) => {
  return await db.all(
    'SELECT * FROM pedidos WHERE restaurante_id = ? ORDER BY data_pedido DESC',
    [restaurante_id]
  );
};

// Atualizar status do pedido
const updateOrderStatus = async (id, status) => {
  return await db.run(
    'UPDATE pedidos SET status = ? WHERE id = ?',
    [status, id]
  );
};

// Adicionar item ao pedido
const addOrderItem = async (pedido_id, produto_id, quantidade, preco_unitario) => {
  return await db.run(
    `INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) 
     VALUES (?, ?, ?, ?)`,
    [pedido_id, produto_id, quantidade, preco_unitario]
  );
};

// Listar itens do pedido
const getOrderItems = async (pedido_id) => {
  return await db.all(
    'SELECT * FROM itens_pedido WHERE pedido_id = ?',
    [pedido_id]
  );
};

module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  getOrdersByRestaurantId,
  updateOrderStatus,
  addOrderItem,
  getOrderItems
};
