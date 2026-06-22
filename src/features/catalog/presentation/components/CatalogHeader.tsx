interface CatalogHeaderProps {
  title: string;
  subtitle: string;
}

const CatalogHeader: React.FC<CatalogHeaderProps> = ({ title, subtitle }) => (
  <div className="animate-fade-in-down">
    <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{title}</h1>
    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
  </div>
);

export default CatalogHeader;
