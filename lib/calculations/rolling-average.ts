/**
 * Calculate a rolling average for a series of values
 * @param values Array of numeric values
 * @param window Number of values to include in the average
 * @returns The rolling average
 */
export function calculateRollingAverage(
  values: number[],
  window: number
): number {
  if (values.length === 0) return 0
  
  // If we have fewer values than the window size, use all values
  const valuesToUse = values.slice(-window)
  const sum = valuesToUse.reduce((acc, val) => acc + val, 0)
  
  return Math.round(sum / valuesToUse.length * 10) / 10 // Round to 1 decimal
}

/**
 * Calculate rolling averages for each point in a series
 * @param values Array of numeric values
 * @param window Number of values to include in each average
 * @returns Array of rolling averages
 */
export function calculateRollingAverages(
  values: number[],
  window: number
): number[] {
  const averages: number[] = []
  
  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - window + 1)
    const windowValues = values.slice(start, i + 1)
    const avg = windowValues.reduce((sum, val) => sum + val, 0) / windowValues.length
    averages.push(Math.round(avg * 10) / 10)
  }
  
  return averages
}

/**
 * Calculate the trend direction from a series of values
 * @param values Array of numeric values
 * @returns 'up' | 'down' | 'stable'
 */
export function calculateTrend(values: number[]): 'up' | 'down' | 'stable' {
  if (values.length < 2) return 'stable'
  
  // Compare the average of the last 3 values to the previous 3
  const recentCount = Math.min(3, Math.floor(values.length / 2))
  const recent = values.slice(-recentCount)
  const previous = values.slice(-recentCount * 2, -recentCount)
  
  if (previous.length === 0) return 'stable'
  
  const recentAvg = recent.reduce((sum, val) => sum + val, 0) / recent.length
  const previousAvg = previous.reduce((sum, val) => sum + val, 0) / previous.length
  
  const difference = recentAvg - previousAvg
  const threshold = 5 // 5% change threshold
  
  if (difference > threshold) return 'up'
  if (difference < -threshold) return 'down'
  return 'stable'
}

/**
 * Calculate standard deviation for variability analysis
 * @param values Array of numeric values
 * @returns Standard deviation
 */
export function calculateStandardDeviation(values: number[]): number {
  if (values.length === 0) return 0
  
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length
  const squaredDifferences = values.map(val => Math.pow(val - mean, 2))
  const variance = squaredDifferences.reduce((sum, val) => sum + val, 0) / values.length
  
  return Math.round(Math.sqrt(variance) * 10) / 10
}

/**
 * Find patterns in drainage scores
 * @param scores Array of drainage scores
 * @returns Pattern analysis
 */
export function analyzeDrainagePatterns(scores: number[]): {
  averageScore: number
  trend: 'up' | 'down' | 'stable'
  variability: 'low' | 'moderate' | 'high'
  consistency: number // Percentage of days meeting 80% threshold
  streaks: {
    current: number
    longest: number
  }
} {
  if (scores.length === 0) {
    return {
      averageScore: 0,
      trend: 'stable',
      variability: 'low',
      consistency: 0,
      streaks: { current: 0, longest: 0 }
    }
  }

  const averageScore = calculateRollingAverage(scores, scores.length)
  const trend = calculateTrend(scores)
  const stdDev = calculateStandardDeviation(scores)
  
  // Determine variability based on standard deviation
  let variability: 'low' | 'moderate' | 'high'
  if (stdDev < 5) variability = 'low'
  else if (stdDev < 10) variability = 'moderate'
  else variability = 'high'
  
  // Calculate consistency (% of days meeting 80% threshold)
  const daysAbove80 = scores.filter(s => s >= 80).length
  const consistency = Math.round((daysAbove80 / scores.length) * 100)
  
  // Calculate streaks
  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0
  
  for (const score of scores) {
    if (score >= 80) {
      tempStreak++
      longestStreak = Math.max(longestStreak, tempStreak)
    } else {
      tempStreak = 0
    }
  }
  
  // Current streak from the end
  for (let i = scores.length - 1; i >= 0; i--) {
    if (scores[i] >= 80) {
      currentStreak++
    } else {
      break
    }
  }
  
  return {
    averageScore,
    trend,
    variability,
    consistency,
    streaks: {
      current: currentStreak,
      longest: longestStreak
    }
  }
}