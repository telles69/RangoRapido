import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api';
import ProductForm from '@/components/ProductForm';
import ProductItem from '@/components/ProductItem';
import styles from '@/styles/cardapio.module.css';

export default function Cardapio() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [savingProduct, setSavingProduct] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
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

    loadProducts();
  }, [user, loading, router]);

  const loadProducts = async () => {
    try {
      setLoadingData(true);
      setMessage('');
      const restaurant = await apiClient.getMyRestaurant();
      console.log('Restaurante:', restaurant);
      
      if (restaurant?.id) {
        const data = await apiClient.getRestaurantProducts(restaurant.id);
        console.log('Produtos:', data);
        setProducts(data || []);
      } else {
        setMessage('Erro: Restaurante não encontrado');
        console.error('Restaurante sem ID:', restaurant);
      }
    } catch (err) {
      const errorMsg = err?.error || err?.message || JSON.stringify(err);
      setMessage(`Erro ao carregar cardápio: ${errorMsg}`);
      console.error('Erro ao carregar produtos:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
    setMessage('');
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    setMessage('');
  };

  const handleSubmitProduct = async (formData) => {
    setSavingProduct(true);
    setMessage('');

    try {
      const restaurant = await apiClient.getMyRestaurant();
      console.log('Submitting product for restaurant:', restaurant?.id);

      if (editingProduct?.id) {
        // Atualizar produto existente
        await apiClient.updateProduct(editingProduct.id, {
          nome: formData.nome,
          descricao: formData.descricao,
          preco: parseFloat(formData.preco),
          imagem_url: formData.imagem_url,
        });
        setMessage('✓ Produto atualizado com sucesso!');
      } else {
        // Criar novo produto
        if (!restaurant?.id) {
          throw new Error('Restaurante não encontrado');
        }
        await apiClient.createProduct(restaurant.id, {
          nome: formData.nome,
          descricao: formData.descricao,
          preco: parseFloat(formData.preco),
          imagem_url: formData.imagem_url,
        });
        setMessage('✓ Produto adicionado com sucesso!');
      }

      // Recarregar produtos
      await loadProducts();
      setShowForm(false);
      setEditingProduct(null);
    } catch (err) {
      const errorMsg = err?.error || err?.message || JSON.stringify(err);
      setMessage(`Erro: ${errorMsg}`);
      console.error('Erro ao salvar produto:', err);
    } finally {
      setSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    setDeletingId(productId);

    try {
      await apiClient.deleteProduct(productId);
      setMessage('✓ Produto deletado com sucesso!');
      await loadProducts();
    } catch (err) {
      setMessage(`Erro ao deletar: ${err.error || err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
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
        <h1>🍽️ Gerenciar Cardápio</h1>
        {!showForm && (
          <button className={styles.addBtn} onClick={handleAddProduct}>
            ➕ Adicionar Produto
          </button>
        )}
      </div>

      {message && (
        <div className={`${styles.message} ${message.includes('Erro') ? styles.error : styles.success}`}>
          {message}
        </div>
      )}

      {showForm && (
        <div className={styles.formSection}>
          <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
          <ProductForm
            product={editingProduct}
            onSubmit={handleSubmitProduct}
            onCancel={handleCancelForm}
            loading={savingProduct}
          />
        </div>
      )}

      <div className={styles.productsSection}>
        <h2>Produtos ({products.length})</h2>

        {products.length === 0 ? (
          <div className={styles.empty}>
            <p>Nenhum produto cadastrado ainda</p>
            <button onClick={handleAddProduct} className={styles.addBtnEmpty}>
              Adicionar primeiro produto
            </button>
          </div>
        ) : (
          <div className={styles.productsList}>
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                loading={deletingId === product.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
