import LoginForm from '@/components/LoginForm';
import styles from '@/styles/auth.module.css';

export default function Login() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}
