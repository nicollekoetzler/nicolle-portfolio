import { DEFAULT_FILTERS, DRAW_BANDS } from "./match";
import { venues } from "./data/venues";
import type { CountryCode, DrawBand, Filters, Genre, VenueType, Availability } from "./types";

export const EXAMPLE_PROMPT =
  "Find atmospheric black metal venues in Germany, Poland, and Czech Republic suitable for bands drawing 150–250 people.";

export const SUGGESTED_PROMPTS = [
  EXAMPLE_PROMPT,
  "Post-metal rooms in Prague and Vienna with open dates in October",
  "Small DIY spaces for doom and sludge under 200 capacity",
  "Venues that booked bands like Ashen Vigil in the last year",
];

const COUNTRY_WORDS: [RegExp, CountryCode][] = [
  [/german|deutschland/, "DE"],
  [/poland|polish|polska/, "PL"],
  [/czech|czechia/, "CZ"],
  [/austria/, "AT"],
  [/netherlands|dutch|holland/, "NL"],
  [/hungary|hungarian/, "HU"],
];

const GENRE_WORDS: [RegExp, Genre][] = [
  [/atmospheric( black)?/, "Atmospheric Black Metal"],
  [/(?<!atmospheric )black metal|\bbm\b/, "Black Metal"],
  [/death/, "Death Metal"],
  [/doom/, "Doom Metal"],
  [/post[- ]?metal|post[- ]?rock/, "Post-Metal"],
  [/sludge/, "Sludge Metal"],
  [/prog/, "Progressive Metal"],
  [/folk|pagan/, "Folk Metal"],
];

const TYPE_WORDS: [RegExp, VenueType][] = [
  [/\bclubs?\b/, "Club"],
  [/\bbars?\b/, "Bar"],
  [/diy|collective|squat/, "DIY Space"],
  [/\bhalls?\b/, "Concert Hall"],
  [/cultural|arts centre|arts center/, "Cultural Centre"],
];

export interface Interpretation {
  label: string;
  value: string;
}

export interface ParsedQuery {
  filters: Filters;
  interpretation: Interpretation[];
  peerArtist?: string;
}

function nearestDraw(lo: number, hi: number): DrawBand {
  const mid = (lo + hi) / 2;
  if (mid < 150) return "50–150";
  if (mid < 260) return "150–250";
  if (mid < 420) return "250–400";
  return "400+";
}

/** A deterministic, local stand-in for an LLM intent parser. */
export function parseQuery(raw: string): ParsedQuery {
  const q = raw.toLowerCase();
  const f: Filters = structuredClone(DEFAULT_FILTERS);
  const out: Interpretation[] = [];

  const countries = COUNTRY_WORDS.filter(([re]) => re.test(q)).map(([, c]) => c);
  const cities = Array.from(new Set(venues.map((v) => v.city))).filter((c) => q.includes(c.toLowerCase()));
  if (cities.length) {
    f.cities = cities;
    out.push({ label: "Cities", value: cities.join(", ") });
  }
  if (countries.length) {
    f.countries = countries;
    out.push({ label: "Countries", value: countries.join(" · ") });
  }

  let genres = GENRE_WORDS.filter(([re]) => re.test(q)).map(([, g]) => g);
  if (genres.includes("Atmospheric Black Metal")) genres = genres.filter((g) => g !== "Black Metal");
  if (genres.length) {
    f.genres = genres;
    out.push({ label: "Genre", value: genres.join(", ") });
  }

  const types = TYPE_WORDS.filter(([re]) => re.test(q)).map(([, t]) => t);
  if (types.length) {
    f.types = types;
    out.push({ label: "Venue type", value: types.join(", ") });
  }

  const range = q.match(/(\d{2,3})\s*(?:–|-|to)\s*(\d{2,3})/);
  if (range && /draw|people|fans|crowd|bands drawing/.test(q)) {
    const band = nearestDraw(+range[1], +range[2]);
    f.draw = band;
    out.push({ label: "Draw", value: `${band} people` });
  }
  const under = q.match(/(?:under|below|less than|up to)\s*(\d{2,3})/);
  if (under) {
    f.capacity = [DEFAULT_FILTERS.capacity[0], Math.max(+under[1], 120)];
    out.push({ label: "Capacity", value: `≤ ${under[1]}` });
  }

  const avail: Availability[] = [];
  if (/open dates|available|availability|free dates/.test(q)) avail.push("Open dates", "Limited dates");
  if (avail.length) {
    f.availability = avail;
    out.push({ label: "Availability", value: "Has open dates" });
  }

  const peer = venues.flatMap((v) => v.similarArtists).find((a) => q.includes(a.toLowerCase()));
  if (peer) out.push({ label: "Peer signal", value: `Booked ${peer}` });

  if (!out.length) out.push({ label: "Profile", value: "Using NØCTURNE's profile defaults" });

  return { filters: f, interpretation: out, peerArtist: peer };
}

export const DRAW_OPTIONS = DRAW_BANDS;
