import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { RouteNames } from '../../../../core/navigation/router/Router-name';
import { AuthError } from '../../data/remote/services/authService';
import { authRepositoryImpl } from '../../data/repositories/authRepositoryImpl';

const ERROR_MESSAGES: Record<string, string> = {
  invalidCredentials: 'El correo o la contraseña que ingresaste no son correctos. Verifica tus datos y vuelve a intentarlo.',
  unauthorized: 'No autorizado. Inicia sesión para continuar.',
  forbidden: 'No tienes permisos para realizar esta acción.',
  notFound: 'Servicio no disponible. Por favor, intenta más tarde.',
  invalidData: 'Los datos ingresados no son válidos. Revisa los campos e intenta nuevamente.',
  serverError: 'Error en el servidor. Por favor, intenta más tarde.',
  unknownError: 'Ocurrió un error inesperado. Por favor, intenta nuevamente.',
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setError('');
    setLoading(true);
    try {
      await authRepositoryImpl.login(email, password);
      navigate(RouteNames.home);
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.serverMessage ?? ERROR_MESSAGES[err.code] ?? ERROR_MESSAGES.unknownError);
      } else {
        setError(ERROR_MESSAGES.unknownError);
      }
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
