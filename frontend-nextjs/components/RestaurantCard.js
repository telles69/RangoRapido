import Link from 'next/link';
import styles from './RestaurantCard.module.css';

export default function RestaurantCard({ restaurant }) {
  return (
    <Link href={`/restaurante/${restaurant.id}`}>
      <div className={styles.card}>
        <div className={styles.image}>🏪</div>
        <div className={styles.content}>
          <h3 className={styles.title}>{restaurant.nome_fantasia}</h3>
          <p className={styles.category}>{restaurant.categoria_principal}</p>
          <p className={styles.description}>
            {restaurant.descricao || 'Sem descrição'}
          </p>
        </div>
      </div>
    </Link>
  );
}
