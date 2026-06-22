import { Camera } from 'lucide-react';
import type { Profile } from '../../domain/models/profile';
import { useI18n } from '../../../../core/i18n/useI18n';

interface ProfileCardProps {
  profile: Profile;
}

const getInitials = (name: string): string =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const { t } = useI18n();
  return (
  <div className="bg-[var(--color-bg-surface)] rounded-xl border border-gray-200 p-6 shadow-sm">
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center text-white text-2xl font-bold">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            getInitials(profile.name)
          )}
        </div>
        <div className="absolute bottom-0 right-0 bg-[var(--color-accent-primary)] text-white w-6 h-6 rounded-full flex items-center justify-center p-1">
          <Camera size={12} />
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mt-4">{profile.name}</h2>
      <p className="text-sm text-gray-500">{profile.email}</p>

      <div className="mt-3 bg-[var(--color-primary-50)] text-[var(--color-text-primary)] text-xs px-3 py-1 rounded-full font-medium">
        {t('profile.memberId')}: {profile.memberId}
      </div>
    </div>

    {profile.creditStatus && (
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('profile.creditStatus')}</h3>
        <div className="mt-2 bg-[var(--color-secondary-50)] rounded-lg px-4 py-3 flex items-center gap-2">
          <span className="text-[var(--color-accent-secondary)] text-sm font-bold">✓</span>
          <span className="text-[var(--color-accent-secondary)] text-sm font-semibold">
            {profile.creditStatus.label}  ${profile.creditStatus.amount.toLocaleString('en-US')}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">{t('profile.validUntil', { date: profile.creditStatus.validUntil })}</p>
      </div>
    )}
  </div>
  );
};

export default ProfileCard;
