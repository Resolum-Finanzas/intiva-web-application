import { useState } from 'react';
import PageContainer from '../../../shared/presentation/components/pagecontainer/PageContainer.component';
import { useSimulator } from './hooks/useSimulator';
import SimulatorForm from './components/SimulatorForm';
import SimulatorResults from './components/SimulatorResults';

const SimuladorCreditoScreen: React.FC = () => {
  const { params, result, saved, setSaved, updateParam, calculate, reset } = useSimulator();
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    calculate();
    setLoading(false);
  };

  const handleSave = async () => {
    const { simulationRepositoryImpl } = await import(
      '../data/repositories/simulationRepositoryImpl'
    );
    if (result) {
      await simulationRepositoryImpl.save(result);
      setSaved(true);
    }
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Simulador de Crédito</h1>
          <p className="text-sm text-gray-500 mt-1">
            Calcula tu plan de financiamiento vehicular
          </p>
        </div>
        {result && (
          <button
            onClick={reset}
            className="border border-gray-300 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
          >
            Nueva Simulación
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
        <SimulatorForm
          params={params}
          onUpdateParam={updateParam}
          onCalculate={handleCalculate}
          loading={loading}
        />

        {result && (
          <SimulatorResults
            result={result}
            onSave={saved ? undefined : handleSave}
          />
        )}

        {!result && (
          <div className="bg-[var(--color-bg-surface)] rounded-2xl border border-gray-200 p-12 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Completa los parámetros
            </h3>
            <p className="text-sm text-gray-400 max-w-md">
              Selecciona un vehículo, ingresa el monto a financiar y el plazo deseado,
              luego haz clic en "Simular Crédito" para ver los resultados.
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default SimuladorCreditoScreen;
