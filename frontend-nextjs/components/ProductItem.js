import { useState } from 'react';
import styles from '@/styles/productItem.module.css';

export default function ProductItem({ product, onEdit, onDelete, loading }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(product.id);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.imageContainer}>
        {product.imagem_url ? (
          <img src={product.imagem_url} alt={product.nome} />
        ) : (
          <div className={styles.noImage}>
            <span>Sem imagem</span>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <h3>{product.nome}</h3>
        <p className={styles.description}>{product.descricao}</p>
        <p className={styles.price}>R$ {parseFloat(product.preco).toFixed(2)}</p>
        <p className={`${styles.status} ${product.ativo ? styles.active : styles.inactive}`}>
          {product.ativo ? '✓ Ativo' : '✗ Inativo'}
        </p>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.editBtn}
          onClick={() => onEdit(product)}
          disabled={loading}
        >
          ✏️ Editar
        </button>

        <button
          className={`${styles.deleteBtn} ${confirmDelete ? styles.confirmDelete : ''}`}
          onClick={handleDelete}
          disabled={loading}
        >
          {confirmDelete ? '⚠️ Confirmar?' : '🗑️ Deletar'}
        </button>

        {confirmDelete && (
          <button
            className={styles.cancelDeleteBtn}
            onClick={() => setConfirmDelete(false)}
            disabled={loading}
          >
            ✗ Cancelar
          </button>
        )}
      </div>
    </div>
  );
}
