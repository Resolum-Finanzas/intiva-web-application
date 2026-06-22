import { Download, Plus, PauseCircle } from 'lucide-react';
import { useI18n } from '../../../../core/i18n/useI18n';
import PageContainer from '../../../../shared/presentation/components/pagecontainer/PageContainer.component';

const metrics = [
  { label: 'TEA (TASA EFECTIVA ANUAL)', value: '12.50%' },
  { label: 'TCEA', value: '14.20%' },
  { label: 'INTERÉS DE GRACIA', value: 'S/ 450.00' },
  { label: 'VAN / TIR', value: 'S/ 1,200 / 15%' },
];

const rows = [
  { num: 0, fecha: '15/04/2024', saldoInicial: 65000, interes: 677.08, amortizacion: 0, desgravamen: 36.40, segVehicular: 85, cuotaTotal: 798.48, saldoFinal: 65000, gracia: true },
  { num: 1, fecha: '15/05/2024', saldoInicial: 65000, interes: 677.08, amortizacion: 1217.38, desgravamen: 36.40, segVehicular: 85, cuotaTotal: 2015.86, saldoFinal: 63782.62 },
  { num: 2, fecha: '15/06/2024', saldoInicial: 63782.62, interes: 664.40, amortizacion: 1230.06, desgravamen: 35.72, segVehicular: 85, cuotaTotal: 2015.18, saldoFinal: 62552.56 },
  { num: 3, fecha: '15/07/2024', saldoInicial: 62552.56, interes: 651.59, amortizacion: 1242.87, desgravamen: 35.03, segVehicular: 85, cuotaTotal: 2014.49, saldoFinal: 61309.69 },
  { num: 4, fecha: '15/08/2024', saldoInicial: 61309.69, interes: 638.64, amortizacion: 1255.82, desgravamen: 34.33, segVehicular: 85, cuotaTotal: 2013.79, saldoFinal: 60053.87, balon: true },
];

const totalRow = { num: 0, fecha: 'TOTALES', saldoInicial: 65000, interes: 2708.71, amortizacion: 4946.13, desgravamen: 177.88, segVehicular: 425, cuotaTotal: 0, saldoFinal: 66480.77 };

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const SchedulePage: React.FC = () => {
  const { t } = useI18n();

  const metricLabels = [
    t('schedule.tea'),
    t('schedule.tcea'),
    t('schedule.graceInterest'),
    t('schedule.vanTir'),
  ];

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6 animate-fade-in-down">
        <h1 className="text-2xl font-bold text-[#1A237E]">{t('schedule.title')}</h1>
        <div className="flex gap-3">
          <button className="border border-gray-300 text-gray-600 text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all duration-200">
            <Download size={16} />
            {t('common.exportPdf')}
          </button>
          <button className="bg-[#1A237E] text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#283593] transition-all duration-200">
            <Plus size={16} />
            {t('common.newSimulation')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <div key={m.label} className="animate-fade-in-up bg-white border border-gray-200 rounded-xl p-4 shadow-sm" style={{ animationDelay: `${i * 0.08}s` }}>
            <p className="text-xs text-gray-400 uppercase tracking-wider">{metricLabels[i]}</p>
            <p className="text-2xl font-bold text-[#1A237E] mt-1">{m.value}</p>
          </div>
        ))}
      </div>

    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 text-gray-500 font-semibold uppercase">
              <td className="px-4 py-3">{t('schedule.installment')}</td>
              <td className="px-4 py-3">{t('schedule.date')}</td>
              <td className="px-4 py-3">{t('schedule.initialBalance')}</td>
              <td className="px-4 py-3">{t('schedule.interest')}</td>
              <td className="px-4 py-3">{t('schedule.amortization')}</td>
              <td className="px-4 py-3">{t('schedule.desgravamen')}</td>
              <td className="px-4 py-3">{t('schedule.vehicleInsurance')}</td>
              <td className="px-4 py-3">{t('schedule.totalPayment')}</td>
              <td className="px-4 py-3">{t('schedule.finalBalance')}</td>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((r) => {
              const isGracia = r.gracia;
              const isBalon = r.balon;
              const rowBg = isGracia ? 'bg-[#E8EAF6]' : isBalon ? 'bg-[#1A237E] text-white' : 'bg-white';

              return (
                <tr key={r.num} className={`${rowBg} hover:bg-gray-50 transition-colors`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {isGracia && <PauseCircle size={14} className="text-[#1A237E]" />}
                      <span>{isBalon ? ( <span className="bg-[#2E7D32] text-white text-xs rounded px-1.5 py-0.5">{t('schedule.balloonPayment')}</span> ) : r.num}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{r.fecha}</td>
                  <td className="px-4 py-3">S/ {fmt(r.saldoInicial)}</td>
                  <td className="px-4 py-3">S/ {fmt(r.interes)}</td>
                  <td className="px-4 py-3">{isGracia ? '0.00' : `S/ ${fmt(r.amortizacion)}`}</td>
                  <td className="px-4 py-3">S/ {fmt(r.desgravamen)}</td>
                  <td className="px-4 py-3">S/ {fmt(r.segVehicular)}</td>
                  <td className="px-4 py-3">S/ {fmt(r.cuotaTotal)}</td>
                  <td className="px-4 py-3">S/ {fmt(r.saldoFinal)}</td>
                </tr>
              );
            })}

            <tr className="bg-[#1A237E] text-white font-bold">
              <td className="px-4 py-3" colSpan={2}>{t('schedule.totals')}</td>
              <td className="px-4 py-3">S/ {fmt(totalRow.saldoInicial)}</td>
              <td className="px-4 py-3">S/ {fmt(totalRow.interes)}</td>
              <td className="px-4 py-3">S/ {fmt(totalRow.amortizacion)}</td>
              <td className="px-4 py-3">S/ {fmt(totalRow.desgravamen)}</td>
              <td className="px-4 py-3">S/ {fmt(totalRow.segVehicular)}</td>
              <td className="px-4 py-3" />
              <td className="px-4 py-3 text-xl">S/ {fmt(totalRow.saldoFinal)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 italic mt-4">
        {t('schedule.referentialDisclaimer')}
      </p>
    </PageContainer>
  );
};

export default SchedulePage;
