import { Suspense } from "react";
import { DiscoveryView } from "@/components/discovery/discovery-view";

export const metadata = { title: "Venue Discovery — Touring Intelligence" };

export default function DiscoverPage() {
  return (
    <Suspense>
      <DiscoveryView />
    </Suspense>
  );
}
