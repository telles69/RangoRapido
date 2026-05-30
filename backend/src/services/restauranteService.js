const restauranteRepository = require('../repositories/restauranteRepository');

const getAllRestaurants = async () => {
  const restaurantes = await restauranteRepository.getAllRestaurants();
  return restaurantes;
};

const getRestaurantById = async (id) => {
  const restaurante = await restauranteRepository.getRestaurantById(id);
  if (!restaurante) {
    throw new Error('Restaurante não encontrado');
  }
  return restaurante;
};

const getRestaurantByUserId = async (userId) => {
  const restaurante = await restauranteRepository.getRestaurantByUserId(userId);
  if (!restaurante) {
    throw new Error('Restaurante não encontrado para este usuário');
  }
  return restaurante;
};

const updateRestaurant = async (restauranteId, nome_fantasia, descricao, categoria_principal) => {
  await restauranteRepository.updateRestaurant(restauranteId, nome_fantasia, descricao, categoria_principal);
  return { success: true, message: 'Restaurante atualizado' };
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantByUserId,
  updateRestaurant
};
