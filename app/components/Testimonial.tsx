/* eslint-disable @next/next/no-img-element -- a small, already optimized avatar */

/** A client quote on the Home page */
export default function Testimonial() {
  return (
    <section className="v2-section v2-testimonial">
      <h2 className="v2-h2">What clients say</h2>
      <figure className="v2-quote">
        <blockquote>
          <p>
            Nicolle built our website at Compass Law Group and made the whole process easy. She understood what a law
            firm needs, kept us updated at every step and delivered a site that{" "}
            <mark>looks professional and represents our firm well.</mark> I’d recommend her to any firm looking for a
            great website.
          </p>
        </blockquote>
        <figcaption>
          <img src="/assets/v2/joseph-shirazi.webp" width={56} height={56} alt="" />
          <span className="v2-quote__who">
            <strong>Joseph Shirazi</strong>
            <small>Attorney · Compass Law Group, LLP</small>
          </span>
          <a
            className="v2-quote__link"
            href="https://www.linkedin.com/in/joseph-shirazi-5aa31619/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Joseph Shirazi on LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
            View on LinkedIn
          </a>
        </figcaption>
      </figure>
    </section>
  );
}
