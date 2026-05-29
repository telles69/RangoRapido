import styles from '@/styles/404.module.css';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>404</h1>
        <p>Página não encontrada</p>
        <a href="/">Voltar ao início</a>
      </div>
    </div>
  );
}
