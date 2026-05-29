const express = require('express');
const restauranteController = require('../controllers/restauranteController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// Rotas específicas (devem vir ANTES das dinâmicas)
router.get('/meu-restaurante', authenticate, restauranteController.getByUserId);

// Rotas públicas
router.get('/', restauranteController.getAll);
router.get('/:id', restauranteController.getById);

// Rotas privadas
router.put('/', authenticate, restauranteController.update);

module.exports = router;
