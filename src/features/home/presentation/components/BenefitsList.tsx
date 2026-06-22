import { Zap, Percent, Sliders } from 'lucide-react';
import { useI18n } from '../../../../core/i18n/useI18n';
import BenefitCard from './BenefitCard';

const BenefitsList: React.FC = () => {
  const { t } = useI18n();
  const benefits = [
    {
      icon: Zap,
      title: t('home.benefit1Title'),
      description: t('home.benefit1Desc'),
    },
    {
      icon: Percent,
      title: t('home.benefit2Title'),
      description: t('home.benefit2Desc'),
    },
    {
      icon: Sliders,
      title: t('home.benefit3Title'),
      description: t('home.benefit3Desc'),
    },
  ];

  return (
    <div className="grid gap-6 items-stretch xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1">
      {benefits.map((b) => (
        <BenefitCard key={b.title} icon={b.icon} title={b.title} description={b.description} />
      ))}
    </div>
  );
};

export default BenefitsList;
