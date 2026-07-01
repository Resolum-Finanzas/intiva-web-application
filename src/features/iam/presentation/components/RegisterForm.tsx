import { useState } from 'react';
import { Car, Eye, EyeOff } from 'lucide-react';
import TermsDialog from './TermsDialog';

import { useI18n } from '../../../../core/i18n/useI18n';

interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
}

interface RegisterFormProps {
  onRegister: (data: RegisterDto) => void;
  onGoLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onGoLogin }) => {
  const { t } = useI18n();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showTerms, setShowTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setError(t('auth.acceptTermsError'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('auth.passwordsMustMatch'));
      return;
    }

    setError('');
    onRegister({ fullName, email, password });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-10 xl:grid-cols-[420px_1fr]">
        <div className="rounded-[2rem] border border-gray-200 bg-[var(--color-bg-surface)]/95 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl animate-slide-up">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center text-white shadow-lg">
              <Car size={28} />
            </div>
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mt-6">Intiva</h1>
            <p className="text-sm text-gray-500 mt-2">{t('auth.automotiveCredit')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="sr-only" htmlFor="register-fullname">
                {t('auth.name')}
              </label>
              <input
                id="register-fullname"
                type="text"
                placeholder={t('auth.name')}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] transition duration-200"
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="register-email">
                {t('auth.email')}
              </label>
              <input
                id="register-email"
                type="email"
                placeholder={t('auth.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] transition duration-200"
              />
            </div>

            <div className="relative">
              <label className="sr-only" htmlFor="register-password">
                {t('auth.password')}
              </label>
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] transition duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <label className="sr-only" htmlFor="register-confirm-password">
                {t('auth.confirmPassword')}
              </label>
              <input
                id="register-confirm-password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.confirmPassword')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] transition duration-200"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[var(--color-text-primary)] focus:ring-[var(--color-accent-primary)]"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Acepto los{' '}
                <button type="button" onClick={() => setShowTerms(true)} className="text-[var(--color-accent-primary)] underline hover:text-[var(--color-primary-800)] cursor-pointer">
                  Términos de Servicio
                </button>{' '}
                y la{' '}
                <button type="button" onClick={() => setShowTerms(true)} className="text-[var(--color-accent-primary)] underline hover:text-[var(--color-primary-800)] cursor-pointer">
                  Política de Privacidad
                </button>.
              </label>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 rounded-2xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[var(--color-accent-primary)] text-white py-3 rounded-full font-semibold text-sm hover:bg-[var(--color-primary-800)] transition-all duration-300 hover:shadow-xl hover:scale-105 transform cursor-pointer"
            >
              {t('auth.createAccount')}
            </button>
          </form>



          <p className="text-sm text-center mt-6 text-gray-500">
            {t('auth.haveAccount')}{' '}
            <button type="button" onClick={onGoLogin} className="text-[var(--color-accent-secondary)] font-semibold hover:text-[var(--color-text-primary)] hover:underline transition duration-200 cursor-pointer">
              {t('auth.login')}
            </button>
          </p>
        </div>

        <TermsDialog open={showTerms} onClose={() => setShowTerms(false)} />

        <div className="hidden xl:flex items-stretch overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(15,23,42,0.12)] animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="relative h-full min-h-[520px] w-full">
            <img src="/car.png" alt="Intiva" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-8 text-white">
              <p className="text-sm uppercase tracking-[0.24em] text-white drop-shadow-lg font-semibold">{t('auth.automotiveCredit')}</p>
              <h2 className="mt-3 text-3xl font-bold">{t('auth.registerHeroTitle')}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-200">
                {t('auth.registerHeroDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
