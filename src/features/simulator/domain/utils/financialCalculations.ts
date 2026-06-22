import { RISK_LEVEL_TUA as TUA_MAP } from '../models/riskLevel';
import type { SimulationInput } from '../models/simulationInput';
import type { PaymentRow } from '../models/paymentRow';

function teaToMonthly(tea: number): number {
  return Math.pow(1 + tea, 30 / 360) - 1;
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

const DESGRAVAMEN_RATE = 0.00077;

function vehicleInsuranceFactor(tua: number): number {
  return tua * (30 / 360);
}

function getTuaValue(riskLevel: string): number {
  return TUA_MAP[riskLevel as keyof typeof TUA_MAP] ?? 0.0486;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function getSuggestedTeaRange(amount: number): { min: number; max: number } {
  if (amount >= 3750 && amount <= 8250) return { min: 0.1165, max: 0.1715 };
  if (amount >= 8251 && amount <= 11000) return { min: 0.1065, max: 0.1715 };
  if (amount >= 11001 && amount <= 14000) return { min: 0.0965, max: 0.1615 };
  if (amount >= 14001 && amount <= 18750) return { min: 0.0865, max: 0.1515 };
  if (amount >= 18751 && amount <= 30000) return { min: 0.0865, max: 0.1315 };
  if (amount > 30000) return { min: 0.0800, max: 0.1315 };
  return { min: 0.0865, max: 0.1715 };
}

export function estimateMonthlyPayment(
  financedAmount: number,
  tea: number,
  termMonths: number,
): number {
  const tem = teaToMonthly(tea);
  if (tem === 0) return financedAmount / termMonths;
  return (
    financedAmount *
    (tem / (1 - Math.pow(1 + tem, -termMonths)))
  );
}

export function calculateSchedule(input: SimulationInput): PaymentRow[] {
  const {
    vehiclePrice,
    financedAmount,
    tea,
    termMonths,
    balloonPct,
    includeVehicleInsurance,
    riskLevel,
    hasGracePeriod,
    gracePeriodType,
    gracePeriodMonths,
    startDate,
  } = input;

  const tem = teaToMonthly(tea);
  const balloonAmount = vehiclePrice * balloonPct;
  const effectiveTerm = hasGracePeriod ? termMonths - gracePeriodMonths : termMonths;
  const start = new Date(startDate);

  let adjustedPrincipal = financedAmount;

  if (hasGracePeriod && gracePeriodType === 'Total' && gracePeriodMonths > 0) {
    adjustedPrincipal = financedAmount * Math.pow(1 + tem, gracePeriodMonths);
  }

  const pvBalloon = balloonAmount > 0
    ? balloonAmount / Math.pow(1 + tem, effectiveTerm)
    : 0;

  const amountToAmortize = adjustedPrincipal - pvBalloon;

  const frenchPayment = amountToAmortize > 0 && tem > 0
    ? amountToAmortize * (tem / (1 - Math.pow(1 + tem, -effectiveTerm)))
    : 0;

  const tua = includeVehicleInsurance ? getTuaValue(riskLevel) : 0;
  const segVehFactor = vehicleInsuranceFactor(tua);

  const rows: PaymentRow[] = [];

  if (hasGracePeriod && gracePeriodMonths > 0) {
    let graceBalance = financedAmount;

    for (let g = 0; g < gracePeriodMonths; g++) {
      const fecha = formatDate(addMonths(start, g + 1));
      const initialBalance = graceBalance;

      if (gracePeriodType === 'Total') {
        const interest = graceBalance * tem;
        graceBalance = graceBalance * (1 + tem);
        rows.push({
          period: g + 1,
          date: fecha,
          initialBalance: round2(initialBalance),
          interest: round2(interest),
          amortization: 0,
          lifeInsurance: 0,
          vehicleInsurance: 0,
          totalPayment: 0,
          finalBalance: round2(graceBalance),
          isBalloon: false,
          isGrace: true,
          graceType: 'Total',
        });
      } else {
        const interest = graceBalance * tem;
        const desgravamen = graceBalance * DESGRAVAMEN_RATE;
        const segVeh = includeVehicleInsurance
          ? vehiclePrice * segVehFactor
          : 0;
        const cuota = interest + desgravamen + segVeh;

        rows.push({
          period: g + 1,
          date: fecha,
          initialBalance: round2(initialBalance),
          interest: round2(interest),
          amortization: 0,
          lifeInsurance: round2(desgravamen),
          vehicleInsurance: round2(segVeh),
          totalPayment: round2(cuota),
          finalBalance: round2(graceBalance),
          isBalloon: false,
          isGrace: true,
          graceType: 'Parcial',
        });
      }
    }
  }

  let balance = adjustedPrincipal;
  const existingRows = rows.length;

  for (let i = 0; i < effectiveTerm; i++) {
    const isLast = i === effectiveTerm - 1 && balloonAmount > 0;
    const fecha = formatDate(addMonths(start, gracePeriodMonths + i + 1));

    const currentBalance = balance;
    const interest = currentBalance * tem;
    const desgravamen = currentBalance * DESGRAVAMEN_RATE;
    const segVeh = includeVehicleInsurance ? vehiclePrice * segVehFactor : 0;

    let amortization: number;
    let totalPayment: number;
    let finalBalance: number;

    if (isLast) {
      amortization = balloonAmount;
      totalPayment = amortization + interest + desgravamen + segVeh;
      finalBalance = currentBalance - amortization;
    } else {
      amortization = frenchPayment - interest;
      totalPayment = frenchPayment + desgravamen + segVeh;
      finalBalance = currentBalance - amortization;
    }

    rows.push({
      period: existingRows + i + 1,
      date: fecha,
      initialBalance: round2(currentBalance),
      interest: round2(interest),
      amortization: round2(amortization),
      lifeInsurance: round2(desgravamen),
      vehicleInsurance: round2(segVeh),
      totalPayment: round2(totalPayment),
      finalBalance: round2(finalBalance),
      isBalloon: isLast,
      isGrace: false,
      graceType: null,
    });

    balance = finalBalance;
  }

  return rows;
}

export function calculateNpv(rate: number, cashFlows: number[]): number {
  let npv = cashFlows[0] ?? 0;
  for (let i = 1; i < cashFlows.length; i++) {
    npv += (cashFlows[i] ?? 0) / Math.pow(1 + rate, i);
  }
  return npv;
}

export function calculateIrr(cashFlows: number[]): number {
  const maxIterations = 1000;
  const tolerance = 1e-8;
  let guess = 0.1;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dnpv = 0;
    for (let j = 0; j < cashFlows.length; j++) {
      const cf = cashFlows[j] ?? 0;
      npv += cf / Math.pow(1 + guess, j);
      dnpv -= (j * cf) / Math.pow(1 + guess, j + 1);
    }
    if (Math.abs(npv) < tolerance) return guess;
    if (dnpv === 0) return 0;
    guess = guess - npv / dnpv;
  }
  return 0;
}

export function calculateTcea(
  financedAmount: number,
  payments: number[],
): number {
  const maxIterations = 1000;
  const tolerance = 1e-8;
  let guess = 0.1;

  for (let i = 0; i < maxIterations; i++) {
    let npv = -financedAmount;
    let dnpv = 0;
    for (let j = 0; j < payments.length; j++) {
      const cf = payments[j] ?? 0;
      npv += cf / Math.pow(1 + guess, j + 1);
      dnpv -= ((j + 1) * cf) / Math.pow(1 + guess, j + 2);
    }
    if (Math.abs(npv) < tolerance) return guess;
    if (dnpv === 0) return 0;
    guess = guess - npv / dnpv;
  }
  return 0;
}
