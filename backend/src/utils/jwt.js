const jwt = require('jwt-simple');

const secret = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura_aqui';

const sign = (payload) => {
  return jwt.encode(payload, secret);
};

const verify = (token) => {
  try {
    return jwt.decode(token, secret);
  } catch (err) {
    throw new Error('Token inválido');
  }
};

module.exports = {
  sign,
  verify
};
