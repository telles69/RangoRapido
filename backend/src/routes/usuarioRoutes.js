const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// Rotas públicas
router.post('/', usuarioController.register);
router.post('/login', usuarioController.login);

// Rotas privadas
router.get('/perfil', authenticate, usuarioController.getProfile);
router.put('/perfil', authenticate, usuarioController.updateProfile);

module.exports = router;
