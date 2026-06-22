import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { RouteNames } from '../../../../core/navigation/router/Router-name';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setError('');
    setLoading(true);
    try {
      const { TokenStorage } = await import('../../../../core/storage/Token-storage');
      const { authRepositoryImpl } = await import('../../data/repositories/authRepositoryImpl');
      const user = await authRepositoryImpl.login(email, password);
      const tokenStorage = new TokenStorage();
      await tokenStorage.save(user.id);
      navigate(RouteNames.home);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      error={error}
      loading={loading}
      onLogin={handleLogin}
      onGoRegister={() => navigate(RouteNames.signUp)}
    />
  );
};

export default LoginPage;
