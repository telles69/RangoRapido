import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, senha);
      router.push('/');
    } catch (err) {
      setError(err.error || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>🍔 RangoRápido</h2>
      <h1>Bem-vindo!</h1>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.submitBtn}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className={styles.link}>
        Não tem conta? <a href="/cadastro">Criar conta</a>
      </p>
    </div>
  );
}
