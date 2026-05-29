import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import styles from './Header.module.css';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.logo}>
            🍔 RangoRápido
          </div>
        </Link>

        <div className={styles.headerRight}>
          {user ? (
            <>
              <span className={styles.userInfo}>
                👤 {user.nome}
              </span>
              {user.tipo_usuario === 'cliente' ? (
                <>
                  <Link href="/pedidos">
                    <button className={`${styles.btn} ${styles.secondary}`}>
                      📋 Meus Pedidos
                    </button>
                  </Link>
                  <Link href="/perfil">
                    <button className={`${styles.btn} ${styles.secondary}`}>
                      ⚙️ Perfil
                    </button>
                  </Link>
                </>
              ) : (
                <Link href="/admin">
                  <button className={`${styles.btn} ${styles.secondary}`}>
                    📊 Admin
                  </button>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={`${styles.btn} ${styles.danger}`}
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className={`${styles.btn} ${styles.primary}`}>
                  Login
                </button>
              </Link>
              <Link href="/cadastro">
                <button className={`${styles.btn} ${styles.secondary}`}>
                  Cadastro
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
