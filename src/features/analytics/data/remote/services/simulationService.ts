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
  period_type: 'MONTHLY' | 'QUARTERLY' | 'SEMI_ANNUALLY';
}

function toRequest(params: LoanParams): LoanSimulationRequest {
  const hasGracePeriod = (params.gracePeriodMonths ?? 0) > 0;
  
  let periodType: 'MONTHLY' | 'QUARTERLY' | 'SEMI_ANNUALLY' = 'MONTHLY';
  if (params.paymentFrequency === 'Trimestral') {
    periodType = 'QUARTERLY';
  } else if (params.paymentFrequency === 'Semestral') {
    periodType = 'SEMI_ANNUALLY';
  }

  return {
    user_id: params.userId ?? 0,
    vehicle_id: params.vehicleId ?? 0,
    bank_entity: params.bankEntity ?? '',
    vehicle_cost: params.vehiclePrice,
    vehicle_type: params.vehicleType ?? 'OTHERS',
    down_payment_percentage: params.vehiclePrice > 0
      ? (params.downPayment / params.vehiclePrice)
      : 0,
    balloon_payment_percentage: (params.balloonPercent ?? 0),
    tea: params.tea,
    initial_payment_date: new Date().toISOString().split('T')[0],
    total_number_of_years: Math.round(params.termMonths / 12),
    grace_period_type: hasGracePeriod ? 'TOTAL' : 'NONE',
    grace_period_in_months: hasGracePeriod ? (params.gracePeriodMonths ?? 0) : 0,
    period_type: periodType,
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
  if (!response.ok) {
    let detail = `HTTP ${response.status}`;
    try {
      const errBody = await response.json();
      detail = errBody.message ?? errBody.detail ?? detail;
    } catch {
      // ignore parse errors
    }
    throw new Error(detail);
  }

  const data = await response.json().catch(() => null);

  if (data) {
    return mapResponse(data, params);
  }

  throw new Error('El servidor no devolvió resultados de simulación.');
}

function mapResponse(data: Record<string, unknown>, params: LoanParams): SimulationResult {
  const paymentPeriods: Record<string, unknown>[] = Array.isArray(data.payment_periods)
    ? data.payment_periods
    : Array.isArray(data.payment_schedule && typeof data.payment_schedule === 'object' && (data.payment_schedule as Record<string, unknown>).payment_periods)
      ? (data.payment_schedule as Record<string, unknown>).payment_periods as Record<string, unknown>[]
      : [];

  const fi = data.financial_indicators as Record<string, unknown> | undefined;
  const ps = data.payment_schedule as Record<string, unknown> | undefined;

  const schedule = paymentPeriods.map((row: Record<string, unknown>, i: number) => ({
    num: i + 1,
    fecha: String(row.payment_date ?? row.date ?? ''),
    saldoInicial: Number(row.balance_start ?? row.start ?? 0),
    interes: Number(row.interest ?? 0),
    amortizacion: Number(row.amortization ?? 0),
    desgravamen: Number(row.mortgage ?? 0),
    seguroVehicular: Number(row.vehicular_insurance ?? 0),
    cuotaTotal: Number(row.total_payment ?? 0),
    saldoFinal: Number(row.balance_end ?? row.end ?? 0),
    isGrace: String(row.grace_period_type ?? '') !== 'NONE',
    isBalloon: Number(row.balloon_fee ?? 0) > 0,
  }));

  const totalFinanced = params.vehiclePrice - params.downPayment;

  const totalInterest = ps ? Number(ps.total_interest ?? 0) : schedule.reduce((s, r) => s + r.interes, 0);
  const totalAmortization = ps ? Number(ps.total_amortization ?? 0) : schedule.reduce((s, r) => s + r.amortizacion, 0);
  const totalDesgravamen = ps ? Number(ps.total_mortgage_protection_insurance ?? 0) : schedule.reduce((s, r) => s + r.desgravamen, 0);
  const totalSeguro = ps ? Number(ps.total_vehicular_insurance ?? 0) : schedule.reduce((s, r) => s + r.seguroVehicular, 0);

  const monthlyPayment = schedule.length > 0
    ? schedule.find(r => !r.isGrace)?.cuotaTotal ?? schedule[0].cuotaTotal
    : 0;

  return {
    loanParams: params,
    metrics: {
      tea: params.tea,
      tcea: fi ? Number(fi.tcea_percentage ?? 0) : 0,
      interesGracia: schedule.filter(r => r.isGrace).reduce((s, r) => s + r.interes, 0),
      van: fi ? Number(fi.van ?? 0) : 0,
      tir: fi ? Number(fi.tir ?? 0) : 0,
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
  const response = await fetchWithAuth(`${BASE_URL}${LOAN_PATH}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    let detail = `HTTP ${response.status}`;
    try {
      const errBody = await response.json();
      detail = errBody.message ?? errBody.detail ?? detail;
    } catch {
      // ignore parse errors
    }
    throw new Error(detail);
  }
}

const history: SimulationResult[] = [];

export async function getSimulationHistory(): Promise<SimulationResult[]> {
  return [...history];
}
