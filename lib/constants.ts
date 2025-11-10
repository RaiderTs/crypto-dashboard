import { ChartDataPoint, TimeRange } from './types';

const BASE_PRICES = {
  Bitcoin: 70000,
  Solana: 170,
};

// Generates volatile price data for a given time range
function generatePriceData(
  basePrice: number,
  points: number,
  volatility: number
): number[] {
  const prices: number[] = [];
  let currentPrice = basePrice;

  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * 2 * volatility * currentPrice;
    currentPrice += change;
    // Ensure price doesn't go below zero
    currentPrice = Math.max(currentPrice, basePrice * 0.1); 
    prices.push(parseFloat(currentPrice.toFixed(2)));
  }
  return prices;
}

// Generates timestamps for a given range
function generateTimestamps(
  range: TimeRange,
  points: number,
  endDate: Date
): number[] {
  const timestamps: number[] = [];
  const endTime = endDate.getTime();
  let startTime: number;
  
  switch (range) {
    case '10m':
      startTime = endTime - 10 * 60 * 1000;
      break;
    case '30m':
      startTime = endTime - 30 * 60 * 1000;
      break;
    case '1h':
      startTime = endTime - 60 * 60 * 1000;
      break;
    case '1D':
      startTime = endTime - 24 * 60 * 60 * 1000;
      break;
    case '1M':
      startTime = new Date(endDate).setMonth(endDate.getMonth() - 1);
      break;
    default:
      startTime = endTime;
  }

  const interval = (endTime - startTime) / (points - 1);
  for (let i = 0; i < points; i++) {
    timestamps.push(startTime + i * interval);
  }
  return timestamps;
}


export const generateMockData = (
  currency: 'Bitcoin' | 'Solana',
  timeRange: TimeRange
): ChartDataPoint[] => {
  const basePrice = BASE_PRICES[currency];
  let points: number;
  let volatility: number; // as a percentage

  switch (timeRange) {
    case '10m':
      points = 60;
      volatility = 0.0001; // 0.01%
      break;
    case '30m':
      points = 90;
      volatility = 0.0003; // 0.03%
      break;
    case '1h':
      points = 60;
      volatility = 0.0005; // 0.05%
      break;
    case '1D':
      points = 48;
      volatility = 0.005; // 0.5%
      break;
    case '1M':
      points = 30;
      volatility = 0.02; // 2%
      break;
    default:
      points = 30;
      volatility = 0.02;
  }

  const prices = generatePriceData(basePrice, points, volatility);
  const timestamps = generateTimestamps(timeRange, points, new Date());
  
  return timestamps.map((ts, index) => [ts, prices[index]]);
};
