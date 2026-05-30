const express = require('express');
const restauranteController = require('../controllers/restauranteController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// Rotas públicas
router.get('/', restauranteController.getAll);
router.get('/:id', restauranteController.getById);

// Rotas privadas
router.get('/meu-restaurante', authenticate, restauranteController.getByUserId);
router.put('/', authenticate, restauranteController.update);

module.exports = router;
