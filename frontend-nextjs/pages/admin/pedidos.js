import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api';
import styles from '@/styles/adminPedidos.module.css';

export default function AdminPedidos() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [loadingData, setLoadingData] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user?.tipo_usuario !== 'restaurante') {
      router.push('/');
      return;
    }

    loadOrders();
  }, [user, loading, router]);

  const loadOrders = async () => {
    try {
      const data = await apiClient.getRestaurantOrders();
      setOrders(data || []);
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err);
      setMessage('Erro ao carregar pedidos');
    } finally {
      setLoadingData(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    setMessage('');

    try {
      await apiClient.updateOrderStatus(orderId, newStatus);
      setMessage('✓ Status atualizado com sucesso!');
      await loadOrders();
    } catch (err) {
      setMessage('Erro ao atualizar status');
      console.error('Erro:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = filterStatus
    ? orders.filter((order) => order.status === filterStatus)
    : orders;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendente':
        return '#ffc107';
      case 'Preparando':
        return '#17a2b8';
      case 'Saiu para Entrega':
        return '#28a745';
      case 'Entregue':
        return '#20c997';
      default:
        return '#6c757d';
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
        <div>
          <Link href="/admin" className={styles.backBtn}>
            ← Voltar ao Painel
          </Link>
          <h1>📦 Gerenciar Pedidos</h1>
        </div>
      </div>

      {message && (
        <div className={`${styles.message} ${message.includes('Erro') ? styles.error : styles.success}`}>
          {message}
        </div>
      )}

      {/* Filtros */}
      <div className={styles.filters}>
        <label htmlFor="status-filter">Filtrar por status:</label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Todos os pedidos</option>
          <option value="Pendente">Pendente</option>
          <option value="Preparando">Preparando</option>
          <option value="Saiu para Entrega">Saiu para Entrega</option>
          <option value="Entregue">Entregue</option>
        </select>
        <span className={styles.count}>Total: {filteredOrders.length}</span>
      </div>

      {/* Lista de Pedidos */}
      {filteredOrders.length === 0 ? (
        <div className={styles.empty}>
          <p>Nenhum pedido encontrado</p>
        </div>
      ) : (
        <div className={styles.ordersList}>
          {filteredOrders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <h3>Pedido #{order.id}</h3>
                <span
                  className={styles.statusBadge}
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status}
                </span>
              </div>

              <div className={styles.orderInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Cliente:</span>
                  <span className={styles.value}>{order.usuario_nome || 'N/A'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Data:</span>
                  <span className={styles.value}>
                    {new Date(order.data_pedido).toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Total:</span>
                  <span className={styles.value} style={{ fontWeight: 'bold', color: '#ff6b35' }}>
                    R$ {parseFloat(order.valor_total).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Mudar Status */}
              <div className={styles.statusChange}>
                <label>Atualizar Status:</label>
                <div className={styles.statusActions}>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    disabled={updatingId === order.id}
                    className={styles.statusSelect}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Preparando">Preparando</option>
                    <option value="Saiu para Entrega">Saiu para Entrega</option>
                    <option value="Entregue">Entregue</option>
                  </select>
                  
                  {/* Botões de Ação Rápida */}
                  <div className={styles.quickActions}>
                    {order.status === 'Preparando' && (
                      <button
                        className={styles.btnSaiu}
                        onClick={() => handleStatusChange(order.id, 'Saiu para Entrega')}
                        disabled={updatingId === order.id}
                      >
                        🚚 Saiu para Entrega
                      </button>
                    )}
                    
                    {order.status === 'Saiu para Entrega' && (
                      <button
                        className={styles.btnEntregue}
                        onClick={() => handleStatusChange(order.id, 'Entregue')}
                        disabled={updatingId === order.id}
                      >
                        ✓ Entregue
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Itens do Pedido */}
              <div className={styles.orderItems}>
                <h4>Itens:</h4>
                <ul>
                  {order.itens?.map((item, idx) => (
                    <li key={idx}>
                      {item.produto_nome || 'Produto'} x{item.quantidade} - R${' '}
                      {parseFloat(item.preco_unitario * item.quantidade).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
