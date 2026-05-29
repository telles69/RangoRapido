// API Client
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiClient {
  constructor() {
    this.token = null;
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
    delete this.client.defaults.headers.common['Authorization'];
  }

  async request(method, endpoint, data = null) {
    try {
      const response = await this.client({
        method,
        url: endpoint,
        data,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Usuários
  registerUser(nome, email, senha, telefone, endereco_principal, tipo_usuario) {
    return this.request('POST', '/usuarios', {
      nome,
      email,
      senha,
      telefone,
      endereco_principal,
      tipo_usuario,
    });
  }

  login(email, senha) {
    return this.request('POST', '/usuarios/login', { email, senha });
  }

  getUserProfile() {
    return this.request('GET', '/usuarios/perfil');
  }

  updateUserProfile(nome, telefone, endereco_principal) {
    return this.request('PUT', '/usuarios/perfil', {
      nome,
      telefone,
      endereco_principal,
    });
  }

  // Restaurantes
  getAllRestaurants() {
    return this.request('GET', '/restaurantes');
  }

  getRestaurantById(id) {
    return this.request('GET', `/restaurantes/${id}`);
  }

  getMyRestaurant() {
    return this.request('GET', '/restaurantes/meu-restaurante');
  }

  updateRestaurant(nome_fantasia, descricao, categoria_principal) {
    return this.request('PUT', '/restaurantes', {
      nome_fantasia,
      descricao,
      categoria_principal,
    });
  }

  // Produtos
  getRestaurantProducts(restaurante_id) {
    return this.request('GET', `/produtos/restaurante/${restaurante_id}`);
  }

  createProduct(restaurante_id, productData) {
    return this.request('POST', '/produtos', {
      restaurante_id,
      ...productData,
    });
  }

  updateProduct(id, productData) {
    return this.request('PUT', `/produtos/${id}`, productData);
  }

  deleteProduct(id) {
    return this.request('DELETE', `/produtos/${id}`);
  }

  // Pedidos
  createOrder(restaurante_id, itens) {
    return this.request('POST', '/pedidos', {
      restaurante_id,
      itens,
    });
  }

  getUserOrders() {
    return this.request('GET', '/pedidos');
  }

  getRestaurantOrders() {
    return this.request('GET', '/pedidos/restaurante/pedidos');
  }

  getOrderDetails(id) {
    return this.request('GET', `/pedidos/${id}`);
  }

  updateOrderStatus(id, status) {
    return this.request('PATCH', `/pedidos/${id}/status`, { status });
  }
}

export const apiClient = new ApiClient();
