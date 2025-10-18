import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'EGP') {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number, decimals = 0) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

export function formatPercentage(num: number, decimals = 2) {
  return `${(num * 100).toFixed(decimals)}%`
}

export function calculateECL(pd: number, lgd: number, ead: number): number {
  return (pd / 100) * (lgd / 100) * ead
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'pending_raw_data_review': 'bg-yellow-100 text-yellow-800',
    'pending_mapping': 'bg-blue-100 text-blue-800',
    'pending_segmentation_review': 'bg-purple-100 text-purple-800',
    'pending_parameter_review': 'bg-orange-100 text-orange-800',
    'pending_scenario_review': 'bg-indigo-100 text-indigo-800',
    'pending_final_approval': 'bg-pink-100 text-pink-800',
    'complete': 'bg-green-100 text-green-800',
    'error': 'bg-red-100 text-red-800',
  }
  
  return statusColors[status] || 'bg-gray-100 text-gray-800'
}

export function getStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    'pending_raw_data_review': 'Pending Data',
    'pending_mapping': 'Pending Mapping',
    'pending_segmentation_review': 'Pending Segmentation',
    'pending_parameter_review': 'Pending Parameters',
    'pending_scenario_review': 'Pending Scenarios',
    'pending_final_approval': 'Pending Approval',
    'complete': 'Complete',
    'error': 'Error',
  }
  
  return statusLabels[status] || status
}