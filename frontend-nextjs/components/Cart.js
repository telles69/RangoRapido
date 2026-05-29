import styles from './Cart.module.css';

export default function Cart({ items, onRemove, onCheckout, isOpen, onClose }) {
  const total = items.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h3>🛒 Carrinho</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>Seu carrinho está vazio</p>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item, index) => (
                <div key={index} className={styles.item}>
                  <div className={styles.info}>
                    <div className={styles.itemName}>{item.nome}</div>
                    <div className={styles.itemQty}>Qtd: {item.quantidade}</div>
                  </div>
                  <div className={styles.itemPrice}>
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => onRemove(index)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <button
                className={styles.checkoutBtn}
                onClick={onCheckout}
              >
                Finalizar Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
