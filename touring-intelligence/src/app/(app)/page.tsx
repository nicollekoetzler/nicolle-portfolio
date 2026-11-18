import { ArrowRight } from "lucide-react";
import { ArtistCard, KpiTiles } from "@/components/dashboard/artist-overview";
import { AudienceInterestChart } from "@/components/dashboard/audience-chart";
import { RecommendedOpportunities } from "@/components/dashboard/recommended-opportunities";
import { TouringIntelligence } from "@/components/dashboard/touring-intelligence";
import { AIMark } from "@/components/ui/ai";
import { LinkButton } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/panel";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview · Wed, Nov 18"
        title="Welcome back, Lena."
        description="Three new venues match NØCTURNE's autumn window since your last visit, and Kraków is heating up faster than any other market in your sound cluster."
        actions={
          <>
            <LinkButton href="/markets">Market intelligence</LinkButton>
            <LinkButton href="/discover" variant="primary">
              <AIMark size={10} className="text-accent-ink" /> Discover venues <ArrowRight className="size-3.5" />
            </LinkButton>
          </>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <ArtistCard />
        <div className="flex flex-col gap-4">
          <KpiTiles />
          <div className="flex flex-1 items-start gap-3 rounded-lg border border-accent/15 bg-accent/[0.03] p-4">
            <AIMark size={11} className="mt-1" />
            <div>
              <p className="text-[13px] leading-relaxed text-fg">
                Your strongest routing looks like <span className="font-medium">Berlin → Leipzig → Prague → Brno → Kraków</span>. Four of those cities rank in your top six markets, and no drive is longer than five hours.
              </p>
              <p className="mt-1.5 font-mono text-[10.5px] text-faint">Suggestion · simulated data</p>
            </div>
          </div>
        </div>
      </div>
      <TouringIntelligence />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <RecommendedOpportunities />
        <AudienceInterestChart />
      </div>
    </div>
  );
}
