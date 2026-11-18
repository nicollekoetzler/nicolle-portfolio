export type CountryCode = "DE" | "PL" | "CZ" | "AT" | "NL" | "HU";

export type Genre =
  | "Black Metal"
  | "Atmospheric Black Metal"
  | "Death Metal"
  | "Doom Metal"
  | "Post-Metal"
  | "Sludge Metal"
  | "Progressive Metal"
  | "Folk Metal";

export type VenueType = "Club" | "Bar" | "DIY Space" | "Concert Hall" | "Cultural Centre";

export type Availability = "Open dates" | "Limited dates" | "Fully booked";

export type ContactStatus = "Verified" | "Responsive" | "On request" | "Unverified";

export type DrawBand = "50–150" | "150–250" | "250–400" | "400+";

export interface MatchBreakdown {
  genre: number;
  audience: number;
  capacity: number;
  geography: number;
  history: number;
}

export interface PastEvent {
  date: string;
  headliner: string;
  support: string[];
  genre: Genre;
  attendance: number;
  format: "Headline" | "Co-headline" | "Festival night" | "Package tour";
}

export interface TalentBuyer {
  name: string;
  role: string;
  email: string;
  status: ContactStatus;
  lastVerified: string;
  responseTime: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: CountryCode;
  district: string;
  capacity: number;
  type: VenueType;
  genres: Genre[];
  breakdown: MatchBreakdown;
  availability: Availability;
  availabilityNote: string;
  similarArtists: string[];
  reason: string;
  signals: string[];
  website: string;
  verified: boolean;
  founded: number;
  buyer: TalentBuyer;
  events: PastEvent[];
  preferences: string[];
  typicalAttendance: [number, number];
  audienceFit: string;
  distanceKm: number;
}

export interface Market {
  city: string;
  country: string;
  countryCode: CountryCode;
  interest: number;
  overlap: number;
  venues: number;
  trend: number[];
  note: string;
}

export interface Filters {
  countries: CountryCode[];
  cities: string[];
  genres: Genre[];
  capacity: [number, number];
  draw: DrawBand;
  types: VenueType[];
  availability: Availability[];
}
