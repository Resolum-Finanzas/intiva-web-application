import { useI18n } from '../../../../core/i18n/useI18n';

interface HeroBannerProps {
  onExplore: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore }) => {
  const { t } = useI18n();
  return (
    <section className="relative bg-gradient-to-r from-primary to-primary-700 rounded-xl p-8 overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white">{t('home.heroTitle')}</h2>
        <p className="text-sm text-white/80 mt-2 max-w-lg">
          {t('home.heroDescription')}
        </p>
        <button
          onClick={onExplore}
          className="mt-6 inline-flex items-center gap-2 bg-[var(--color-accent-secondary)] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[var(--color-accent-secondary)] transition-all duration-300 hover:shadow-xl hover:scale-105 transform cursor-pointer"
        >
          {t('home.exploreCatalog')}
        </button>
      </div>
      <div className="absolute right-0 top-0 w-64 h-64 bg-[var(--color-bg-surface)] rounded-full opacity-[0.03] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute right-16 bottom-0 w-32 h-32 bg-[var(--color-bg-surface)] rounded-full opacity-[0.03] translate-y-1/2" />
    </section>
  );
};

export default HeroBanner;
