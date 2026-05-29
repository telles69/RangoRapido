import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import styles from '@/styles/perfil.module.css';

export default function Perfil() {
  const router = useRouter();
  const { user, loading, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    endereco: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      setFormData({
        nome: user.nome || '',
        telefone: user.telefone || '',
        endereco: user.endereco_principal || '',
      });
    }
  }, [user, loading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await updateProfile(formData.nome, formData.telefone, formData.endereco);
      setMessage('Perfil atualizado com sucesso!');
    } catch (err) {
      setMessage('Erro ao atualizar perfil: ' + err.error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className={styles.container}>Carregando...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1>⚙️ Meu Perfil</h1>

      {message && (
        <div className={message.includes('sucesso') ? styles.success : styles.error}>
          {message}
        </div>
      )}

      <div className={styles.formContainer}>
        <div className={styles.section}>
          <h3>Informações da Conta</h3>
          <div className={styles.field}>
            <label>Email:</label>
            <p className={styles.readonly}>{user.email}</p>
          </div>
          <div className={styles.field}>
            <label>Tipo:</label>
            <p className={styles.readonly}>
              {user.tipo_usuario === 'cliente' ? 'Cliente' : 'Restaurante'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <h3>Dados Pessoais</h3>

          <div className={styles.formGroup}>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Telefone:</label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Endereço:</label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className={styles.submitBtn}
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </div>
  );
}
