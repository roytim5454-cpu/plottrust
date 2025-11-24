// Unit conversion utilities for land area measurements
// Based on Gujarat standards

// Conversion constants
const VIGHA_TO_SQFT = 3025; // 1 Vigha = 3025 sqft (Gujarat standard)
const GUNTHA_TO_SQFT = 1089; // 1 Guntha = 1089 sqft

// Helper to round to 2 decimal places
const round = (value: number): number => Math.round(value * 100) / 100;

// Vigha conversions
export const vighaToSqft = (vigha: number): number => round(vigha * VIGHA_TO_SQFT);
export const vighaToGuntha = (vigha: number): number => round((vigha * VIGHA_TO_SQFT) / GUNTHA_TO_SQFT);

// Guntha conversions
export const gunthaToSqft = (guntha: number): number => round(guntha * GUNTHA_TO_SQFT);
export const gunthaToVigha = (guntha: number): number => round((guntha * GUNTHA_TO_SQFT) / VIGHA_TO_SQFT);

// Sqft conversions
export const sqftToVigha = (sqft: number): number => round(sqft / VIGHA_TO_SQFT);
export const sqftToGuntha = (sqft: number): number => round(sqft / GUNTHA_TO_SQFT);
