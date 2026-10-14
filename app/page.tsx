/* eslint-disable @next/next/no-img-element -- SVG logos/icons keep their Figma root sizes as plain <img> */
import Image from "next/image";
import { Arrow, EMAIL, LINKEDIN, SiteFooter, SiteHeader } from "./components/site";
import { featured, projects, roles, type Project } from "./data";

function Logos({ hidden = false }: { hidden?: boolean }) {
  const alt = (text: string) => (hidden ? "" : text);
  return (
    <ul className="logos" aria-hidden={hidden || undefined}>
      <li className="logo logo--morrell" aria-label={hidden ? undefined : "The Morrell Law Firm"}>
        <span style={{ ["--mask" as string]: "url('/assets/logo-morrell-mask.svg')" }}>
          <img src="/assets/logo-morrell.svg" alt="" />
        </span>
      </li>
      <li className="logo">
        <img src="/assets/logo-california-trial.svg" width={225} height={52} alt={alt("California Trial Law Group")} />
      </li>
      <li className="logo">
        <img src="/assets/logo-justice4elders.svg" width={228.219} height={56} alt={alt("Justice 4 Elders")} />
      </li>
      <li className="logo logo--simmons" aria-label={hidden ? undefined : "Simmons Law"}>
        <img className="logo--simmons__mark" src="/assets/logo-simmons-mark.svg" width={42} height={45.182} alt="" />
        <img className="logo--simmons__word" src="/assets/logo-simmons-word.svg" width={145.464} height={27.017} alt="" />
      </li>
      <li className="logo">
        <img src="/assets/logo-bush.svg" width={93} height={34.128} alt={alt("Bush & Bush")} />
      </li>
      <li className="logo">
        <img src="/assets/logo-taylor-siemens.svg" width={206} height={42.429} alt={alt("Taylor & Siemens")} />
      </li>
      <li className="logo">
        <img src="/assets/logo-trial-lawyers.svg" width={204} height={43} alt={alt("Trial Lawyers University")} />
      </li>
      <li className="logo">
        <img src="/assets/logo-hostgator.svg" width={225} height={40} alt={alt("HostGator")} />
      </li>
    </ul>
  );
}

/** Hand-drawn style arrow that curls once and draws itself downward, on a loop */
function CurlArrow() {
  return (
    <svg className="curl-arrow" viewBox="0 0 40 64" aria-hidden="true">
      <path
        className="curl-arrow__shaft"
        pathLength={1}
        d="M20 2 C20 12 8 14 8 24 C8 34 30 34 28 22 C26 12 12 20 16 34 C18 42 20 48 20 58"
      />
      <path className="curl-arrow__head" pathLength={1} d="M13 51 L20 59 L27 51" />
    </svg>
  );
}

/** The project image, linked to its case study (in a new tab) when there is one */
function MediaLink({ href, label, className, children }: { href?: string; label: string; className: string; children: React.ReactNode }) {
  return href ? (
    <a className={className} href={href} target="_blank" rel="noopener" aria-label={label}>
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  );
}

function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <article className={wide ? "project project--wide" : "project"}>
      <MediaLink
        href={project.caseStudy ?? project.site}
        label={`${project.title}, ${project.caseStudy ? "case study" : "live site"} (opens in a new tab)`}
        className={wide ? "project__media project__media--wide" : "project__media"}
      >
        {project.video ? (
          <video
            src={project.video}
            poster={project.image}
            aria-label={project.alt}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={project.position ? { objectPosition: project.position } : undefined}
          />
        ) : (
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes={wide ? "100vw" : "(max-width: 960px) 100vw, 50vw"}
            style={project.position ? { objectPosition: project.position } : undefined}
          />
        )}
      </MediaLink>
      <div className="project__info">
        <div className="project__heading">
          <h2 className="project__title">{project.title}</h2>
          {(project.caseStudy ?? project.site) && (
            <a className="project__link" href={project.caseStudy ?? project.site} target="_blank" rel="noopener">
              View Project <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.link && (
            <a className="project__link" href={project.link.href} target="_blank" rel="noopener">
              {project.link.label} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        <ul className="tags">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="page">
      {/* Background glows (Ellipse 7 / Ellipse 8) */}
      <img className="glow glow--left" src="/assets/ellipse-8.svg" alt="" aria-hidden="true" />
      <img className="glow glow--right" src="/assets/ellipse-7.svg" alt="" aria-hidden="true" />

      <SiteHeader />

      <main id="top">
        <section className="hero container" id="about">
          <div className="hero__text">
            <ul className="chips" aria-label="Roles">
              {roles.map((role) => (
                <li key={role} className="chip">
                  {role}
                  <svg className="chip__border" aria-hidden="true"><rect /></svg>
                </li>
              ))}
            </ul>

            <div className="hero__copy">
              <h1 className="hero__title">
                Hey! I&apos;m <span className="muted">Nicolle Koetzler</span>,<br />
                a Product Designer and Software Engineer.
              </h1>
            </div>

            <div className="hero__actions">
              <a className="btn btn--primary" href="/about">
                Learn More About Me
                <Arrow variant="white" />
              </a>
            </div>

            <ul className="hero__contact" aria-label="Contact">
              <li>
                <a href={LINKEDIN} target="_blank" rel="noopener">
                  LinkedIn
                  <Arrow variant="dark" />
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>
                  {EMAIL}
                  <Arrow variant="dark" />
                </a>
              </li>
            </ul>

            <div className="trusted" id="services">
              <p className="trusted__title">Trusted by:</p>
              <div className="marquee">
                {/* The set is repeated once so the loop is seamless */}
                <div className="marquee__track">
                  <Logos />
                  <Logos hidden />
                </div>
              </div>
            </div>
          </div>

          <div className="collage" aria-hidden="true">
            <div className="collage__main">
              <Image src="/assets/photo-london.png" alt="" fill sizes="(max-width: 960px) 80vw, 490px" priority />
            </div>
            <div className="collage__bw">
              <Image src="/assets/photo-bw.png" alt="" fill sizes="170px" />
            </div>
            <div className="collage__small">
              <Image src="/assets/photo-portrait.png" alt="" fill sizes="132px" />
            </div>
          </div>
        </section>

        <div className="featured">
          <CurlArrow />
          <h2 className="featured-title">Featured Work</h2>
        </div>

        <section className="projects" id="portfolio" aria-label="Projects">
          <ProjectCard project={featured} wide />
          <div className="projects__grid">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
