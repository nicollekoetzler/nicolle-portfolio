/* eslint-disable @next/next/no-img-element -- a small, already optimized avatar */

/** A client quote on the Home page */
export default function Testimonial() {
  return (
    <section className="v2-section v2-testimonial">
      <h2 className="v2-h2">What clients say</h2>
      <figure className="v2-quote">
        <blockquote>
          <p>
            “Nicolle built our website at Compass Law Group and made the whole process easy. She understood what a law
            firm needs, kept us updated at every step and delivered a site that looks professional and represents our
            firm well. I’d recommend her to any firm looking for a great website.”
          </p>
        </blockquote>
        <figcaption>
          <img src="/assets/v2/joseph-shirazi.webp" width={48} height={48} alt="" />
          <span>
            <a href="https://www.linkedin.com/in/joseph-shirazi-5aa31619/" target="_blank" rel="noopener noreferrer">
              Joseph Shirazi
            </a>
            <small>Attorney · Compass Law Group, LLP</small>
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
