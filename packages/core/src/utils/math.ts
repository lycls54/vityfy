/**
 * Clamps a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Rounds number to specified decimal places
 */
export function round(value: number, decimals = 0): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Checks if number is between min and max (inclusive)
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Generates random number between min and max
 */
export function random(min = 0, max = 1): number {
  return Math.random() * (max - min) + min
}

/**
 * Generates random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Calculates percentage of value relative to total
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0
  return (value / total) * 100
}

/**
 * Calculates average of numbers
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return sum(numbers) / numbers.length
}

/**
 * Calculates sum of numbers
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0)
}

/**
 * Finds minimum value in array
 */
export function min(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return Math.min(...numbers)
}

/**
 * Finds maximum value in array
 */
export function max(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return Math.max(...numbers)
}

/**
 * Calculates median of numbers
 */
export function median(numbers: number[]): number {
  if (numbers.length === 0) return 0
  
  const sorted = [...numbers].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  
  if (sorted.length % 2 === 0) {
    const left = sorted[middle - 1]
    const right = sorted[middle]
    if (left !== undefined && right !== undefined) {
      return (left + right) / 2
    }
    return 0
  } else {
    const middleValue = sorted[middle]
    return middleValue !== undefined ? middleValue : 0
  }
}

/**
 * Calculates standard deviation
 */
export function standardDeviation(numbers: number[]): number {
  if (numbers.length === 0) return 0
  
  const avg = average(numbers)
  const squaredDiffs = numbers.map(num => Math.pow(num - avg, 2))
  const avgSquaredDiff = average(squaredDiffs)
  
  return Math.sqrt(avgSquaredDiff)
}

/**
 * Converts degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Converts radians to degrees
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI)
}

/**
 * Calculates distance between two points
 */
export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

/**
 * Maps value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * Checks if number is even
 */
export function isEven(value: number): boolean {
  return value % 2 === 0
}

/**
 * Checks if number is odd
 */
export function isOdd(value: number): boolean {
  return value % 2 !== 0
}

/**
 * Factorial calculation
 */
export function factorial(n: number): number {
  if (n < 0) return 0
  if (n === 0 || n === 1) return 1
  
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}

/**
 * Greatest common divisor
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  
  return a
}

/**
 * Least common multiple
 */
export function lcm(a: number, b: number): number {
  const gcdValue = gcd(a, b)
  return gcdValue === 0 ? 0 : Math.abs(a * b) / gcdValue
}

/**
 * Checks if number is prime
 */
export function isPrime(n: number): boolean {
  if (n <= 1) return false
  if (n <= 3) return true
  if (n % 2 === 0 || n % 3 === 0) return false
  
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false
    }
  }
  
  return true
}

/**
 * Fibonacci sequence up to n
 */
export function fibonacci(n: number): number[] {
  if (n <= 0) return []
  if (n === 1) return [0]
  if (n === 2) return [0, 1]
  
  const sequence = [0, 1]
  for (let i = 2; i < n; i++) {
    const prev1 = sequence[i - 1]
    const prev2 = sequence[i - 2]
    if (prev1 !== undefined && prev2 !== undefined) {
      sequence.push(prev1 + prev2)
    }
  }
  
  return sequence
}

/**
 * Calculates compound interest
 */
export function compoundInterest(
  principal: number,
  rate: number,
  time: number,
  compoundFrequency = 1
): number {
  return principal * Math.pow(1 + rate / compoundFrequency, compoundFrequency * time)
}

/**
 * Converts number to binary string
 */
export function toBinary(value: number): string {
  return value.toString(2)
}

/**
 * Converts number to hexadecimal string
 */
export function toHex(value: number): string {
  return value.toString(16).toUpperCase()
}

/**
 * Converts binary string to number
 */
export function fromBinary(binary: string): number {
  return parseInt(binary, 2)
}

/**
 * Converts hexadecimal string to number
 */
export function fromHex(hex: string): number {
  return parseInt(hex, 16)
}