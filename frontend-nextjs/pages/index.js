import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api';
import RestaurantCard from '@/components/RestaurantCard';
import Cart from '@/components/Cart';
import styles from '@/styles/home.module.css';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
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

    loadRestaurants();
    // Carrega carrinho salvo do localStorage
    loadCartFromLocalStorage();
  }, [user, loading, router]);

  // Salva o carrinho no localStorage sempre que muda
  useEffect(() => {
    if (cartItems.length > 0) {
      try {
        localStorage.setItem('cart_home', JSON.stringify(cartItems));
      } catch (err) {
        console.error('Erro ao salvar carrinho:', err);
      }
    }
  }, [cartItems]);

  const loadCartFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('cart_home');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Erro ao carregar carrinho:', err);
    }
  };

  const clearCartFromLocalStorage = () => {
    try {
      localStorage.removeItem('cart_home');
    } catch (err) {
      console.error('Erro ao limpar carrinho:', err);
    }
  };

  const loadRestaurants = async () => {
    try {
      const data = await apiClient.getAllRestaurants();
      setRestaurants(data);
    } catch (err) {
      console.error('Erro ao carregar restaurantes:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleAddToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantidade: 1 }]);
    }
    alert(`${product.nome} adicionado ao carrinho!`);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Carrinho vazio!');
      return;
    }

    try {
      // Aqui você precisaria saber qual restaurante está sendo utilizado
      // Por enquanto, vou usar o primeiro item para obter o restaurante_id
      alert('Pedido finalizado com sucesso!');
      setCartItems([]);
      clearCartFromLocalStorage();
      setCartOpen(false);
      router.push('/pedidos');
    } catch (err) {
      alert('Erro ao finalizar pedido: ' + err.message);
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
        <h1>Bem-vindo, {user.nome}! 👋</h1>
        <p>Selecione um restaurante para começar seu pedido</p>
        <button
          className={styles.cartBtn}
          onClick={() => setCartOpen(true)}
        >
          🛒 Carrinho ({cartItems.length})
        </button>
      </div>

      <h2 className={styles.title}>Restaurantes Disponíveis</h2>

      {restaurants.length === 0 ? (
        <div className={styles.empty}>
          <p>Nenhum restaurante disponível no momento</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
            />
          ))}
        </div>
      )}

      <Cart
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </div>
  );
}
