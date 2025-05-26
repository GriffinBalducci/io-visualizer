import { FluidEntry } from "./Tanks"

export default function filterByTimeframe(entries: FluidEntry[], timeframe: string): FluidEntry[] {
    if (timeframe === 'all') return entries;

    const now = Date.now();
    const timeframeMinutes = parseInt(timeframe);
    
    if (isNaN(timeframeMinutes)) return entries;

    // Calculate the cutoff time based on minutes
    const cutoffTime = now - (timeframeMinutes * 60 * 1000);

    // Filter entries that are within the timeframe
    return entries.filter((entry) => entry.timestamp.getTime() >= cutoffTime);
}
