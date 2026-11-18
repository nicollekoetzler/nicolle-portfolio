import type { CountryCode, Market } from "../types";

export const artist = {
  name: "NØCTURNE",
  genre: "Atmospheric Black Metal",
  secondaryGenres: ["Post-Metal", "Black Metal"],
  base: "Berlin, Germany",
  draw: "150–250" as const,
  formed: 2019,
  manager: "Lena",
  tour: {
    name: "European Autumn Tour 2027",
    window: "Sep 16 – Oct 24, 2027",
    targetDates: 22,
    confirmed: 3,
    holds: 5,
    status: "Routing in progress",
  },
  profile: {
    completeness: 82,
    missing: ["Live footage (last 12 months)", "Technical rider", "Ticket history from 2025 tour"],
  },
  peers: ["Ashen Vigil", "Pale Meridian", "Hrafnmoor", "Vaelmyr", "Grey Cathedral"],
};

export const markets: Market[] = [
  { city: "Berlin", country: "Germany", countryCode: "DE", interest: 96, overlap: 74, venues: 9, trend: [62, 66, 70, 74, 79, 84, 88, 91, 96], note: "Hometown, strongest listener city" },
  { city: "Leipzig", country: "Germany", countryCode: "DE", interest: 88, overlap: 71, venues: 4, trend: [54, 58, 63, 66, 70, 76, 80, 85, 88], note: "High overlap with peer acts" },
  { city: "Prague", country: "Czech Republic", countryCode: "CZ", interest: 84, overlap: 66, venues: 5, trend: [60, 61, 65, 68, 70, 74, 77, 81, 84], note: "Consistent atmospheric BM scene" },
  { city: "Kraków", country: "Poland", countryCode: "PL", interest: 81, overlap: 63, venues: 3, trend: [38, 42, 47, 53, 58, 64, 70, 76, 81], note: "Fastest-growing market this year" },
  { city: "Hamburg", country: "Germany", countryCode: "DE", interest: 77, overlap: 58, venues: 6, trend: [64, 66, 67, 69, 70, 72, 73, 75, 77], note: "Steady, larger rooms" },
  { city: "Vienna", country: "Austria", countryCode: "AT", interest: 74, overlap: 61, venues: 4, trend: [58, 60, 62, 65, 66, 68, 70, 72, 74], note: "Peer acts sell well here" },
  { city: "Wrocław", country: "Poland", countryCode: "PL", interest: 69, overlap: 55, venues: 2, trend: [40, 44, 47, 51, 55, 58, 62, 66, 69], note: "Good routing day" },
  { city: "Utrecht", country: "Netherlands", countryCode: "NL", interest: 66, overlap: 57, venues: 3, trend: [55, 56, 58, 59, 60, 62, 63, 65, 66], note: "Curated atmospheric programme" },
  { city: "Brno", country: "Czech Republic", countryCode: "CZ", interest: 61, overlap: 52, venues: 2, trend: [30, 34, 38, 41, 46, 50, 54, 58, 61], note: "Emerging, collective-run spaces" },
  { city: "Ostrava", country: "Czech Republic", countryCode: "CZ", interest: 54, overlap: 48, venues: 1, trend: [22, 25, 29, 33, 37, 42, 46, 50, 54], note: "Small but accelerating" },
];

export const insights = {
  topMarkets: [
    { city: "Berlin", code: "DE" as CountryCode, score: 96, why: "Hometown headline. 74% audience overlap, 9 fitting rooms." },
    { city: "Leipzig", code: "DE" as CountryCode, score: 88, why: "Peer acts sold out 3 of 4 shows in 2026." },
    { city: "Prague", code: "CZ" as CountryCode, score: 84, why: "Consistent atmospheric scene, natural route from Berlin." },
  ],
  emerging: [
    { city: "Kraków", delta: "+43%", why: "Listener growth for atmospheric BM since spring. A new monthly series started in September." },
    { city: "Ostrava", delta: "+32%", why: "Small base, but the fastest relative growth in your sound cluster in Czechia." },
  ],
  explore: [
    { city: "Brno", why: "Bridges Prague and Kraków on a single routing day." },
    { city: "Wrocław", why: "Low-risk room on the Berlin–Kraków corridor." },
    { city: "Budapest", why: "Opens a south-eastern leg after Vienna." },
  ],
};
