const restauranteService = require('../services/restauranteService');

const getAll = async (req, res) => {
  try {
    const restaurantes = await restauranteService.getAllRestaurants();
    res.json(restaurantes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurante = await restauranteService.getRestaurantById(id);
    res.json(restaurante);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getByUserId = async (req, res) => {
  try {
    const restaurante = await restauranteService.getRestaurantByUserId(req.userId);
    res.json(restaurante);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { nome_fantasia, descricao, categoria_principal } = req.body;
    const restaurante = await restauranteService.getRestaurantByUserId(req.userId);
    
    await restauranteService.updateRestaurant(restaurante.id, nome_fantasia, descricao, categoria_principal);
    res.json({ message: 'Restaurante atualizado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  getByUserId,
  update
};
