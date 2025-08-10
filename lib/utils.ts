import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes with proper precedence
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date to a human-readable string
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }
): string {
  return new Date(date).toLocaleDateString('en-US', options)
}

/**
 * Format a number as currency
 * @param amount - Amount in cents
 * @param currency - Currency code
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount / 100)
}

/**
 * Truncate text to a specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * Generate a slug from a string
 * @param text - Text to slugify
 * @returns URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Calculate reading time for content
 * @param text - Content text
 * @param wordsPerMinute - Reading speed (default: 200)
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute = 200): number {
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Check if a module is locked based on prerequisites
 * @param completedModules - Array of completed module IDs
 * @param prerequisites - Array of prerequisite module IDs
 * @returns Whether the module is locked
 */
export function isModuleLocked(
  completedModules: string[],
  prerequisites: string[]
): boolean {
  return prerequisites.some((prereq) => !completedModules.includes(prereq))
}

/**
 * Calculate progress percentage
 * @param completed - Number of completed items
 * @param total - Total number of items
 * @returns Progress percentage (0-100)
 */
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

/**
 * Get evidence level color class
 * @param level - Evidence level (Solid, Emerging, Controversial)
 * @returns Tailwind color class
 */
export function getEvidenceLevelColor(level: string): string {
  const colors = {
    Solid: 'text-green-700 bg-green-100',
    Emerging: 'text-yellow-700 bg-yellow-100',
    Controversial: 'text-red-700 bg-red-100',
  }
  return colors[level as keyof typeof colors] || 'text-gray-700 bg-gray-100'
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns Whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Debounce function execution
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
