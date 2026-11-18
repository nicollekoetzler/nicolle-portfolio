import { artist } from "./data/artist";
import { markets } from "./data/artist";
import { scoreFor } from "./match";
import type { Venue } from "./types";

export type PitchTone = "concise" | "warm" | "data";

export function recommendationFor(v: Venue): string {
  if (v.id === "void-club") {
    return "Void Club appears to be a strong opportunity for NØCTURNE. Its programming history shows a consistent focus on atmospheric and underground extreme metal. The venue's capacity is aligned with the band's estimated draw, making it a promising target for a headline or co-headline performance.";
  }
  const score = scoreFor(v);
  const fit = v.capacity > 300 ? "a co-headline or package slot" : v.capacity < 160 ? "a warm-up or routing-day show" : "a headline or co-headline performance";
  return `${v.name} looks like ${score >= 86 ? "a strong" : score >= 78 ? "a solid" : "a selective"} opportunity for NØCTURNE. Its recent programming leans on ${v.genres.slice(0, 2).join(" and ").toLowerCase()}, and it has booked peer acts such as ${v.similarArtists[0]}. With a capacity of ${v.capacity}, it is best approached as ${fit}.`;
}

export function pitchFor(v: Venue, tone: PitchTone): { subject: string; body: string } {
  const first = v.buyer.name.split(" ")[0];
  const m = markets.find((x) => x.city === v.city);
  const subject = `${artist.name} (atmospheric black metal, Berlin) · ${v.city} date, autumn 2027`;
  const peers = v.similarArtists.slice(0, 2).join(" and ");

  if (tone === "concise") {
    return {
      subject,
      body: `Hi ${first},

${artist.name} is an atmospheric black metal band from Berlin touring Central Europe ${artist.tour.window}. We'd love a ${v.city} date at ${v.name}.

• Draw: ${artist.draw} in comparable rooms
• Fits your programming: you recently booked ${peers}
• Flexible on date, open to headline or co-headline

Live footage, streaming numbers and our rider are linked below. Happy to work around your holds.

Best,
${artist.manager}, tour manager for ${artist.name}`,
    };
  }
  if (tone === "data") {
    return {
      subject,
      body: `Hi ${first},

A short, numbers-first pitch for ${v.name}:

• ${artist.name}: atmospheric black metal, Berlin, est. draw ${artist.draw}
• ${v.city}${m ? `: ~${m.overlap}% of local metal listeners overlap with our sound cluster` : ": growing listener base in our sound cluster"}
• Peer acts in your room: ${v.similarArtists.slice(0, 3).join(", ")}
• Room fit: capacity ${v.capacity} against our draw, realistic fill without overselling
• Window: ${artist.tour.window}, ${artist.tour.confirmed} dates confirmed so far

Would a weekday or weekend hold in late September or October work?

Thanks,
${artist.manager} · ${artist.name}`,
    };
  }
  return {
    subject,
    body: `Hi ${first},

I've followed ${v.name}'s programming for a while. The nights with ${peers} are exactly the kind of bills ${artist.name} feels at home on.

We're an atmospheric black metal band from Berlin, routing a European autumn tour between ${artist.tour.window}, and ${v.city} is a city we'd really like to get right. We typically draw ${artist.draw} people and would be glad to headline, co-headline, or bring a local support act.

I've attached live footage from this year, our rider and recent ticket numbers. If it sounds like a fit, I'd love to find a date that works for you.

All the best,
${artist.manager}
Tour manager, ${artist.name}`,
  };
}
