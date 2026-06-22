import { useNavigate } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import BenefitsList from '../components/BenefitsList';
import HowItWorks from '../components/HowItWorks';
import PageContainer from '../../../../shared/presentation/components/pagecontainer/PageContainer.component';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-down">
        <HeroBanner onExplore={() => navigate('/catalog')} />
      </div>
      <PageContainer>
        <div className="space-y-6">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <BenefitsList />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <HowItWorks />
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default DashboardPage;
