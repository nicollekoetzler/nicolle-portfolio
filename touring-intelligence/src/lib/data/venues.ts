import type { Genre, PastEvent, TalentBuyer, Venue } from "../types";

/**
 * All venues, people, bands and numbers here are fictional prototype data.
 * Nothing is sourced from real booking systems.
 */

type Seed = Omit<Venue, "events" | "preferences" | "typicalAttendance" | "audienceFit"> &
  Partial<Pick<Venue, "events" | "preferences" | "typicalAttendance" | "audienceFit">>;

const MONTHS = ["Oct 2026", "Sep 2026", "Jun 2026", "May 2026", "Mar 2026", "Jan 2026"];

function seeded(id: string) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function generateEvents(v: Seed): PastEvent[] {
  const rnd = seeded(v.id);
  const formats: PastEvent["format"][] = ["Headline", "Co-headline", "Package tour", "Headline", "Festival night", "Headline"];
  return v.similarArtists.slice(0, 5).map((headliner, i) => {
    const others = v.similarArtists.filter((a) => a !== headliner);
    return {
      date: MONTHS[i],
      headliner,
      support: [others[(i + 1) % others.length], others[(i + 3) % others.length]].filter(Boolean),
      genre: v.genres[i % v.genres.length],
      attendance: Math.round(v.capacity * (0.62 + rnd() * 0.34)),
      format: formats[i],
    };
  });
}

function defaultPreferences(v: Seed): string[] {
  const base = [
    "Books 4–6 months ahead for touring acts",
    v.capacity <= 200 ? "Door deal or low guarantee with bar split" : "Guarantee + backend above break-even",
    "Prefers a local support act on the bill",
  ];
  if (v.type === "DIY Space") base.push("Collective-run; all-ages policy on weekends");
  if (v.type === "Concert Hall") base.push("Requires production rider 8 weeks prior");
  return base;
}

function finish(v: Seed): Venue {
  const events = v.events ?? generateEvents(v);
  const att = events.map((e) => e.attendance);
  return {
    ...v,
    events,
    preferences: v.preferences ?? defaultPreferences(v),
    typicalAttendance: v.typicalAttendance ?? [Math.min(...att), Math.max(...att)],
    audienceFit:
      v.audienceFit ??
      `Audience profile overlaps with listeners of ${v.similarArtists.slice(0, 2).join(" and ")}, which sits close to NØCTURNE's core listener base.`,
  };
}

function buyer(name: string, role: string, slug: string, status: TalentBuyer["status"], lastVerified: string, responseTime: string): TalentBuyer {
  return { name, role, email: `${slug}@booking.example`, status, lastVerified, responseTime };
}

const g = (...x: Genre[]) => x;

const seeds: Seed[] = [
  {
    id: "void-club",
    name: "Void Club",
    city: "Berlin",
    country: "Germany",
    countryCode: "DE",
    district: "Friedrichshain",
    capacity: 250,
    type: "Club",
    genres: g("Black Metal", "Death Metal", "Doom Metal", "Post-Metal"),
    breakdown: { genre: 98, audience: 92, capacity: 95, geography: 90, history: 94 },
    availability: "Open dates",
    availabilityNote: "6 open weekend holds in Sep–Oct 2027",
    similarArtists: ["Ashen Vigil", "Hrafnmoor", "Grey Cathedral", "Mournspire", "Pale Meridian", "Vaelmyr"],
    reason:
      "Programs atmospheric and underground extreme metal almost weekly. Capacity sits right on your 150–250 draw, and it booked three acts with heavy listener overlap in the last 12 months.",
    signals: ["Hometown room", "Books atmospheric BM monthly", "Buyer replies fast"],
    website: "voidclub-berlin.example",
    verified: true,
    founded: 2011,
    buyer: buyer("Mara Lindqvist", "Head of Booking", "mara.lindqvist", "Verified", "Nov 4, 2026", "Usually replies in 2–3 days"),
    events: [
      { date: "Oct 2026", headliner: "Ashen Vigil", support: ["Kolde Øde", "Thrallgate"], genre: "Atmospheric Black Metal", attendance: 238, format: "Headline" },
      { date: "Sep 2026", headliner: "Hrafnmoor", support: ["Silva Mortis"], genre: "Black Metal", attendance: 212, format: "Co-headline" },
      { date: "Jul 2026", headliner: "Grey Cathedral", support: ["Cinder Psalm", "Hollow Hymnal"], genre: "Post-Metal", attendance: 196, format: "Package tour" },
      { date: "May 2026", headliner: "Mournspire", support: ["Obsidian Lantern"], genre: "Doom Metal", attendance: 171, format: "Headline" },
      { date: "Mar 2026", headliner: "Pale Meridian", support: ["Wolvennacht"], genre: "Atmospheric Black Metal", attendance: 244, format: "Headline" },
      { date: "Jan 2026", headliner: "Sepulchral Tide", support: ["Thrallgate", "Kolde Øde"], genre: "Death Metal", attendance: 203, format: "Festival night" },
    ],
    preferences: [
      "Books touring acts 5–7 months ahead; autumn holds fill by April",
      "Prefers Thursday–Saturday for headline shows",
      "Door deal with guarantee floor for acts drawing 150+",
      "Asks for one Berlin-based support act",
      "Values recent live footage and city-level listener data in pitches",
    ],
    typicalAttendance: [170, 245],
    audienceFit:
      "About 68% of the room's recent audience also listens to atmospheric and post-black metal. Berlin is NØCTURNE's strongest listener city, so a hometown headline is likely to sit near capacity.",
    distanceKm: 0,
  },
  {
    id: "kellerhalle",
    name: "Kellerhalle",
    city: "Leipzig",
    country: "Germany",
    countryCode: "DE",
    district: "Connewitz",
    capacity: 220,
    type: "Club",
    genres: g("Black Metal", "Atmospheric Black Metal", "Doom Metal"),
    breakdown: { genre: 96, audience: 89, capacity: 93, geography: 86, history: 88 },
    availability: "Open dates",
    availabilityNote: "Open Thursdays through Oct 2027",
    similarArtists: ["Hrafnmoor", "Kolde Øde", "Wolvennacht", "Silva Mortis", "Thrallgate"],
    reason:
      "A cellar room with a strong atmospheric black metal identity. Leipzig shows the second-highest listener overlap in Germany, two hours from your base.",
    signals: ["High genre focus", "2h from Berlin"],
    website: "kellerhalle-leipzig.example",
    verified: true,
    founded: 2014,
    buyer: buyer("Jonas Reuter", "Booker", "jonas.reuter", "Responsive", "Oct 21, 2026", "Usually replies within a week"),
    distanceKm: 190,
  },
  {
    id: "podzemi-13",
    name: "Podzemí 13",
    city: "Prague",
    country: "Czech Republic",
    countryCode: "CZ",
    district: "Žižkov",
    capacity: 180,
    type: "Club",
    genres: g("Black Metal", "Atmospheric Black Metal", "Post-Metal", "Sludge Metal"),
    breakdown: { genre: 95, audience: 86, capacity: 90, geography: 82, history: 87 },
    availability: "Limited dates",
    availabilityNote: "2 weekend dates left in Oct 2027",
    similarArtists: ["Pale Meridian", "Vaelmyr", "Cinder Psalm", "Kolde Øde", "Hollow Hymnal"],
    reason:
      "Prague's most consistent home for atmospheric and post-black metal. Booked two bands from your sound cluster this year, both above 85% capacity.",
    signals: ["Strong sell-through", "Natural Berlin → Prague route"],
    website: "podzemi13.example",
    verified: true,
    founded: 2016,
    buyer: buyer("Tereza Malá", "Programme Manager", "tereza.mala", "Verified", "Oct 30, 2026", "Usually replies in 3–5 days"),
    distanceKm: 350,
  },
  {
    id: "strefa-ciszy",
    name: "Strefa Ciszy",
    city: "Kraków",
    country: "Poland",
    countryCode: "PL",
    district: "Kazimierz",
    capacity: 200,
    type: "Club",
    genres: g("Black Metal", "Atmospheric Black Metal", "Death Metal", "Folk Metal"),
    breakdown: { genre: 94, audience: 88, capacity: 94, geography: 74, history: 85 },
    availability: "Open dates",
    availabilityNote: "Open dates across Sep–Nov 2027",
    similarArtists: ["Wolvennacht", "Silva Mortis", "Ashen Vigil", "Thrallgate", "Vaelmyr"],
    reason:
      "Kraków's listener interest in atmospheric black metal grew sharply this year, and this room has started a monthly series for exactly your niche.",
    signals: ["Emerging market", "New monthly BM series"],
    website: "strefaciszy.example",
    verified: true,
    founded: 2018,
    buyer: buyer("Paweł Wrona", "Promoter", "pawel.wrona", "Responsive", "Oct 12, 2026", "Usually replies within a week"),
    distanceKm: 590,
  },
  {
    id: "grauzone",
    name: "Grauzone",
    city: "Hamburg",
    country: "Germany",
    countryCode: "DE",
    district: "St. Pauli",
    capacity: 300,
    type: "Club",
    genres: g("Black Metal", "Death Metal", "Sludge Metal", "Post-Metal"),
    breakdown: { genre: 90, audience: 87, capacity: 84, geography: 84, history: 86 },
    availability: "Limited dates",
    availabilityNote: "Weeknights only in Sep 2027",
    similarArtists: ["Sepulchral Tide", "Grey Cathedral", "Obsidian Lantern", "Hrafnmoor", "Mournspire"],
    reason:
      "A larger room with a reliable extreme metal crowd. Slightly above your draw, so it fits best as a co-headline or package stop.",
    signals: ["Co-headline fit", "Strong weeknight crowd"],
    website: "grauzone-hamburg.example",
    verified: true,
    founded: 2009,
    buyer: buyer("Ida Behrens", "Talent Buyer", "ida.behrens", "Verified", "Nov 1, 2026", "Usually replies in 2–4 days"),
    distanceKm: 290,
  },
  {
    id: "kotelna",
    name: "Kotelna",
    city: "Brno",
    country: "Czech Republic",
    countryCode: "CZ",
    district: "Zábrdovice",
    capacity: 200,
    type: "DIY Space",
    genres: g("Atmospheric Black Metal", "Post-Metal", "Doom Metal"),
    breakdown: { genre: 93, audience: 80, capacity: 94, geography: 76, history: 82 },
    availability: "Open dates",
    availabilityNote: "Flexible, collective-run calendar",
    similarArtists: ["Cinder Psalm", "Hollow Hymnal", "Pale Meridian", "Grey Cathedral"],
    reason:
      "A former boiler house run by a collective, programming post-metal and atmospheric acts. Easy routing between Prague and Kraków.",
    signals: ["Routing bridge", "Collective-run"],
    website: "kotelna-brno.example",
    verified: false,
    founded: 2019,
    buyer: buyer("Ondřej Kříž", "Collective member, booking", "ondrej.kriz", "On request", "Aug 18, 2026", "Reply time unknown"),
    distanceKm: 550,
  },
  {
    id: "klub-olow",
    name: "Klub Ołów",
    city: "Wrocław",
    country: "Poland",
    countryCode: "PL",
    district: "Nadodrze",
    capacity: 160,
    type: "Bar",
    genres: g("Black Metal", "Death Metal", "Doom Metal"),
    breakdown: { genre: 91, audience: 82, capacity: 88, geography: 80, history: 79 },
    availability: "Open dates",
    availabilityNote: "Most weeknights open",
    similarArtists: ["Thrallgate", "Sepulchral Tide", "Kolde Øde", "Mournspire"],
    reason:
      "Small but loyal room on the Berlin–Kraków corridor. A good routing day between bigger shows, with low risk at your draw.",
    signals: ["Low-risk routing day"],
    website: "klubolow.example",
    verified: true,
    founded: 2015,
    buyer: buyer("Kasia Lis", "Owner & Booker", "kasia.lis", "Responsive", "Sep 29, 2026", "Usually replies in 3–5 days"),
    distanceKm: 340,
  },
  {
    id: "eisenkeller",
    name: "Eisenkeller",
    city: "Dresden",
    country: "Germany",
    countryCode: "DE",
    district: "Neustadt",
    capacity: 150,
    type: "Bar",
    genres: g("Black Metal", "Folk Metal", "Doom Metal"),
    breakdown: { genre: 88, audience: 78, capacity: 86, geography: 88, history: 80 },
    availability: "Limited dates",
    availabilityNote: "Sundays and Mondays only",
    similarArtists: ["Wolvennacht", "Silva Mortis", "Kolde Øde", "Hrafnmoor"],
    reason:
      "Intimate room close to home with a folk-leaning black metal audience. Works as a warm-up show before Prague.",
    signals: ["Warm-up show", "Close to base"],
    website: "eisenkeller.example",
    verified: true,
    founded: 2012,
    buyer: buyer("Lukas Brandt", "Booker", "lukas.brandt", "Verified", "Oct 8, 2026", "Usually replies within a week"),
    distanceKm: 190,
  },
  {
    id: "rostfabrik",
    name: "Rostfabrik",
    city: "Cologne",
    country: "Germany",
    countryCode: "DE",
    district: "Ehrenfeld",
    capacity: 350,
    type: "Cultural Centre",
    genres: g("Post-Metal", "Sludge Metal", "Progressive Metal", "Doom Metal"),
    breakdown: { genre: 80, audience: 79, capacity: 72, geography: 74, history: 76 },
    availability: "Open dates",
    availabilityNote: "Open dates in Oct 2027",
    similarArtists: ["Grey Cathedral", "Obsidian Lantern", "Cinder Psalm", "Hollow Hymnal"],
    reason:
      "Strong post-metal programme. The room is large for your current draw, so it is better approached as part of a package with a bigger post-metal act.",
    signals: ["Package tour target"],
    website: "rostfabrik.example",
    verified: true,
    founded: 2007,
    buyer: buyer("Selin Arslan", "Head of Programme", "selin.arslan", "Verified", "Oct 25, 2026", "Usually replies in 1–2 weeks"),
    distanceKm: 570,
  },
  {
    id: "arena-keller",
    name: "Arena Keller",
    city: "Vienna",
    country: "Austria",
    countryCode: "AT",
    district: "Landstraße",
    capacity: 240,
    type: "Club",
    genres: g("Black Metal", "Atmospheric Black Metal", "Death Metal"),
    breakdown: { genre: 92, audience: 84, capacity: 94, geography: 70, history: 84 },
    availability: "Limited dates",
    availabilityNote: "3 dates left in Oct 2027",
    similarArtists: ["Ashen Vigil", "Vaelmyr", "Pale Meridian", "Sepulchral Tide"],
    reason:
      "Vienna's go-to room for touring black metal. Booking history closely mirrors your peer group, and the capacity fits your draw well.",
    signals: ["Peer-group history"],
    website: "arenakeller.example",
    verified: true,
    founded: 2010,
    buyer: buyer("Felix Haider", "Booker", "felix.haider", "Responsive", "Oct 17, 2026", "Usually replies in 3–5 days"),
    distanceKm: 680,
  },
  {
    id: "hala-szron",
    name: "Hala Szron",
    city: "Warsaw",
    country: "Poland",
    countryCode: "PL",
    district: "Praga",
    capacity: 420,
    type: "Concert Hall",
    genres: g("Black Metal", "Death Metal", "Progressive Metal"),
    breakdown: { genre: 86, audience: 81, capacity: 62, geography: 72, history: 78 },
    availability: "Fully booked",
    availabilityNote: "Autumn 2027 fully held",
    similarArtists: ["Sepulchral Tide", "Hrafnmoor", "Thrallgate", "Obsidian Lantern"],
    reason:
      "Big Warsaw room with strong extreme metal history, but well above your draw and fully held for autumn. Worth tracking for 2028.",
    signals: ["Track for 2028"],
    website: "halaszron.example",
    verified: true,
    founded: 2005,
    buyer: buyer("Marek Zieliński", "Talent Buyer", "marek.zielinski", "Verified", "Oct 3, 2026", "Usually replies in 1–2 weeks"),
    distanceKm: 570,
  },
  {
    id: "schattenraum",
    name: "Schattenraum",
    city: "Munich",
    country: "Germany",
    countryCode: "DE",
    district: "Giesing",
    capacity: 120,
    type: "DIY Space",
    genres: g("Doom Metal", "Sludge Metal", "Black Metal"),
    breakdown: { genre: 82, audience: 70, capacity: 74, geography: 68, history: 72 },
    availability: "Open dates",
    availabilityNote: "Open most weekends",
    similarArtists: ["Mournspire", "Obsidian Lantern", "Thrallgate"],
    reason:
      "Underground DIY room with a doom-leaning crowd. Smaller than your draw, but a fair option for a southern routing gap.",
    signals: ["Routing gap filler"],
    website: "schattenraum.example",
    verified: false,
    founded: 2020,
    buyer: buyer("Toni Weiss", "Collective booking", "toni.weiss", "Unverified", "Jun 2, 2026", "Reply time unknown"),
    distanceKm: 585,
  },
  {
    id: "dul-club",
    name: "Důl Club",
    city: "Ostrava",
    country: "Czech Republic",
    countryCode: "CZ",
    district: "Vítkovice",
    capacity: 250,
    type: "Cultural Centre",
    genres: g("Black Metal", "Post-Metal", "Doom Metal", "Atmospheric Black Metal"),
    breakdown: { genre: 91, audience: 77, capacity: 92, geography: 70, history: 80 },
    availability: "Open dates",
    availabilityNote: "Open dates through Nov 2027",
    similarArtists: ["Vaelmyr", "Hollow Hymnal", "Cinder Psalm", "Ashen Vigil"],
    reason:
      "An industrial venue inside a former mine complex. Audience interest is still small but growing fast, and the space suits atmospheric shows.",
    signals: ["Emerging market", "Distinctive space"],
    website: "dulclub.example",
    verified: true,
    founded: 2017,
    buyer: buyer("Radka Novotná", "Programme Coordinator", "radka.novotna", "Verified", "Oct 14, 2026", "Usually replies in 3–5 days"),
    distanceKm: 560,
  },
  {
    id: "de-kelder",
    name: "De Kelder",
    city: "Utrecht",
    country: "Netherlands",
    countryCode: "NL",
    district: "Binnenstad",
    capacity: 230,
    type: "Club",
    genres: g("Black Metal", "Post-Metal", "Atmospheric Black Metal", "Doom Metal"),
    breakdown: { genre: 93, audience: 83, capacity: 95, geography: 66, history: 83 },
    availability: "Limited dates",
    availabilityNote: "2 dates in late Sep 2027",
    similarArtists: ["Pale Meridian", "Grey Cathedral", "Ashen Vigil", "Hollow Hymnal"],
    reason:
      "Dutch room with a curated atmospheric programme and strong pre-sales. Further from base, but a natural western leg.",
    signals: ["Strong pre-sales"],
    website: "dekelder-utrecht.example",
    verified: true,
    founded: 2013,
    buyer: buyer("Sanne de Vries", "Booker", "sanne.devries", "Responsive", "Oct 27, 2026", "Usually replies in 2–4 days"),
    distanceKm: 650,
  },
  {
    id: "fekete-terem",
    name: "Fekete Terem",
    city: "Budapest",
    country: "Hungary",
    countryCode: "HU",
    district: "Józsefváros",
    capacity: 280,
    type: "Club",
    genres: g("Black Metal", "Folk Metal", "Death Metal"),
    breakdown: { genre: 87, audience: 76, capacity: 88, geography: 60, history: 77 },
    availability: "Open dates",
    availabilityNote: "Open dates in Oct–Nov 2027",
    similarArtists: ["Wolvennacht", "Silva Mortis", "Sepulchral Tide"],
    reason:
      "Folk-leaning black metal room. A longer drive, but it opens a south-eastern leg after Vienna.",
    signals: ["South-east extension"],
    website: "feketeterem.example",
    verified: true,
    founded: 2012,
    buyer: buyer("Bence Tóth", "Promoter", "bence.toth", "Responsive", "Sep 30, 2026", "Usually replies within a week"),
    distanceKm: 870,
  },
];

export const venues: Venue[] = seeds.map(finish);

export function getVenue(id: string): Venue | undefined {
  return venues.find((v) => v.id === id);
}

export const ALL_GENRES: Genre[] = [
  "Atmospheric Black Metal",
  "Black Metal",
  "Death Metal",
  "Doom Metal",
  "Post-Metal",
  "Sludge Metal",
  "Progressive Metal",
  "Folk Metal",
];
