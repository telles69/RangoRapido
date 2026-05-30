const produtoRepository = require('../repositories/produtoRepository');

const createProduct = async (restaurante_id, nome, descricao, preco, imagem_url) => {
  if (!nome || !preco) {
    throw new Error('Nome e preço são obrigatórios');
  }

  await produtoRepository.createProduct(restaurante_id, nome, descricao, preco, imagem_url);
  return { success: true, message: 'Produto criado' };
};

const getProductsByRestaurant = async (restaurante_id) => {
  const produtos = await produtoRepository.getProductsByRestaurantId(restaurante_id);
  return produtos;
};

const updateProduct = async (id, nome, descricao, preco, imagem_url) => {
  const produto = await produtoRepository.getProductById(id);
  if (!produto) {
    throw new Error('Produto não encontrado');
  }

  await produtoRepository.updateProduct(id, nome, descricao, preco, imagem_url);
  return { success: true, message: 'Produto atualizado' };
};

const deleteProduct = async (id) => {
  const produto = await produtoRepository.getProductById(id);
  if (!produto) {
    throw new Error('Produto não encontrado');
  }

  await produtoRepository.deleteProduct(id);
  return { success: true, message: 'Produto deletado' };
};

module.exports = {
  createProduct,
  getProductsByRestaurant,
  updateProduct,
  deleteProduct
};
