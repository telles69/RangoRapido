import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    endereco: '',
    tipo: 'cliente',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(
        formData.nome,
        formData.email,
        formData.senha,
        formData.telefone,
        formData.endereco,
        formData.tipo
      );
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError(err.error || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.success}>
          ✅ Cadastro realizado com sucesso!
          <p>Redirecionando para login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2>🍔 RangoRápido</h2>
      <h1>Criar Conta</h1>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Seu nome completo"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="seu@email.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Telefone:</label>
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(11) 9 1234-5678"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            placeholder="Rua A, 123"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Tipo de Conta:</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          >
            <option value="cliente">Cliente</option>
            <option value="restaurante">Restaurante</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.submitBtn}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <p className={styles.link}>
        Já tem conta? <a href="/login">Fazer login</a>
      </p>
    </div>
  );
}
