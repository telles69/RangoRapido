import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api';
import OrderList from '@/components/OrderList';
import styles from '@/styles/pedidos.module.css';

export default function Pedidos() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user?.tipo_usuario === 'restaurante') {
      router.push('/admin');
      return;
    }

    loadOrders();
  }, [user, loading, router]);

  const loadOrders = async () => {
    try {
      const data = await apiClient.getUserOrders();
      setOrders(data);
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err);
    } finally {
      setLoadingData(false);
    }
  };

  if (loading || loadingData) {
    return <div className={styles.container}>Carregando...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>📋 Meus Pedidos</h1>
        <button className={styles.newOrderBtn} onClick={() => router.push('/')}>
          ➕ Novo Pedido
        </button>
      </div>

      <OrderList orders={orders} />
    </div>
  );
}
