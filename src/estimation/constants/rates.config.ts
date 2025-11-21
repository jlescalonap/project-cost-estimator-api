export const HOURLY_RATES = {
  JUNIOR: 30,
  MID: 50,
  SENIOR: 80,
} as const;

export const COMPLEXITY_MULTIPLIERS = {
  LOW: 1.0,
  MEDIUM: 1.5,
  HIGH: 2.0,
  INSANE: 3.0,
} as const;

export const BASE_HOURS_BY_COMPLEXITY = {
  LOW: 4,
  MEDIUM: 12,
  HIGH: 24,
  INSANE: 48,
} as const;

export const SENIORITY_SPEED_FACTOR = {
  JUNIOR: 1.0,
  MID: 0.9,
  SENIOR: 0.75,
} as const;
