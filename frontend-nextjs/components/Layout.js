import { AuthProvider } from '@/contexts/AuthContext';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <Header />
      <main>{children}</main>
    </AuthProvider>
  );
}
