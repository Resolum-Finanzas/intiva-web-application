import type { LucideIcon } from 'lucide-react';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon: Icon, title, description }) => (
  <div className="h-full rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-bg-surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-secondary-50)] text-[var(--color-accent-secondary)]">
      <Icon size={22} />
    </div>
    <h3 className="mt-4 text-base font-bold text-[var(--color-text-primary)]">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{description}</p>
  </div>
);

export default BenefitCard;
