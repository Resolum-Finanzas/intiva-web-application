import { useState } from 'react';
import { Car, Eye, EyeOff } from 'lucide-react';
import heroImg from '../../../../assets/hero.png';
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
                {t('common.acceptTerms', {
                  terms: t('common.termsOfService'),
                  privacy: t('common.privacyPolicy'),
                })}
              </label>
            </div>

            {error ? <p className="text-sm text-red-500">{error}</p> : null}

            <button
              type="submit"
              className="w-full bg-[var(--color-accent-primary)] text-white py-3 rounded-full font-semibold text-sm hover:bg-[var(--color-primary-800)] transition-all duration-300 hover:shadow-xl hover:scale-105 transform cursor-pointer"
            >
              {t('auth.createAccount')}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-[0.2em]">{t('auth.or')}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            type="button"
            className="w-full border border-gray-300 rounded-2xl py-3 flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition duration-200 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.10z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.70 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.30-4.53 6.16-4.53z" />
            </svg>
            {t('auth.continueWithGoogle')}
          </button>

          <p className="text-sm text-center mt-6 text-gray-500">
            {t('auth.haveAccount')}{' '}
            <button type="button" onClick={onGoLogin} className="text-[var(--color-accent-secondary)] font-semibold hover:text-[var(--color-text-primary)] hover:underline transition duration-200 cursor-pointer">
              {t('auth.login')}
            </button>
          </p>
        </div>

        <div className="hidden xl:flex items-center justify-center overflow-hidden rounded-[2rem] bg-[var(--color-accent-primary)] shadow-[0_24px_80px_rgba(15,23,42,0.12)] animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="relative h-[520px] w-full">
            <img src={heroImg} alt="Intiva" className="h-full w-full object-cover opacity-90" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-8 text-white">
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-primary-300)]">{t('auth.automotiveCredit')}</p>
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
