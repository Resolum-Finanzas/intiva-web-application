import ProfileCard from '../components/ProfileCard';
import ProfileMenuList from '../components/ProfileMenuList';
import PageContainer from '../../../../shared/presentation/components/pagecontainer/PageContainer.component';
import type { Profile } from '../../domain/models/profile';

interface ProfilePageProps {
  onLogout: () => void;
}

const mockProfile: Profile = {
  id: 'usr_001',
  name: 'Juan Pérez',
  email: 'juan.perez@email.com',
  memberId: 'INT-84729',
  creditStatus: {
    label: 'Pre-Approved',
    amount: 25000,
    validUntil: 'Oct 15, 2024',
  },
};

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => (
  <PageContainer>
    <div className="flex gap-6">
      <div className="w-[30%] animate-fade-in-up">
        <ProfileCard profile={mockProfile} />
      </div>
      <div className="w-[70%] animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
        <ProfileMenuList onLogout={onLogout} />
      </div>
    </div>
  </PageContainer>
);

export default ProfilePage;
