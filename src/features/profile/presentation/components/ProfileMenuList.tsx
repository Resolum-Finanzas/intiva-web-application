import { useState } from 'react';
import {
  UserCircle,
  Lock,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  LogOut,
  Eye,
  EyeOff,
  Check,
  X,
  Mail,
  Phone,
  FileText,
} from 'lucide-react';
import { useI18n } from '../../../../core/i18n/useI18n';

interface ProfileMenuListProps {
  onLogout: () => void;
}

const ProfileMenuList: React.FC<ProfileMenuListProps> = ({ onLogout }) => {
  const { t } = useI18n();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [accountData, setAccountData] = useState({
    name: 'Juan Pérez',
    phone: '+51 999 888 777',
    address: 'Av. Principal 123, Lima',
  });
  const [accountMessage, setAccountMessage] = useState<string | null>(null);
  const [savingAccount, setSavingAccount] = useState(false);
  const [faqExpanded, setFaqExpanded] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const faqItems = [
    { q: 'profile.faq1Q', a: 'profile.faq1A' },
    { q: 'profile.faq2Q', a: 'profile.faq2A' },
    { q: 'profile.faq3Q', a: 'profile.faq3A' },
    { q: 'profile.faq4Q', a: 'profile.faq4A' },
    { q: 'profile.faq5Q', a: 'profile.faq5A' },
  ];

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setPasswordMessage(null);
  };

  const handlePasswordChange = (field: 'current' | 'new' | 'confirm', value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordSubmit = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      setPasswordMessage({ type: 'error', text: t('profile.allFieldsRequired') });
      return;
    }
    if (passwordData.new.length < 8) {
      setPasswordMessage({ type: 'error', text: t('profile.passwordMinLength') });
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      setPasswordMessage({ type: 'error', text: t('profile.passwordsNotMatch') });
      return;
    }
    setPasswordMessage({ type: 'success', text: t('profile.passwordUpdated') });
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const menuItems = [
    { icon: UserCircle, title: t('profile.accountInfo'), description: t('profile.accountInfoDesc') },
    { icon: Lock, title: t('profile.privacySecurity'), description: t('profile.privacySecurityDesc') },
    { icon: HelpCircle, title: t('profile.helpSupport'), description: t('profile.helpSupportDesc') },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{t('profile.title')}</h2>
      <p className="text-sm text-gray-500 mt-1 mb-6 animate-fade-in">{t('profile.subtitle')}</p>

      <div className="space-y-3">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          const isExpanded = expandedIndex === i;
          return (
            <div key={item.title} className="bg-[var(--color-bg-surface)] rounded-xl border border-gray-100 overflow-hidden transition-all duration-200">
              <div
                onClick={() => handleToggle(i)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[var(--color-primary-50)] transition-all duration-200 hover:translate-x-1"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <Icon size={20} className="text-[var(--color-text-primary)] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400 truncate">{item.description}</p>
                </div>
                {isExpanded ? (
                  <ChevronDown size={16} className="text-gray-300 shrink-0" />
                ) : (
                  <ChevronRight size={16} className="text-gray-300 shrink-0" />
                )}
              </div>

              <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isExpanded && (i === 0 || i === 1) ? '1fr' : '0fr' }}>
                <div className="overflow-hidden">
                  <div className="px-4 border-t border-gray-100 pt-4 space-y-3">
                    {i === 0 && (
                      <>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">{t('profile.name')}</label>
                          <input
                            value={accountData.name}
                            onChange={(e) => setAccountData((p) => ({ ...p, name: e.target.value }))}
                            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-transparent bg-transparent"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">{t('profile.phone')}</label>
                          <input
                            value={accountData.phone}
                            onChange={(e) => setAccountData((p) => ({ ...p, phone: e.target.value }))}
                            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-transparent bg-transparent"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">{t('profile.address')}</label>
                          <textarea
                            rows={2}
                            value={accountData.address}
                            onChange={(e) => setAccountData((p) => ({ ...p, address: e.target.value }))}
                            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-transparent bg-transparent resize-none"
                          />
                        </div>

                        {accountMessage && (
                          <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-green-50 text-green-700">
                            <Check size={14} />
                            {accountMessage}
                          </div>
                        )}

                        <button
                          onClick={() => {
                            setSavingAccount(true);
                            setTimeout(() => {
                              setSavingAccount(false);
                              setAccountMessage(t('profile.accountUpdated'));
                              setTimeout(() => setAccountMessage(null), 3000);
                            }, 500);
                          }}
                          disabled={savingAccount}
                          className="bg-[var(--color-accent-primary)] dark:bg-blue-600 text-white text-sm px-5 py-2 rounded-lg font-medium hover:opacity-90 hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50"
                        >
                          {t('common.save')}
                        </button>
                      </>
                    )}
                    {i === 1 && (
                      <>
                        <div className="relative">
                          <label className="text-xs text-gray-500 mb-1 block">{t('profile.currentPassword')}</label>
                          <input
                            type={showPasswords ? 'text' : 'password'}
                            value={passwordData.current}
                            onChange={(e) => handlePasswordChange('current', e.target.value)}
                            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-transparent bg-transparent"
                            placeholder="••••••••"
                          />
                        </div>
                        <div className="relative">
                          <label className="text-xs text-gray-500 mb-1 block">{t('profile.newPassword')}</label>
                          <input
                            type={showPasswords ? 'text' : 'password'}
                            value={passwordData.new}
                            onChange={(e) => handlePasswordChange('new', e.target.value)}
                            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-transparent bg-transparent"
                            placeholder={t('profile.minChars')}
                          />
                        </div>
                        <div className="relative">
                          <label className="text-xs text-gray-500 mb-1 block">{t('profile.confirmNewPassword')}</label>
                          <input
                            type={showPasswords ? 'text' : 'password'}
                            value={passwordData.confirm}
                            onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-transparent bg-transparent"
                            placeholder={t('profile.repeatPassword')}
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setShowPasswords((p) => !p)}
                            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                          >
                            {showPasswords ? <EyeOff size={14} /> : <Eye size={14} />}
                            {showPasswords ? t('profile.hide') : t('profile.show')}
                          </button>
                        </div>

                        {passwordMessage && (
                          <div
                            className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
                              passwordMessage.type === 'success'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-red-50 text-red-600'
                            }`}
                          >
                            {passwordMessage.type === 'success' ? <Check size={14} /> : <X size={14} />}
                            {passwordMessage.text}
                          </div>
                        )}

                        <button
                          onClick={handlePasswordSubmit}
                          className="bg-[var(--color-accent-primary)] dark:bg-blue-600 text-white text-sm px-5 py-2 rounded-lg font-medium hover:opacity-90 hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                          {t('profile.updatePassword')}
                        </button>
                      </>
                    )}
                  </div>
                  {/* bottom padding spacer for collapse animation */}
                  <div className={isExpanded && (i === 0 || i === 1) ? 'pb-4' : ''} />
                </div>
              </div>

              <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isExpanded && i === 2 ? '1fr' : '0fr' }}>
                <div className="overflow-hidden">
                  <div className="px-4 border-t border-gray-100 pt-4 space-y-3">
                    <a
                      href="mailto:soporte@intiva.pe"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                    >
                      <Mail size={18} className="text-[var(--color-text-primary)] shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 group-hover:text-[var(--color-text-primary)]">
                          {t('profile.emailSupport')}
                        </p>
                        <p className="text-xs text-gray-400">{t('profile.emailAddress')}</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer">
                      <Phone size={18} className="text-[var(--color-text-primary)] shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 group-hover:text-[var(--color-text-primary)]">
                          {t('profile.phoneSupport')}
                        </p>
                        <p className="text-xs text-gray-400">{t('profile.phoneInfo')}</p>
                      </div>
                    </div>

                    <div
                      onClick={() => setFaqExpanded((prev) => !prev)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                    >
                      <FileText size={18} className="text-[var(--color-text-primary)] shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 group-hover:text-[var(--color-text-primary)]">
                          {t('profile.faqTitle')}
                        </p>
                        <p className="text-xs text-gray-400">{t('profile.faqDesc')}</p>
                      </div>
                      {faqExpanded ? <ChevronDown size={16} className="text-gray-400 shrink-0" /> : <ChevronRight size={16} className="text-gray-400 shrink-0" />}
                    </div>

                    <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: faqExpanded ? '1fr' : '0fr' }}>
                      <div className="overflow-hidden">
                        <div className="space-y-1 pl-2">
                          {faqItems.map((item, fi) => (
                            <div key={fi} className="border border-gray-100 rounded-lg overflow-hidden">
                              <button
                                onClick={() => setFaqOpenIndex(faqOpenIndex === fi ? null : fi)}
                                className="w-full flex items-center justify-between text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                              >
                                <span className="font-medium">{t(item.q)}</span>
                                {faqOpenIndex === fi ? <ChevronDown size={14} className="shrink-0 text-gray-400" /> : <ChevronRight size={14} className="shrink-0 text-gray-400" />}
                              </button>
                              <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: faqOpenIndex === fi ? '1fr' : '0fr' }}>
                                <div className="overflow-hidden">
                                  <div className="px-3 pb-3 text-xs text-gray-500 leading-relaxed">
                                    {t(item.a)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={isExpanded && i === 2 ? 'pb-4' : ''} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onLogout}
          className="border border-red-300 text-red-500 px-6 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-red-50 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 transform cursor-pointer"
        >
          <LogOut size={16} />
          {t('common.logout')}
        </button>
      </div>
    </div>
  );
};

export default ProfileMenuList;
