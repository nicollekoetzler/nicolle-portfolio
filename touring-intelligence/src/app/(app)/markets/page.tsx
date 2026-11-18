import { AudienceInterestChart } from "@/components/dashboard/audience-chart";
import { TouringIntelligence } from "@/components/dashboard/touring-intelligence";
import { MarketTable } from "@/components/markets/market-table";
import { AIBadge, SimulatedNote } from "@/components/ui/ai";
import { PageHeader } from "@/components/ui/panel";

export const metadata = { title: "Market Intelligence — Touring Intelligence" };

export default function MarketsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={<span className="flex items-center gap-2">Market Intelligence <AIBadge label="AI" /></span>}
        title="Where your audience already is, and where it's growing."
        description="City-level demand for NØCTURNE's sound, combining listener overlap, peer-act attendance and the supply of rooms that fit."
      />
      <MarketTable />
      <SimulatedNote>All market figures are simulated for this prototype.</SimulatedNote>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <TouringIntelligence />
        <AudienceInterestChart />
      </div>
    </div>
  );
}
