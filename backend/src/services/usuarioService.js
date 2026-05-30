const usuarioRepository = require('../repositories/usuarioRepository');
const restauranteRepository = require('../repositories/restauranteRepository');
const hash = require('../utils/hash');
const jwt = require('../utils/jwt');

const register = async (nome, email, senha, telefone, endereco_principal, tipo_usuario) => {
  // Verificar se email já existe
  const existingUser = await usuarioRepository.getUserByEmail(email);
  if (existingUser) {
    throw new Error('Email já cadastrado');
  }

  // Hash da senha
  const senhaHash = await hash.hashPassword(senha);

  // Criar usuário
  await usuarioRepository.createUser(nome, email, senhaHash, telefone, endereco_principal, tipo_usuario);

  // Se for restaurante, criar entrada na tabela de restaurantes
  if (tipo_usuario === 'restaurante') {
    const usuario = await usuarioRepository.getUserByEmail(email);
    await restauranteRepository.createRestaurant(usuario.id, nome, '', '', '', '');
  }

  return { success: true, message: 'Usuário registrado com sucesso' };
};

const login = async (email, senha) => {
  const usuario = await usuarioRepository.getUserByEmail(email);
  if (!usuario) {
    throw new Error('Email ou senha inválidos');
  }

  const passwordMatch = await hash.comparePassword(senha, usuario.senha_hash);
  if (!passwordMatch) {
    throw new Error('Email ou senha inválidos');
  }

  const token = jwt.sign({
    id: usuario.id,
    email: usuario.email,
    nome: usuario.nome,
    tipo_usuario: usuario.tipo_usuario
  });

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo_usuario: usuario.tipo_usuario
    }
  };
};

const getUserProfile = async (userId) => {
  const usuario = await usuarioRepository.getUserById(userId);
  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    telefone: usuario.telefone,
    endereco_principal: usuario.endereco_principal,
    tipo_usuario: usuario.tipo_usuario
  };
};

const updateUserProfile = async (userId, nome, telefone, endereco_principal) => {
  await usuarioRepository.updateUser(userId, nome, telefone, endereco_principal);
  return { success: true, message: 'Perfil atualizado' };
};

module.exports = {
  register,
  login,
  getUserProfile,
  updateUserProfile
};
