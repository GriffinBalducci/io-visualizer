import { FluidEntry } from "./Tanks"

function filterByTimeframe(entries: FluidEntry[], timeframe: string): FluidEntry[] {
    if (timeframe === 'all') return entries;

    const now = Date.now();

    // Map each string (timescale) to a Date object
    const floorMap: Record<string, Date> = {
      '10m': new Date(now - 10 * 60 * 1000),
      '1h': new Date(now - 60 * 60 * 1000),
      '4h': new Date(now - 4 * 60 * 60 * 1000),
      '12h': new Date(now - 12 * 60 * 60 * 1000),
      '24h': new Date(now - 24 * 60 * 60 * 1000),
      'all': new Date(0), // Unix epoch, all entries
    };

    // from the floor to now is the timeframe: (now - floor)
    const floor = now - floorMap[timeframe].getTime();

    // For each entry e, only keep it if the timestamp is greater than or equal to floor
    return entries.filter((e) => e.timestamp.getTime() >= floor);
  }
  