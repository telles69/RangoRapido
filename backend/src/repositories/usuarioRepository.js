const db = require('../config/database');

// Criar usuário
const createUser = async (nome, email, senha_hash, telefone, endereco_principal, tipo_usuario) => {
  const result = await db.run(
    `INSERT INTO usuarios (nome, email, senha_hash, telefone, endereco_principal, tipo_usuario) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nome, email, senha_hash, telefone, endereco_principal, tipo_usuario]
  );
  return result;
};

// Buscar usuário por email
const getUserByEmail = async (email) => {
  return await db.get(
    'SELECT * FROM usuarios WHERE email = ?',
    [email]
  );
};

// Buscar usuário por ID
const getUserById = async (id) => {
  return await db.get(
    'SELECT * FROM usuarios WHERE id = ?',
    [id]
  );
};

// Atualizar usuário
const updateUser = async (id, nome, telefone, endereco_principal) => {
  return await db.run(
    `UPDATE usuarios SET nome = ?, telefone = ?, endereco_principal = ? WHERE id = ?`,
    [nome, telefone, endereco_principal, id]
  );
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser
};
