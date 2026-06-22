import {
  UserCircle,
  Lock,
  Bell,
  CreditCard,
  HelpCircle,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useI18n } from '../../../../core/i18n/useI18n';

interface ProfileMenuListProps {
  onLogout: () => void;
}

const ProfileMenuList: React.FC<ProfileMenuListProps> = ({ onLogout }) => {
  const { t } = useI18n();

  const menuItems = [
    { icon: UserCircle, title: t('profile.accountInfo'), description: t('profile.accountInfoDesc') },
    { icon: Lock, title: t('profile.privacySecurity'), description: t('profile.privacySecurityDesc') },
    { icon: Bell, title: t('profile.notifications'), description: t('profile.notificationsDesc') },
    { icon: CreditCard, title: t('profile.paymentMethods'), description: t('profile.paymentMethodsDesc') },
    { icon: HelpCircle, title: t('profile.helpSupport'), description: t('profile.helpSupportDesc') },
  ];

  return (
    <div>
        <h2 className="text-2xl font-bold text-[#1A237E]">{t('profile.title')}</h2>
      <p className="text-sm text-gray-500 mt-1 mb-6 animate-fade-in">{t('profile.subtitle')}</p>

      <div className="space-y-3">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-white hover:bg-[#E8EAF6] rounded-xl p-4 flex items-center gap-4 cursor-pointer border border-gray-100 transition-all duration-200 hover:translate-x-1 hover:shadow-md"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <Icon size={20} className="text-[#1A237E] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-400 truncate">{item.description}</p>
              </div>
              <ChevronRight size={16} className="text-gray-300 shrink-0" />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onLogout}
          className="border border-red-300 text-red-500 px-6 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-red-50 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <LogOut size={16} />
          {t('common.logout')}
        </button>
      </div>
    </div>
  );
};

export default ProfileMenuList;
