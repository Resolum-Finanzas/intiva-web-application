import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { vehicleRepositoryImpl } from '../../../catalog/data/repositories/vehicleRepositoryImpl';
import type { LoanParams } from '../../domain/models/Simulation';

interface SimulatorFormProps {
  params: LoanParams;
  onUpdateParam: <K extends keyof LoanParams>(key: K, value: LoanParams[K]) => void;
  onCalculate: () => void;
  loading?: boolean;
}

const TERM_OPTIONS = [12, 24, 36, 48, 60, 72, 84];
const GRACE_OPTIONS = [0, 3, 6, 12];

const vehicles = vehicleRepositoryImpl.getAll();

const fmtCurrency = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

const SimulatorForm: React.FC<SimulatorFormProps> = ({
  params,
  onUpdateParam,
  onCalculate,
  loading,
}) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState('');

  const handleVehicleChange = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (vehicle) {
      onUpdateParam('vehiclePrice', vehicle.price.amount);
      onUpdateParam('downPayment', Math.round(vehicle.price.amount * 0.2));
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#1A237E] mb-5 flex items-center gap-2">
        <Calculator size={20} />
        Parámetros del Crédito
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Vehículo</label>
          <select
            value={selectedVehicleId}
            onChange={(e) => handleVehicleChange(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
          >
            <option value="">Seleccionar vehículo</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} {v.variant} {v.year} - {v.price.formatted}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Precio del vehículo
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                value={params.vehiclePrice}
                onChange={(e) => onUpdateParam('vehiclePrice', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Cuota inicial</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                value={params.downPayment}
                onChange={(e) => onUpdateParam('downPayment', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Plazo (meses)</label>
            <select
              value={params.termMonths}
              onChange={(e) => onUpdateParam('termMonths', Number(e.target.value))}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
            >
              {TERM_OPTIONS.map((m) => (
                <option key={m} value={m}>{m} meses</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">TEA (%)</label>
            <input
              type="number"
              step="0.01"
              value={Number((params.tea * 100).toFixed(2))}
              onChange={(e) => onUpdateParam('tea', Number(e.target.value) / 100)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Periodo de gracia
            </label>
            <select
              value={params.gracePeriodMonths ?? 0}
              onChange={(e) => onUpdateParam('gracePeriodMonths', Number(e.target.value))}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
            >
              {GRACE_OPTIONS.map((m) => (
                <option key={m} value={m}>{m === 0 ? 'Sin gracia' : `${m} meses`}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              % Cuota balón
            </label>
            <select
              value={Math.round((params.balloonPercent ?? 0) * 100)}
              onChange={(e) => onUpdateParam('balloonPercent', Number(e.target.value) / 100)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
            >
              {[0, 10, 20, 30, 40, 50].map((p) => (
                <option key={p} value={p}>{p === 0 ? 'Sin balón' : `${p}%`}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-xs text-gray-400 bg-gray-50 rounded-xl p-3 space-y-1">
          <p className="flex justify-between">
            <span>Total a financiar:</span>
            <span className="font-semibold text-gray-700">
              {fmtCurrency(params.vehiclePrice - params.downPayment)}
            </span>
          </p>
          <p className="flex justify-between">
            <span>% Cuota inicial:</span>
            <span className="font-semibold text-gray-700">
              {params.vehiclePrice > 0
                ? `${((params.downPayment / params.vehiclePrice) * 100).toFixed(1)}%`
                : '0%'}
            </span>
          </p>
        </div>

        <button
          onClick={onCalculate}
          disabled={loading || params.vehiclePrice <= params.downPayment}
          className="w-full bg-[#1A237E] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#283593] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Calculator size={18} />
          {loading ? 'Calculando...' : 'Simular Crédito'}
        </button>

        {params.vehiclePrice <= params.downPayment && (
          <p className="text-xs text-red-500 text-center">
            La cuota inicial no puede ser mayor o igual al precio del vehículo
          </p>
        )}
      </div>
    </div>
  );
};

export default SimulatorForm;
