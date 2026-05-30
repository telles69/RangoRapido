const usuarioService = require('../services/usuarioService');

const register = async (req, res) => {
  try {
    const { nome, email, senha, telefone, endereco_principal, tipo_usuario } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    await usuarioService.register(nome, email, senha, telefone, endereco_principal, tipo_usuario || 'cliente');
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const result = await usuarioService.login(email, senha);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const usuario = await usuarioService.getUserProfile(req.userId);
    res.json(usuario);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { nome, telefone, endereco_principal } = req.body;
    await usuarioService.updateUserProfile(req.userId, nome, telefone, endereco_principal);
    res.json({ message: 'Perfil atualizado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};
