const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const { authenticate, isRestaurant } = require('../middlewares/auth');

const router = express.Router();

// Rotas privadas para clientes
router.post('/', authenticate, pedidoController.create);
router.get('/', authenticate, pedidoController.getByUser);
router.get('/:id', authenticate, pedidoController.getDetails);

// Rotas privadas para restaurantes
router.get('/restaurante/pedidos', authenticate, isRestaurant, pedidoController.getByRestaurant);
router.patch('/:id/status', authenticate, isRestaurant, pedidoController.updateStatus);

module.exports = router;
