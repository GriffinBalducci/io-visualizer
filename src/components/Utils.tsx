import { FluidEntry } from "./Tanks"

function filterByTimeframe(entries: FluidEntry[], timeframe: string): FluidEntry[] {
    if (timeframe === 'all') return entries;
  
    const now = Date.now();

    // Map each string (timescale) to a number of milliseconds
    const floorMap: Record<string, number> = {
      '10m': 10 * 60 * 1000,
      '1h': 60 * 60 * 1000,
      '12h': 12 * 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
    };
  
    // from the floor to now is the timeframe: (now - floor)
    const floor = now - (floorMap[timeframe] || 0);

    // For each entry e, only keep it if the timestamp is greater than or equal to floor
    return entries.filter((e) => e.timestamp >= floor);
  }
  