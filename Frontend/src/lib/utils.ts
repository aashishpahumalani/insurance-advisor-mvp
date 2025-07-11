import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function getRiskColor(risk: string): string {
  switch (risk.toLowerCase()) {
    case 'low risk':
      return 'text-green-600 bg-green-50';
    case 'medium risk':
      return 'text-yellow-600 bg-yellow-50';
    case 'high risk':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getInsuranceTypeColor(type: string): string {
  switch (type.toLowerCase()) {
    case 'term life insurance':
      return 'text-blue-600 bg-blue-50';
    case 'whole life insurance':
      return 'text-purple-600 bg-purple-50';
    case 'universal life insurance':
      return 'text-indigo-600 bg-indigo-50';
    case 'final expense insurance':
      return 'text-orange-600 bg-orange-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function validateAge(age: number | string): boolean {
  const numAge = Number(age);
  return !isNaN(numAge) && numAge >= 18 && numAge <= 100;
}

export function validateIncome(income: number | string): boolean {
  const numIncome = Number(income);
  return !isNaN(numIncome) && numIncome >= 0 && numIncome <= 10000000;
}

export function validateDependents(dependents: number | string): boolean {
  const numDependents = Number(dependents);
  return !isNaN(numDependents) && numDependents >= 0 && numDependents <= 20;
}
