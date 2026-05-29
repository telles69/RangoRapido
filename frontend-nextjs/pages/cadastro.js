import RegisterForm from '@/components/RegisterForm';
import styles from '@/styles/auth.module.css';

export default function Cadastro() {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
}
