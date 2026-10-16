import Logos from "../components/Logos";
import WorkTabs from "../components/WorkTabs";

export default function Home() {
  return (
    <>
      <WorkTabs />

      <section className="v2-section v2-trusted">
        <h2 className="v2-h2">Trusted by</h2>
        <div className="marquee">
          <div className="marquee__track">
            <Logos />
            <Logos hidden />
          </div>
        </div>
      </section>
    </>
  );
}
