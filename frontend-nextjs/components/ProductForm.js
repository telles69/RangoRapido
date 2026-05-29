import { useState } from 'react';
import styles from '@/styles/productForm.module.css';

export default function ProductForm({ product, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState(
    product || {
      nome: '',
      descricao: '',
      preco: '',
      imagem_url: '',
    }
  );
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.nome.trim()) {
      setError('Nome do produto é obrigatório');
      return;
    }

    if (!formData.preco || parseFloat(formData.preco) <= 0) {
      setError('Preço deve ser maior que 0');
      return;
    }

    if (formData.preco && isNaN(parseFloat(formData.preco))) {
      setError('Preço deve ser um número válido');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formGroup}>
        <label htmlFor="nome">Nome do Produto *</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Ex: Pizza Margherita"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          placeholder="Ex: Pizza tradicional com tomate, mozzarella e manjericão"
          rows={4}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="preco">Preço (R$) *</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imagem_url">URL da Imagem</label>
          <input
            type="url"
            id="imagem_url"
            name="imagem_url"
            value={formData.imagem_url}
            onChange={handleChange}
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>
      </div>

      {formData.imagem_url && (
        <div className={styles.imagePreview}>
          <label>Prévia da Imagem:</label>
          <img src={formData.imagem_url} alt="Preview" />
        </div>
      )}

      <div className={styles.buttons}>
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Salvando...' : product ? 'Atualizar Produto' : 'Adicionar Produto'}
        </button>
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
