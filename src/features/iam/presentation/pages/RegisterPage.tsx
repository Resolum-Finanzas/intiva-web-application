import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { RouteNames } from '../../../../core/navigation/router/Router-name';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <RegisterForm
      onRegister={() => navigate(RouteNames.signIn)}
      onGoLogin={() => navigate(RouteNames.signIn)}
    />
  );
};

export default RegisterPage;
