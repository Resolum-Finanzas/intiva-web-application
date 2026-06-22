import type { ReactNode } from 'react';

type PageContainerVariant = 'default' | 'white' | 'flush';

interface PageContainerProps {
  children: ReactNode;
  variant?: PageContainerVariant;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}

const variantStyles: Record<PageContainerVariant, string> = {
  default: 'bg-[#F5F5F5]',
  white: 'bg-white rounded-xl shadow-sm',
  flush: 'p-0',
};

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  variant = 'default',
  title,
  subtitle,
  actions,
}) => (
  <div className={`px-6 w-full ${variantStyles[variant]}`}>
    {(title || subtitle || actions) && (
      <div className="flex items-start justify-between mb-6">
        <div>
          {title && <h1 className="text-2xl font-bold text-[#1A237E]">{title}</h1>}
          {subtitle && <p className="text-sm text-[#9E9E9E] mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0 ml-4">{actions}</div>}
      </div>
    )}
    {children}
  </div>
);

export default PageContainer;
