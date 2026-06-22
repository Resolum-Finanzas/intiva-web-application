import type { LoanParams, Installment, SimulationMetrics, SimulationResult } from '../models/Simulation';

function teaToMonthly(tea: number): number {
  return Math.pow(1 + tea, 1 / 12) - 1;
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function calculateMonthlyPayment(
  principal: number,
  monthlyRate: number,
  n: number
): number {
  if (monthlyRate === 0) return principal / n;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
}

export function simulateCredito(params: LoanParams): SimulationResult {
  const {
    vehiclePrice,
    downPayment,
    termMonths,
    tea,
    desgravamenRate,
    seguroVehicular,
    gracePeriodMonths = 0,
    balloonPercent = 0,
  } = params;

  const monthlyRate = teaToMonthly(tea);
  const principal = vehiclePrice - downPayment;
  const balloonAmount = principal * balloonPercent;
  const amortizablePrincipal = principal - balloonAmount;
  const actualTerm = termMonths - gracePeriodMonths;

  let monthlyPayment: number;
  if (actualTerm <= 0) {
    monthlyPayment = 0;
  } else {
    monthlyPayment = calculateMonthlyPayment(amortizablePrincipal, monthlyRate, actualTerm);
  }

  const schedule: Installment[] = [];
  let balance = principal;
  const startDate = new Date();
  let totalInteres = 0;
  let totalAmortizacion = 0;
  let totalDesgravamen = 0;
  let totalSeguro = 0;
  const cashFlows: number[] = [-principal];

  for (let i = 0; i < termMonths; i++) {
    const isGrace = i < gracePeriodMonths;
    const isLastNormal = i === termMonths - 1 && balloonAmount > 0;
    const num = i + 1;
    const fecha = formatDate(addMonths(startDate, i + 1));
    const saldoInicial = balance;

    const interes = balance * monthlyRate;
    const desgravamen = balance * desgravamenRate;
    const seguro = seguroVehicular;

    let amortizacion: number;
    let cuotaTotal: number;
    let saldoFinal: number;

    if (isGrace) {
      amortizacion = 0;
      cuotaTotal = interes + desgravamen + seguro;
      saldoFinal = balance;
    } else if (isLastNormal) {
      amortizacion = balance;
      cuotaTotal = amortizacion + interes + desgravamen + seguro;
      saldoFinal = 0;
    } else {
      amortizacion = monthlyPayment - interes;
      cuotaTotal = monthlyPayment + desgravamen + seguro;
      saldoFinal = balance - amortizacion;
    }

    totalInteres += interes;
    totalAmortizacion += amortizacion;
    totalDesgravamen += desgravamen;
    totalSeguro += seguro;

    if (!isGrace) {
      cashFlows.push(cuotaTotal);
    }

    schedule.push({
      num,
      fecha,
      saldoInicial: Math.round(saldoInicial * 100) / 100,
      interes: Math.round(interes * 100) / 100,
      amortizacion: Math.round(amortizacion * 100) / 100,
      desgravamen: Math.round(desgravamen * 100) / 100,
      seguroVehicular: Math.round(seguro * 100) / 100,
      cuotaTotal: Math.round(cuotaTotal * 100) / 100,
      saldoFinal: Math.round(saldoFinal * 100) / 100,
      isGrace,
      isBalloon: isLastNormal,
    });

    balance = saldoFinal;
  }

  const totalCuotas = totalAmortizacion + totalInteres + totalDesgravamen + totalSeguro;

  const tcea = totalCuotas > 0 && principal > 0
    ? Math.pow(1 + ((totalCuotas - principal) / principal), 12 / termMonths) - 1
    : 0;

  const interesGracia = schedule
    .filter((r) => r.isGrace)
    .reduce((sum, r) => sum + r.interes, 0);

  const metrics: SimulationMetrics = {
    tea,
    tcea: Math.round(tcea * 10000) / 10000,
    interesGracia: Math.round(interesGracia * 100) / 100,
    van: Math.round(calculateNPV(monthlyRate, cashFlows) * 100) / 100,
    tir: Math.round(calculateIRR(cashFlows) * 10000) / 10000,
    totalInteres: Math.round(totalInteres * 100) / 100,
    totalAmortizacion: Math.round(totalAmortizacion * 100) / 100,
    totalDesgravamen: Math.round(totalDesgravamen * 100) / 100,
    totalSeguro: Math.round(totalSeguro * 100) / 100,
    cuotaMensual: Math.round((monthlyPayment + desgravamenRate * principal + seguroVehicular) * 100) / 100,
    totalFinanciado: Math.round(principal * 100) / 100,
  };

  return { loanParams: params, metrics, schedule };
}

function calculateNPV(rate: number, cashFlows: number[]): number {
  let npv = cashFlows[0];
  for (let i = 1; i < cashFlows.length; i++) {
    npv += cashFlows[i] / Math.pow(1 + rate, i);
  }
  return npv;
}

function calculateIRR(cashFlows: number[]): number {
  const maxIterations = 1000;
  const tolerance = 0.00001;
  let guess = 0.1;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dnpv = 0;
    for (let j = 0; j < cashFlows.length; j++) {
      npv += cashFlows[j] / Math.pow(1 + guess, j);
      dnpv -= j * cashFlows[j] / Math.pow(1 + guess, j + 1);
    }

    if (Math.abs(npv) < tolerance) return guess;
    if (dnpv === 0) return 0;
    guess = guess - npv / dnpv;
  }
  return 0;
}
