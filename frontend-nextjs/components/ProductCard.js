import styles from './ProductCard.module.css';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>🍽️</div>
      <div className={styles.content}>
        <h4 className={styles.name}>{product.nome}</h4>
        <p className={styles.description}>{product.descricao || ''}</p>
        <div className={styles.footer}>
          <span className={styles.price}>R$ {product.preco.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className={styles.addBtn}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
