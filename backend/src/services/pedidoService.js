const pedidoRepository = require('../repositories/pedidoRepository');
const produtoRepository = require('../repositories/produtoRepository');

const createOrder = async (userId, restauranteId, itens) => {
  // Calcular valor total
  let valorTotal = 0;
  for (const item of itens) {
    const produto = await produtoRepository.getProductById(item.produto_id);
    if (!produto) {
      throw new Error(`Produto ${item.produto_id} não encontrado`);
    }
    valorTotal += produto.preco * item.quantidade;
  }

  // Criar pedido
  await pedidoRepository.createOrder(userId, restauranteId, 'Pendente', valorTotal);
  
  // Buscar o ID do pedido criado
  const orders = await pedidoRepository.getOrdersByUserId(userId);
  const pedido = orders[orders.length - 1];

  // Adicionar itens ao pedido
  for (const item of itens) {
    const produto = await produtoRepository.getProductById(item.produto_id);
    await pedidoRepository.addOrderItem(pedido.id, item.produto_id, item.quantidade, produto.preco);
  }

  return { success: true, message: 'Pedido criado', pedidoId: pedido.id, valorTotal };
};

const getOrdersByUser = async (userId) => {
  const pedidos = await pedidoRepository.getOrdersByUserId(userId);
  return pedidos;
};

const getOrdersByRestaurant = async (restauranteId) => {
  const pedidos = await pedidoRepository.getOrdersByRestaurantId(restauranteId);
  return pedidos;
};

const getOrderDetails = async (pedidoId) => {
  const pedido = await pedidoRepository.getOrderById(pedidoId);
  if (!pedido) {
    throw new Error('Pedido não encontrado');
  }

  const itens = await pedidoRepository.getOrderItems(pedidoId);
  return { ...pedido, itens };
};

const updateOrderStatus = async (pedidoId, novoStatus) => {
  const pedido = await pedidoRepository.getOrderById(pedidoId);
  if (!pedido) {
    throw new Error('Pedido não encontrado');
  }

  const statusValidos = ['Pendente', 'Preparando', 'Saiu para Entrega', 'Entregue'];
  if (!statusValidos.includes(novoStatus)) {
    throw new Error('Status inválido');
  }

  await pedidoRepository.updateOrderStatus(pedidoId, novoStatus);
  return { success: true, message: 'Status do pedido atualizado' };
};

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrdersByRestaurant,
  getOrderDetails,
  updateOrderStatus
};
