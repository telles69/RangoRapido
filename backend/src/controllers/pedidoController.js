const pedidoService = require('../services/pedidoService');
const restauranteService = require('../services/restauranteService');

const create = async (req, res) => {
  try {
    const { restaurante_id, itens } = req.body;

    if (!restaurante_id || !itens || itens.length === 0) {
      return res.status(400).json({ error: 'Restaurante ID e itens são obrigatórios' });
    }

    const result = await pedidoService.createOrder(req.userId, restaurante_id, itens);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getByUser = async (req, res) => {
  try {
    const pedidos = await pedidoService.getOrdersByUser(req.userId);
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getByRestaurant = async (req, res) => {
  try {
    const restaurante = await restauranteService.getRestaurantByUserId(req.userId);
    const pedidos = await pedidoService.getOrdersByRestaurant(restaurante.id);
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await pedidoService.getOrderDetails(id);
    res.json(pedido);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status é obrigatório' });
    }

    await pedidoService.updateOrderStatus(id, status);
    res.json({ message: 'Status do pedido atualizado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  create,
  getByUser,
  getByRestaurant,
  getDetails,
  updateStatus
};
