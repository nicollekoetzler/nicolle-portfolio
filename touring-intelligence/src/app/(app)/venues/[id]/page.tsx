import { notFound } from "next/navigation";
import { VenueReport } from "@/components/venue/venue-report";
import { getVenue, venues } from "@/lib/data/venues";

export function generateStaticParams() {
  return venues.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = getVenue(id);
  return { title: v ? `${v.name} · Venue intelligence` : "Venue not found" };
}

export default async function VenuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const venue = getVenue(id);
  if (!venue) notFound();
  return <VenueReport id={venue.id} />;
}
