/* eslint-disable @next/next/no-img-element -- design exports keep their Figma sizes as plain <img> */
import type { Metadata } from "next";
import Link from "next/link";
import "../case-connector/case-connector.css";
import "./undv.css";

export const metadata: Metadata = {
  title: "UNDV · Case Study · Nicolle Koetzler",
  description:
    "Case study: auditing and redesigning UNDV, a discovery platform where people's work becomes their identity: project details, search, onboarding and the profile design editor.",
  // still being refined: reachable by direct link only, kept out of search engines
  robots: { index: false, follow: false },
};

const A = "/assets/undv";

function Shot({ src, w, h, alt, label }: { src: string; w: number; h: number; alt: string; label?: string }) {
  return (
    <figure className="ud-shot">
      {label && <figcaption className="ud-shot__label">{label}</figcaption>}
      <img src={`${A}/${src}`} width={w} height={h} alt={alt} loading="lazy" />
    </figure>
  );
}

/** before/after pair: the old screen sits above, the redesign below */
function BeforeAfter(props: { before: Parameters<typeof Shot>[0]; after: Parameters<typeof Shot>[0] }) {
  return (
    <div className="ud-ba">
      <Shot {...props.before} label="Before" />
      <Shot {...props.after} label="After" />
    </div>
  );
}

export default function UndvCaseStudy() {
  return (
    <div className="cs ud">
      <header className="cs-bar">
        <Link href="/" className="cs-bar__item">UNDV</Link>
        <span className="cs-bar__item cs-bar__center">Case Study</span>
        <Link href="/" className="cs-bar__item cs-bar__right">Nicolle Koetzler</Link>
      </header>

      <main className="ud-main">
        <div className="ud-meta">
          <p>Creative Discovery Platform</p>
          <p>Web app</p>
        </div>
        <img className="ud-hero" src={`${A}/project.webp`} width={1709} height={1024} alt="Redesigned UNDV project screen with the preview on the left and project details on the right" />

        <section className="ud-text">
          <h1>From Inspiration Gallery to a Platform Where Work Becomes Identity</h1>
          <p>
            UNDV is a discovery platform for digital work: landing pages, apps, dashboards and AI products. Builders
            post what they create, and the community explores, saves and remixes it. The mission is to{" "}
            <strong>make people’s work visible, valuable, and inspiring</strong>, and the vision is a world where what
            people create becomes their identity.
          </p>
          <p>
            When I started working with UNDV, the product was already live and the core experience was in place. My
            first deliverable was a design audit of the main flows, followed by redesign proposals in Figma for the
            screens that mattered most: the project details view, search, onboarding and the profile design editor.
          </p>
        </section>

        <section className="ud-text">
          <h2>The Challenge</h2>
          <p className="ud-lead">The product looked good, but it didn’t yet tell a story.</p>
          <p>
            The visual foundation was strong: a dark interface, a clean grid and a navigation pattern people already
            know from Instagram and TikTok. But the experience around each project felt anonymous. A project opened
            as a large preview with no name, the author was only visible after scrolling, and the actions people came
            to take (save, share, visit, get in touch) were scattered across the screen.
          </p>
          <p>
            Other parts of the product had the opposite problem. Onboarding was a separate step that stood between new
            users and the content, and the profile editor offered so much freedom that profiles could easily end up
            looking messy, especially for users without a design background.
          </p>
          <p className="ud-lead">The core question became:</p>
          <p className="ud-question">
            How might we make every project feel like a piece of someone’s identity, while keeping discovery fast,
            simple and immersive?
          </p>
        </section>

        <section className="ud-text">
          <h2>Goals</h2>
          <p>The redesign focused on four main goals:</p>
          <ul>
            <li>Connect every project to the person who made it, with a name, an author and a clear way to reach them.</li>
            <li>Make discovery faster with a search that suggests, remembers and filters.</li>
            <li>Let new users reach the content first and set up their account along the way.</li>
            <li>Give users freedom to personalize their profile, within guardrails that keep it looking good.</li>
          </ul>
        </section>

        <section className="ud-text">
          <h2>Strategy</h2>
          <p>
            I didn’t have access to user research or analytics yet, so I used the inputs available as design insights:
            the live product, the founders’ mission and vision, conversations with the team, and a benchmark of the
            platforms our users already live on: Dribbble, Behance, LinkedIn, TikTok and Instagram, plus Vercel for
            sign-in, Linktree for constrained customization and happenstance.ai for onboarding.
          </p>
          <p>
            For this first touchpoint I tried to be straightforward: understand the product structure and its proposal
            before changing components just to make them look better. Every change had to make sense and be useful.
          </p>
          <p>From there, I sorted what I found into three groups:</p>
          <ol>
            <li><strong>Keep:</strong> the navbar and sidebar style, the grid, the spacing and the rounded corners. They became the base of the design system.</li>
            <li><strong>Fix:</strong> things that confused or slowed people down, like a close button next to the profile picture and the author hidden below the fold.</li>
            <li><strong>Rethink:</strong> flows that needed a new structure: project details, search, onboarding and the profile editor.</li>
          </ol>
          <p>
            Where I wasn’t sure a feature was used, like the show-and-hide sidebar, I suggested validating it with
            heatmaps instead of removing it on opinion.
          </p>
        </section>

        <section className="ud-text">
          <h2>Execution</h2>
          <p>I focused the redesign on four key areas of the product:</p>
          <ol>
            <li>The <strong>Project screen</strong>, where people view a project and decide what to do with it.</li>
            <li>The <strong>Search</strong>, the main entry point for discovery.</li>
            <li>The <strong>Onboarding</strong>, the first-time experience after sign-up.</li>
            <li>The <strong>Profile Design Editor</strong>, where builders customize how their work is presented.</li>
          </ol>
        </section>

        <section className="ud-text">
          <h2>Key UX Decision 1: Giving Every Project a Name and a Face</h2>
          <p>
            In the original project view, the preview took the whole width, and the creator, their other projects and
            related work only appeared after scrolling. Without a project name, the page felt cold and lacking a human
            touch.
          </p>
          <p>
            I redesigned it as a two-column view. The preview stays large on the left, with a device switcher for
            desktop, tablet and mobile. On the right, a details panel brings everything that gives the project context
            into view at once:
          </p>
          <ul>
            <li>The project name, author and date, with like, save and share actions.</li>
            <li>An author card with a “Get in touch” button, visible without scrolling.</li>
            <li>An About section and content tags such as “Built with OpenAI”, “Landing Page” and “Template”.</li>
            <li>A Discussion area, so projects can start conversations.</li>
          </ul>
          <p>
            The main actions (Remix, Save, Share) sit in a fixed bar above the preview, and similar projects are one
            click away at the bottom. The result feels less like an image viewer and more like a portfolio piece.
          </p>
        </section>

        <BeforeAfter
          before={{ src: "old-project.webp", w: 1992, h: 1909, alt: "Original UNDV project view with a full-width preview and the author below" }}
          after={{ src: "project.webp", w: 1709, h: 1024, alt: "Redesigned project view with preview, details panel, author card and discussion" }}
        />

        <section className="ud-text">
          <h2>Key UX Decision 2: Turning Search into a Discovery Tool</h2>
          <p>
            Search was a plain text field. For a platform built around exploration, it needed to help people who don’t
            know exactly what they’re looking for yet.
          </p>
          <p>I redesigned it as a panel that opens under the search bar and works in layers:</p>
          <ul>
            <li><strong>Searching for:</strong> active filters shown as removable chips, with a quick way to add more.</li>
            <li><strong>Recent:</strong> past searches, easy to repeat or clear.</li>
            <li><strong>Popular categories:</strong> Apps, Agents, Websites, Games, Dashboard, Builder Tools and UI/UX Design.</li>
            <li><strong>Technology:</strong> the tools projects were built with, like Claude, OpenAI, Replit, Lovable and Next.js.</li>
          </ul>
          <p>
            This turned search from a single input into a guided way to browse, and it uses the same chip pattern as
            the rest of the product.
          </p>
        </section>

        <Shot src="search.webp" w={1709} h={1200} alt="Search panel with active filters, recent searches, popular categories and technology filters" />

        <section className="ud-text">
          <h2>Key UX Decision 3: Onboarding Inside the Product</h2>
          <p>
            Instead of putting a sequence of setup screens between new users and the content, I moved onboarding
            inside the product. People land on the feed right away and set up their account at their own pace.
          </p>
          <p>The new structure has two parts:</p>
          <ul>
            <li>
              A <strong>“Get started with UNDV” checklist</strong> that floats over the feed: choose your interests,
              set up your profile, build your portfolio and connect your GitHub.
            </li>
            <li>
              A <strong>short guided flow</strong> in three steps (Choose your interests, Build your portfolio, Follow
              our builders), always with an “I’ll do it later” option.
            </li>
          </ul>
          <p>
            Interests shape the feed from the first session. The home filters moved from device tags (Desktop, Tablet,
            Mobile) to content categories such as Fintech, AI Agents, SaaS and Dashboard, which help people scan the
            grid much faster.
          </p>
        </section>

        <div className="ud-pair">
          <Shot src="onboarding-1.webp" w={1709} h={913} alt="Feed with the floating Get started with UNDV checklist" />
          <Shot src="onboarding-2.webp" w={1709} h={913} alt="Onboarding step asking users to pick their interests" />
        </div>

        <section className="ud-text">
          <h2>Key UX Decision 4: Customization with Guardrails</h2>
          <p>
            Letting users customize their profile adds real value: it reinforces how unique each builder is. But the
            original editor offered a very high level of control, and it doesn’t take much for a profile to end up
            looking messy.
          </p>
          <p>
            Using Linktree as a reference, where users can change the look quite a bit but always within certain
            constraints, I redesigned the editor around curated choices:
          </p>
          <ul>
            <li>Four clear tools: <strong>Layout, Order, Colors and Texts</strong>.</li>
            <li>Ready-made layouts, such as Minimal and Split View, instead of free-form structure.</li>
            <li>The profile as a live canvas, with desktop, tablet and mobile previews and a See Live Preview button.</li>
            <li>Undo and redo, with a single primary Save Design action.</li>
          </ul>
          <p>
            The profile itself got a stronger header with a cover image, a larger photo, Follow and Get in Touch
            buttons, social links and project and view counts.
          </p>
        </section>

        <BeforeAfter
          before={{ src: "old-editor.webp", w: 1992, h: 1052, alt: "Original profile editor with many controls in a narrow sidebar" }}
          after={{ src: "editor-2.webp", w: 1600, h: 1024, alt: "Redesigned profile design editor with curated layouts and a live profile canvas" }}
        />

        <section className="ud-text">
          <h2>UI Design</h2>
          <p>
            The visual direction kept what already worked: the dark interface, the orange accent and the
            Instagram-like sidebar. Instead of starting over, I extended it into a more consistent system.
          </p>
          <p>The UI system included reusable patterns for:</p>
          <ul>
            <li>Navigation and the global search bar</li>
            <li>Filter and category chips</li>
            <li>Floating panels and dropdowns</li>
            <li>Project cards and preview frames</li>
            <li>Author cards and profile headers</li>
            <li>Onboarding checklist items and steppers</li>
            <li>Editor tools, layout options and device toggles</li>
          </ul>
          <p>
            The goal was not only to make the product look better, but to make it feel more human, more connected and
            easier to act on.
          </p>
        </section>

        <Shot src="editor-1.webp" w={1600} h={1024} alt="Profile design editor with the tool rail and a full-width profile preview" />

        <section className="ud-text">
          <h2>Results</h2>
          <p>
            The redesign is still being developed, so there are no post-launch analytics yet. For now, the impact
            shows in product clarity and alignment with the team.
          </p>
          <p>The redesign improved the product in several key ways:</p>
          <ul>
            <li>Every project now has a name, an author and clear next actions.</li>
            <li>The author and their work are visible without scrolling.</li>
            <li>Search became a guided discovery tool instead of a single input.</li>
            <li>New users reach the content first and set up their account at their own pace.</li>
            <li>Profile customization became easier to use and harder to break.</li>
            <li>The existing visual language became the base of a reusable design system.</li>
          </ul>
          <p>
            The audit also opened a long-term conversation: a vertical, video-based “For You” feed of projects and
            tutorials, driven by each user’s interests. It’s an ambitious idea, and one of the directions we’re
            exploring next.
          </p>
        </section>

        <section className="ud-text">
          <h2>Reflection</h2>
          <p>
            This project reminded me that a good first touchpoint is about understanding before redesigning.
          </p>
          <p>
            At first glance, UNDV only needed polish. The deeper opportunity was to connect each project to the person
            behind it, because that’s what the mission is about: making people’s work visible, valuable and inspiring.
          </p>
          <p>
            My biggest contribution was turning a strong visual foundation into a more human and guided experience. By
            keeping what worked, questioning what didn’t, and suggesting ways to validate the open questions, I helped
            set a product direction that the team can build on with confidence.
          </p>
        </section>

        <div className="ud-actions">
          <Link className="ud-btn" href="/#work">Back to all projects <span aria-hidden="true">↗</span></Link>
          <Link className="ud-btn ud-btn--primary" href="/cv">Go to my CV <span aria-hidden="true">↗</span></Link>
        </div>
      </main>
    </div>
  );
}
