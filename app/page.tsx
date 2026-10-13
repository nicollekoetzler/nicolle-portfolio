/* eslint-disable @next/next/no-img-element -- SVG logos/icons keep their Figma root sizes as plain <img> */
import Image from "next/image";
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
    </ul>
  );
}

function Arrow({ variant }: { variant: "white" | "dark" }) {
  return (
    <span className="btn__arrow">
      <img src={`/assets/arrow-${variant}.svg`} alt="" />
    </span>
  );
}

function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <article className={wide ? "project project--wide" : "project"}>
      <div className={wide ? "project__media project__media--wide" : "project__media"}>
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
      </div>
      <div className="project__info">
        <div className="project__heading">
          <h2 className="project__title">{project.title}</h2>
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

      <header className="nav container">
        <a className="nav__logo" href="#top" aria-label="Nicolle Koetzler, home">
          <img src="/assets/nk-logo.svg" width={45.741} height={35.5} alt="NK" />
        </a>
        <nav className="nav__links" aria-label="Main">
          <a href="#portfolio">Portfolio</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a className="nav__icon" href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <img src="/assets/linkedin.svg" width={17} height={17} alt="" />
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero container" id="about">
          <div className="hero__text">
            <ul className="chips" aria-label="Roles">
              {roles.map((role) => (
                <li key={role} className="chip">{role}</li>
              ))}
            </ul>

            <div className="hero__copy">
              <h1 className="hero__title">
                Hey! I&apos;m <span className="muted">Nicolle Koetzler</span>,<br />
                a Product Designer and Software Engineer.
              </h1>
              <p className="hero__lead">
                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                ipsum Lorem ipsum Lorem ipsum
              </p>
            </div>

            <div className="hero__actions">
              <a className="btn btn--primary" href="#about">
                Learn More About Us
                <Arrow variant="white" />
              </a>
              <a className="btn btn--link" href="#contact" id="contact">
                Contact me
                <Arrow variant="dark" />
              </a>
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

        <section className="clients" id="services">
          <p className="clients__title">Companies that I already helped:</p>
          <div className="marquee">
            {/* The set is repeated once so the loop is seamless */}
            <div className="marquee__track">
              <Logos />
              <Logos hidden />
            </div>
          </div>
        </section>

        <p className="scroll-hint">
          <a href="#portfolio">Scroll down to see my projects</a>
        </p>

        <section className="projects" id="portfolio" aria-label="Projects">
          <ProjectCard project={featured} wide />
          <div className="projects__grid">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
