import Logos from "./Logos";
import WorkTabs from "./WorkTabs";

/** The Home page's content; the legal-tech site (legal.nicollekoetzler.com) names the first work tab differently */
export default function HomeContent({ productLabel }: { productLabel?: string }) {
  return (
    <>
      <WorkTabs productLabel={productLabel} />

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
