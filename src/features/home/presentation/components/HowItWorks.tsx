import { useI18n } from '../../../../core/i18n/useI18n';
import { Calculator } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const { t } = useI18n();
  const steps = [
    { number: 1, title: t('home.step1Title'), description: t('home.step1Desc'), active: true },
    { number: 2, title: t('home.step2Title'), description: t('home.step2Desc'), active: false },
    { number: 3, title: t('home.step3Title'), description: t('home.step3Desc'), active: false },
    { number: 4, title: t('home.step4Title'), description: t('home.step4Desc'), active: false },
  ];

  return (
    <div className="bg-white rounded-2xl p-8">
      <h3 className="text-center text-lg font-bold text-[#111827] mb-8">
        {t('home.howItWorksTitle')}
      </h3>
      <div className="relative grid grid-cols-4 gap-2">
        <div className="absolute top-[19px] left-[15%] right-[15%] h-px bg-gray-200 z-0" />
        {steps.map((step, i) => (
          <div key={step.number} className="relative z-10 flex flex-col items-center text-center px-1 animate-fade-in-up" style={{ animationDelay: `${i * 0.12}s` }}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold border-2 ${step.active
                ? 'bg-[#1A237E] text-white border-[#1A237E]'
                : 'bg-white text-[#9CA3AF] border-gray-200'
              }`}>
              {step.number}
            </div>
            <h4 className="mt-3 text-sm font-semibold text-[#111827]">{step.title}</h4>
            <p className="mt-1 text-xs leading-5 text-[#6B7280]">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {/* navigate to simulator */ }}
          className="inline-flex items-center gap-2 bg-[#1A237E] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#151b5e] hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <Calculator size={16} className="transition-transform duration-300 group-hover:rotate-12" />
          {t('home.startSimulation')}
        </button>
      </div>
    </div>
  );
};
export default HowItWorks;
