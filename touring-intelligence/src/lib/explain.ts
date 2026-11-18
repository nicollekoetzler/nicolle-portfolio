import { markets } from "./data/artist";
import { genreMatches } from "./match";
import type { DrawBand, MatchBreakdown, Venue } from "./types";

const MID: Record<DrawBand, number> = { "50–150": 100, "150–250": 200, "250–400": 320, "400+": 480 };

export function factorExplanations(v: Venue, draw: DrawBand): Record<keyof MatchBreakdown, string> {
  const inCluster = v.events.filter((e) =>
    genreMatches({ ...v, genres: [e.genre] }, ["Atmospheric Black Metal"]),
  ).length;
  const market = markets.find((m) => m.city === v.city);
  const fill = Math.round((MID[draw] / v.capacity) * 100);
  return {
    genre: `${inCluster} of the last ${v.events.length} shows sit in atmospheric, black or post-metal. Core programming: ${v.genres.slice(0, 3).join(", ")}.`,
    audience: market
      ? `About ${market.overlap}% of active metal listeners in ${v.city} overlap with NØCTURNE's sound cluster.`
      : `Overlap estimated from peer-act attendance; listener data for ${v.city} is thin.`,
    capacity: `${v.capacity} capacity against a ${draw} draw means an expected fill near ${Math.min(fill, 140)}%${fill > 110 ? ", likely to sell out" : fill < 60 ? ", which risks a half-empty room" : ""}.`,
    history: `Booked ${v.similarArtists.slice(0, 2).join(" and ")} in the last 12 months, both close to your level and sound.`,
    geography: v.distanceKm === 0 ? "Hometown show in Berlin. No travel cost, strongest local network." : `${v.distanceKm} km from Berlin, roughly ${Math.max(1, Math.round(v.distanceKm / 85))}h by van.`,
  };
}
