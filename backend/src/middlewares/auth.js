const jwt = require('../utils/jwt');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token);
    req.userId = decoded.id;
    req.userType = decoded.tipo_usuario;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

const isRestaurant = (req, res, next) => {
  if (req.userType !== 'restaurante') {
    return res.status(403).json({ error: 'Acesso restrito a restaurantes' });
  }
  next();
};

module.exports = {
  authenticate,
  isRestaurant
};
