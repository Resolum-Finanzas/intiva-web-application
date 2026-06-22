import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Download,
  Calendar,
  PauseCircle,
  TrendingUp,
  PiggyBank,
  Shield,
  Car,
} from 'lucide-react';
import type { SimulationResult } from '../../domain/models/Simulation';

interface SimulatorResultsProps {
  result: SimulationResult;
  onSave?: () => void;
}

const fmt = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fmtPct = (n: number) => `${(n * 100).toFixed(2)}%`;

const SimulatorResults: React.FC<SimulatorResultsProps> = ({ result, onSave }) => {
  const navigate = useNavigate();
  const { metrics, schedule } = result;

  const metricCards = [
    { icon: TrendingUp, label: 'TEA', value: fmtPct(metrics.tea) },
    { icon: BarChart3, label: 'TCEA', value: fmtPct(metrics.tcea) },
    { icon: PiggyBank, label: 'Cuota Mensual', value: `S/ ${fmt(metrics.cuotaMensual)}` },
    { icon: PauseCircle, label: 'Interés de Gracia', value: `S/ ${fmt(metrics.interesGracia)}` },
    { icon: Shield, label: 'Total Seguros', value: `S/ ${fmt(metrics.totalDesgravamen + metrics.totalSeguro)}` },
    { icon: Car, label: 'Total Financiado', value: `S/ ${fmt(metrics.totalFinanciado)}` },
  ];

  const totals = {
    interes: schedule.reduce((s, r) => s + r.interes, 0),
    amortizacion: schedule.reduce((s, r) => s + r.amortizacion, 0),
    desgravamen: schedule.reduce((s, r) => s + r.desgravamen, 0),
    seguro: schedule.reduce((s, r) => s + r.seguroVehicular, 0),
    saldoInicial: schedule[0]?.saldoInicial ?? 0,
    saldoFinal: schedule[schedule.length - 1]?.saldoFinal ?? 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1A237E] flex items-center gap-2">
          <BarChart3 size={20} />
          Resultados de la Simulación
        </h2>
        <div className="flex gap-2">
          {onSave && (
            <button
              onClick={onSave}
              className="border border-gray-300 text-gray-600 text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all duration-200"
            >
              <Download size={16} />
              Guardar
            </button>
          )}
          <button
            onClick={() => navigate('/simulador/schedule')}
            className="bg-[#1A237E] text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#283593] transition-all duration-200"
          >
            <Calendar size={16} />
            Ver Cronograma
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {metricCards.map((m) => (
          <div key={m.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <m.icon size={16} className="text-[#1A237E]" />
              <p className="text-xs text-gray-400 uppercase tracking-wider">{m.label}</p>
            </div>
            <p className="text-xl font-bold text-[#1A237E]">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-500 font-semibold uppercase">
                <td className="px-3 py-2.5">N°</td>
                <td className="px-3 py-2.5">FECHA</td>
                <td className="px-3 py-2.5">SALDO INICIAL</td>
                <td className="px-3 py-2.5">INTERÉS</td>
                <td className="px-3 py-2.5">AMORTIZACIÓN</td>
                <td className="px-3 py-2.5">DESGRAVAMEN</td>
                <td className="px-3 py-2.5">SEG. VEHICULAR</td>
                <td className="px-3 py-2.5">CUOTA TOTAL</td>
                <td className="px-3 py-2.5">SALDO FINAL</td>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schedule.map((r) => {
                const rowBg = r.isGrace
                  ? 'bg-[#E8EAF6]'
                  : r.isBalloon
                  ? 'bg-[#1A237E] text-white'
                  : 'bg-white';

                return (
                  <tr key={r.num} className={`${rowBg} hover:bg-gray-50 transition-colors`}>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        {r.isGrace && <PauseCircle size={12} className="text-[#1A237E]" />}
                        <span>
                          {r.isBalloon ? (
                            <span className="bg-[#2E7D32] text-white text-xs rounded px-1.5 py-0.5">
                              CUOTA BALÓN
                            </span>
                          ) : (
                            r.num
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">{r.fecha}</td>
                    <td className="px-3 py-2.5">S/ {fmt(r.saldoInicial)}</td>
                    <td className="px-3 py-2.5">S/ {fmt(r.interes)}</td>
                    <td className="px-3 py-2.5">
                      {r.isGrace ? '0.00' : `S/ ${fmt(r.amortizacion)}`}
                    </td>
                    <td className="px-3 py-2.5">S/ {fmt(r.desgravamen)}</td>
                    <td className="px-3 py-2.5">S/ {fmt(r.seguroVehicular)}</td>
                    <td className="px-3 py-2.5">S/ {fmt(r.cuotaTotal)}</td>
                    <td className="px-3 py-2.5">S/ {fmt(r.saldoFinal)}</td>
                  </tr>
                );
              })}

              <tr className="bg-[#1A237E] text-white font-bold">
                <td className="px-3 py-2.5" colSpan={2}>TOTALES</td>
                <td className="px-3 py-2.5">S/ {fmt(totals.saldoInicial)}</td>
                <td className="px-3 py-2.5">S/ {fmt(totals.interes)}</td>
                <td className="px-3 py-2.5">S/ {fmt(totals.amortizacion)}</td>
                <td className="px-3 py-2.5">S/ {fmt(totals.desgravamen)}</td>
                <td className="px-3 py-2.5">S/ {fmt(totals.seguro)}</td>
                <td className="px-3 py-2.5" />
                <td className="px-3 py-2.5">S/ {fmt(totals.saldoFinal)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-400 italic">
        * Los valores mostrados son referenciales y pueden variar según la evaluación crediticia.
        Este cronograma no constituye una oferta vinculante.
      </p>
    </div>
  );
};

export default SimulatorResults;
