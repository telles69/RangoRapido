import styles from './OrderList.module.css';

export default function OrderList({ orders }) {
  const getStatusColor = (status) => {
    const statusMap = {
      'Pendente': 'pending',
      'Preparando': 'preparing',
      'Saiu para Entrega': 'shipping',
      'Entregue': 'delivered',
    };
    return statusMap[status] || 'pending';
  };

  return (
    <div className={styles.list}>
      {orders.length === 0 ? (
        <div className={styles.empty}>
          <p>Nenhum pedido encontrado</p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className={styles.orderItem}>
            <div className={styles.orderInfo}>
              <h3>Pedido #{order.id}</h3>
              <p className={styles.date}>
                {new Date(order.data_pedido).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div className={styles.orderValue}>
              R$ {order.valor_total.toFixed(2)}
            </div>
            <div className={`${styles.status} ${styles[getStatusColor(order.status)]}`}>
              {order.status}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
