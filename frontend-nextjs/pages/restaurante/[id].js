import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import styles from '@/styles/restaurante.module.css';

export default function RestaurantePage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [products, setProducts] = useState([]);
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

    if (id) {
      loadRestaurantData();
      // Carrega carrinho salvo do localStorage
      loadCartFromLocalStorage();
    }
  }, [id, user, loading, router]);

  // Salva o carrinho no localStorage sempre que muda
  useEffect(() => {
    if (id && cartItems.length > 0) {
      try {
        localStorage.setItem(`cart_${id}`, JSON.stringify(cartItems));
      } catch (err) {
        console.error('Erro ao salvar carrinho:', err);
      }
    }
  }, [cartItems, id]);

  // Limpa o carrinho do localStorage após o checkout
  const clearCartFromLocalStorage = () => {
    try {
      localStorage.removeItem(`cart_${id}`);
    } catch (err) {
      console.error('Erro ao limpar carrinho:', err);
    }
  };

  const loadCartFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem(`cart_${id}`);
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Erro ao carregar carrinho:', err);
    }
  };

  const loadRestaurantData = async () => {
    try {
      const [restaurantData, productsData] = await Promise.all([
        apiClient.getRestaurantById(id),
        apiClient.getRestaurantProducts(id),
      ]);
      setRestaurant(restaurantData);
      setProducts(productsData);
    } catch (err) {
      console.error('Erro ao carregar restaurante:', err);
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
      const itens = cartItems.map((item) => ({
        produto_id: item.id,
        quantidade: item.quantidade,
      }));

      await apiClient.createOrder(id, itens);
      alert('Pedido realizado com sucesso!');
      setCartItems([]);
      clearCartFromLocalStorage();
      setCartOpen(false);
      router.push('/pedidos');
    } catch (err) {
      alert('Erro ao finalizar pedido: ' + err.error);
    }
  };

  if (loading || loadingData) {
    return <div className={styles.container}>Carregando...</div>;
  }

  if (!restaurant) {
    return <div className={styles.container}>Restaurante não encontrado</div>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => router.push('/')}>
        ← Voltar
      </button>

      <div className={styles.restaurantInfo}>
        <h1>{restaurant.nome_fantasia}</h1>
        <p>{restaurant.descricao}</p>
        <p className={styles.category}>📍 {restaurant.categoria_principal}</p>
      </div>

      <div className={styles.header}>
        <h2>Cardápio</h2>
        <button
          className={styles.cartBtn}
          onClick={() => setCartOpen(true)}
        >
          🛒 Carrinho ({cartItems.length})
        </button>
      </div>

      {products.length === 0 ? (
        <div className={styles.empty}>
          <p>Nenhum produto disponível</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
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
