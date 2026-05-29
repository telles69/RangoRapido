import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api';
import styles from '@/styles/admin.module.css';

export default function Admin() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState('orders');
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user?.tipo_usuario !== 'restaurante') {
      router.push('/');
      return;
    }

    loadAdminData();
  }, [user, loading, router]);

  const loadAdminData = async () => {
    try {
      const [restaurantData, ordersData, productsData] = await Promise.all([
        apiClient.getMyRestaurant(),
        apiClient.getRestaurantOrders(),
        apiClient.getRestaurantProducts(user?.restaurante_id),
      ]);
      setRestaurant(restaurantData);
      setOrders(ordersData);
      setProducts(productsData);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoadingData(false);
    }
  };

  if (loading || loadingData) {
    return <div className={styles.container}>Carregando...</div>;
  }

  if (!user || user.tipo_usuario !== 'restaurante') {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>📊 Painel Administrativo</h1>
        <h2>{restaurant?.nome_fantasia}</h2>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'orders' ? styles.active : ''}`}
          onClick={() => setTab('orders')}
        >
          📦 Pedidos ({orders.length})
        </button>
        <button
          className={`${styles.tab} ${tab === 'products' ? styles.active : ''}`}
          onClick={() => setTab('products')}
        >
          🍽️ Produtos ({products.length})
        </button>
        <button
          className={`${styles.tab} ${tab === 'stats' ? styles.active : ''}`}
          onClick={() => setTab('stats')}
        >
          📈 Estatísticas
        </button>
      </div>

      {tab === 'orders' && (
        <div className={styles.section}>
          <h3>Pedidos Recentes</h3>
          {orders.length === 0 ? (
            <p>Nenhum pedido encontrado</p>
          ) : (
            <div className={styles.ordersList}>
              {orders.map((order) => (
                <div key={order.id} className={styles.orderItem}>
                  <div>
                    <strong>Pedido #{order.id}</strong>
                    <p>Status: {order.status}</p>
                    <p>Total: R$ {order.valor_total.toFixed(2)}</p>
                  </div>
                  <select
                    defaultValue={order.status}
                    onChange={(e) => {
                      apiClient.updateOrderStatus(order.id, e.target.value);
                    }}
                    className={styles.statusSelect}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Preparando">Preparando</option>
                    <option value="Saiu para Entrega">Saiu para Entrega</option>
                    <option value="Entregue">Entregue</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'products' && (
        <div className={styles.section}>
          <h3>Produtos do Cardápio</h3>
          {products.length === 0 ? (
            <p>Nenhum produto cadastrado</p>
          ) : (
            <div className={styles.productsList}>
              {products.map((product) => (
                <div key={product.id} className={styles.productItem}>
                  <div>
                    <strong>{product.nome}</strong>
                    <p>{product.descricao}</p>
                  </div>
                  <div className={styles.price}>
                    R$ {product.preco.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'stats' && (
        <div className={styles.section}>
          <h3>Estatísticas</h3>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <p className={styles.statLabel}>Total de Pedidos</p>
              <p className={styles.statValue}>{orders.length}</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.statLabel}>Produtos</p>
              <p className={styles.statValue}>{products.length}</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.statLabel}>Faturamento</p>
              <p className={styles.statValue}>
                R$ {orders.reduce((sum, o) => sum + o.valor_total, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
