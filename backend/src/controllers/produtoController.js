const produtoService = require('../services/produtoService');
const restauranteService = require('../services/restauranteService');

const create = async (req, res) => {
  try {
    const { nome, descricao, preco, imagem_url } = req.body;
    const restaurante = await restauranteService.getRestaurantByUserId(req.userId);

    await produtoService.createProduct(restaurante.id, nome, descricao, preco, imagem_url);
    res.status(201).json({ message: 'Produto criado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getByRestaurant = async (req, res) => {
  try {
    const { restaurante_id } = req.params;
    const produtos = await produtoService.getProductsByRestaurant(restaurante_id);
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, imagem_url } = req.body;

    await produtoService.updateProduct(id, nome, descricao, preco, imagem_url);
    res.json({ message: 'Produto atualizado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await produtoService.deleteProduct(id);
    res.json({ message: 'Produto deletado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  create,
  getByRestaurant,
  update,
  deleteProduct
};
