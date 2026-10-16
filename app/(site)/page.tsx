import Logos from "../components/Logos";
import WorkTabs from "../components/WorkTabs";

export default function Home() {
  return (
    <>
      <WorkTabs />

      <section className="v2-section v2-trusted">
        <h2 className="v2-h2">Trusted by</h2>
        <p className="v2-section__lead">
          From law firms across the U.S. to legal education leaders like Trial Lawyers University and tech
          companies such as HostGator.
        </p>
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
