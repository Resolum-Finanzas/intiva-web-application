import { FiX, FiFileText, FiShield, FiCheckSquare, FiLock } from 'react-icons/fi';

interface TermsDialogProps {
  open: boolean;
  onClose: () => void;
}

const sections = [
  { id: 'a', icon: FiFileText, title: 'Aceptación de términos', text: 'Al utilizar la aplicación Intiva, declaras haber leído, comprendido y aceptado las presentes condiciones del crédito vehicular antes de continuar con la solicitud.' },
  { id: 'b', icon: FiShield, title: 'Transparencia de información financiera', text: 'La aplicación muestra de forma clara y oportuna la Tasa Efectiva Anual (TEA), la Tasa de Costo Efectivo Anual (TCEA), comisiones, gastos, seguros (incluyendo seguro de desgravamen) y el cronograma de pagos generado bajo el método francés, cumpliendo con lo dispuesto en la Resolución SBS N.° 8181-2012 y la Resolución SBS N.° 02190-2020.' },
  { id: 'c', icon: FiFileText, title: 'Condiciones especiales del crédito vehicular', text: 'El crédito puede incluir períodos de gracia (parcial o total) y una cuota balón bajo la modalidad "compra inteligente". Al vencimiento de la cuota balón, podrás optar por refinanciar el saldo restante o devolver el bien vehicular, conforme a las condiciones pactadas.' },
  { id: 'd', icon: FiFileText, title: 'Derecho a pagos anticipados', text: 'Puedes realizar amortizaciones totales o parciales del crédito en cualquier momento, sin penalidad alguna. Esto generará un nuevo cronograma de pagos actualizado, reflejando la reducción del saldo y los intereses.' },
  { id: 'e', icon: FiFileText, title: 'Ficha de Caracterización del Producto (FCP)', text: 'Antes de la contratación, recibirás la Ficha de Caracterización del Producto (FCP), que detalla el Costo Financiero Total (CFT), simula escenarios de pago e incluye opciones de refinanciamiento o devolución del bien al vencimiento de la cuota balón, conforme a la Ley N.° 31143.' },
  { id: 'f', icon: FiLock, title: 'Política de privacidad de datos', text: 'Los datos personales y financieros proporcionados serán tratados conforme a la normativa peruana de protección de datos personales (Ley N.° 29733). La información será utilizada exclusivamente para fines de cálculo crediticio, generación de cronogramas de pago, comunicación de condiciones del producto y cumplimiento de obligaciones regulatorias ante la SBS.' },
  { id: 'g', icon: FiCheckSquare, title: 'Consentimiento informado', text: 'Para continuar con la solicitud del crédito, deberás marcar la casilla de aceptación explícita, confirmando que has revisado y aceptas los términos y condiciones, así como la política de privacidad descritos en esta sección.' },
];

const TermsDialog: React.FC<TermsDialogProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[75vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-primary)]/10 flex items-center justify-center flex-shrink-0">
            <FiFileText size={20} className="text-[var(--color-accent-primary)]" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-extrabold text-gray-900 leading-tight">Términos y condiciones</h2>
            <p className="text-xs text-gray-400 mt-0.5">Política de privacidad y condiciones del servicio de Intiva</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
          >
            <FiX size={18} />
          </button>
        </div>
 
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 text-sm text-gray-600 leading-relaxed scrollbar-thin">
          {sections.map((s) => (
            <section key={s.id} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <s.icon size={16} className="text-[var(--color-accent-primary)]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1 text-sm">
                  {s.id.toUpperCase()}) {s.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.text}</p>
              </div>
            </section>
          ))}
        </div>
 
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto sm:px-8 bg-[var(--color-accent-primary)] text-white py-2.5 rounded-xl font-bold text-sm hover:bg-[var(--color-primary-800)] hover:shadow-lg transition-all duration-200 cursor-pointer text-center"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsDialog;
