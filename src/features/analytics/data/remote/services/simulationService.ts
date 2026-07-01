import type { SimulationResult, LoanParams } from '../../../domain/models/Simulation';
import { fetchWithAuth } from '../../../../../core/network/interceptor/Auth.interceptor';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const LOAN_PATH = import.meta.env.VITE_ANALYTICS_LOAN_SIMULATION ?? '/api/v1/analytics/loan-simulation';

interface LoanSimulationRequest {
  user_id: number;
  vehicle_id: number;
  bank_entity: string;
  vehicle_cost: number;
  vehicle_type: string;
  down_payment_percentage: number;
  balloon_payment_percentage: number;
  tea: number;
  initial_payment_date: string;
  total_number_of_years: number;
  grace_period_type: string;
  grace_period_in_months: number;
  period_type: 'MONTHLY';
}

function toRequest(params: LoanParams): LoanSimulationRequest {
  return {
    user_id: 0,
    vehicle_id: 0,
    bank_entity: '',
    vehicle_cost: params.vehiclePrice,
    vehicle_type: '',
    down_payment_percentage: params.vehiclePrice > 0
      ? (params.downPayment / params.vehiclePrice) * 100
      : 0,
    balloon_payment_percentage: (params.balloonPercent ?? 0) * 100,
    tea: params.tea,
    initial_payment_date: new Date().toISOString().split('T')[0],
    total_number_of_years: params.termMonths / 12,
    grace_period_type: (params.gracePeriodMonths ?? 0) > 0 ? 'Total' : '',
    grace_period_in_months: params.gracePeriodMonths ?? 0,
    period_type: 'MONTHLY',
  };
}

export async function calculateLoan(params: LoanParams): Promise<SimulationResult> {
  const body = toRequest(params);
  const response = await fetchWithAuth(`${BASE_URL}${LOAN_PATH}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (response.status === 401) {
    throw new Error('Sesión expirada. Inicia sesión nuevamente.');
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = await response.json().catch(() => null);

  if (data) {
    return mapResponse(data, params);
  }

  throw new Error('El servidor no devolvió resultados de simulación.');
}

function mapResponse(data: Record<string, unknown>, params: LoanParams): SimulationResult {
  const monthlyPayment = Number(data.schedule?.[0]?.totalPayment ?? data.cuota_mensual ?? data.monthlyPayment ?? 0);
  const schedule = Array.isArray(data.schedule ?? data.cronograma ?? data.installments ?? data.cuotas)
    ? (data.schedule ?? data.cronograma ?? data.installments ?? data.cuotas).map((row: Record<string, unknown>, i: number) => ({
        num: i + 1,
        fecha: String(row.date ?? row.fecha ?? ''),
        saldoInicial: Number(row.initialBalance ?? row.saldoInicial ?? 0),
        interes: Number(row.interest ?? row.interes ?? 0),
        amortizacion: Number(row.amortization ?? row.amortizacion ?? 0),
        desgravamen: Number(row.lifeInsurance ?? row.desgravamen ?? 0),
        seguroVehicular: Number(row.vehicleInsurance ?? row.seguroVehicular ?? 0),
        cuotaTotal: Number(row.totalPayment ?? row.cuotaTotal ?? 0),
        saldoFinal: Number(row.finalBalance ?? row.saldoFinal ?? 0),
        isGrace: Boolean(row.isGrace ?? row.esGracia ?? false),
        isBalloon: Boolean(row.isBalloon ?? row.esBalon ?? false),
      }))
    : [];

  const totalFinanced = params.vehiclePrice - params.downPayment;
  const scheduleTotal = schedule.reduce((s, r) => s + r.cuotaTotal, 0);
  const totalInterest = schedule.reduce((s, r) => s + r.interes, 0);
  const totalAmortization = schedule.reduce((s, r) => s + r.amortizacion, 0);
  const totalDesgravamen = schedule.reduce((s, r) => s + r.desgravamen, 0);
  const totalSeguro = schedule.reduce((s, r) => s + r.seguroVehicular, 0);

  return {
    loanParams: params,
    metrics: {
      tea: params.tea,
      tcea: Number(data.tcea ?? data.tcea ?? 0),
      interesGracia: Number(data.graceInterest ?? data.interesGracia ?? 0),
      van: Number(data.npv ?? data.van ?? 0),
      tir: Number(data.irr ?? data.tir ?? 0),
      totalInteres: totalInterest,
      totalAmortizacion: totalAmortization,
      totalDesgravamen,
      totalSeguro,
      cuotaMensual: monthlyPayment,
      totalFinanciado: totalFinanced,
    },
    schedule,
  };
}

export async function saveSimulation(result: SimulationResult): Promise<void> {
  const body = toRequest(result.loanParams);
  await fetchWithAuth(`${BASE_URL}${LOAN_PATH}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const history: SimulationResult[] = [];

export async function getSimulationHistory(): Promise<SimulationResult[]> {
  return [...history];
}
