const express = require('express');
const produtoController = require('../controllers/produtoController');
const { authenticate, isRestaurant } = require('../middlewares/auth');

const router = express.Router();

// Rotas públicas
router.get('/restaurante/:restaurante_id', produtoController.getByRestaurant);

// Rotas privadas
router.post('/', authenticate, isRestaurant, produtoController.create);
router.put('/:id', authenticate, isRestaurant, produtoController.update);
router.delete('/:id', authenticate, isRestaurant, produtoController.deleteProduct);

module.exports = router;
