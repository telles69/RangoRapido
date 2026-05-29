import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api';
import styles from '@/styles/adminHome.module.css';

export default function AdminHome() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });
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

    loadData();
  }, [user, loading, router]);

  const loadData = async () => {
    try {
      const restaurantData = await apiClient.getMyRestaurant();
      setRestaurant(restaurantData);

      const ordersData = await apiClient.getRestaurantOrders();
      const productsData = await apiClient.getRestaurantProducts(restaurantData.id);

      const totalRevenue = ordersData.reduce((sum, order) => sum + order.valor_total, 0);

      setStats({
        totalOrders: ordersData.length,
        totalProducts: productsData.length,
        totalRevenue,
      });
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
        <div>
          <h1>📊 Painel do Restaurante</h1>
          <p className={styles.subtitle}>{restaurant?.nome_fantasia}</p>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className={styles.statsGrid}>
        <Link href="/admin/pedidos" className={styles.statCard}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Pedidos</p>
            <p className={styles.statValue}>{stats.totalOrders}</p>
          </div>
          <span className={styles.arrow}>→</span>
        </Link>

        <Link href="/admin/cardapio" className={styles.statCard}>
          <div className={styles.statIcon}>🍽️</div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Produtos</p>
            <p className={styles.statValue}>{stats.totalProducts}</p>
          </div>
          <span className={styles.arrow}>→</span>
        </Link>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Faturamento</p>
            <p className={styles.statValue}>R$ {stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Menu de Navegação */}
      <div className={styles.menuSection}>
        <h2>Acesso Rápido</h2>
        <div className={styles.menuGrid}>
          <Link href="/admin/pedidos" className={styles.menuItem}>
            <span className={styles.menuIcon}>📋</span>
            <span className={styles.menuText}>Gerenciar Pedidos</span>
          </Link>

          <Link href="/admin/cardapio" className={styles.menuItem}>
            <span className={styles.menuIcon}>🍕</span>
            <span className={styles.menuText}>Gerenciar Cardápio</span>
          </Link>

          <Link href="/perfil" className={styles.menuItem}>
            <span className={styles.menuIcon}>⚙️</span>
            <span className={styles.menuText}>Configurações</span>
          </Link>

          <Link href="/" className={styles.menuItem}>
            <span className={styles.menuIcon}>👁️</span>
            <span className={styles.menuText}>Visualizar Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
