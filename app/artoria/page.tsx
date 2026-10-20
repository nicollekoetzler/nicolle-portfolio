/* eslint-disable @next/next/no-img-element -- design exports keep their sizes as plain <img> */
import type { Metadata } from "next";
import Link from "next/link";
import ProjectLayout, { type ProjectInfo } from "../components/ProjectAside";
import "../case-connector/case-connector.css";
import "../undv/undv.css";
import "./artoria.css";

/* Translated from Nicolle's case draft "ArtorIA Marcenaria: case de Product Design" */
export const metadata: Metadata = {
  title: "ArtorIA · Case Study · Nicolle Koetzler",
  description:
    "Case study: designing ArtorIA, an AI-powered management platform for furniture and metalwork factories, from the 3D project to delivery.",
  // still being refined: reachable by direct link only, kept out of search engines
  robots: { index: false, follow: false },
};

const A = "/assets/artoria";

type Img = { src: string; w: number; h: number; alt: string };
const img = {
  project: { src: "project.webp", w: 1812, h: 934, alt: "Job detail with the 3D model, the 2D drawing and the parts list side by side" },
  projectBefore: { src: "project-before.webp", w: 1728, h: 915, alt: "Original job screen with the 3D view, parts and budget competing for space" },
  jobs: { src: "jobs.webp", w: 1729, h: 868, alt: "Jobs list with status cards, current stage and progress" },
  timeline: { src: "timeline.webp", w: 1812, h: 934, alt: "Job timeline with every stage, the selected stage panel and voice reports" },
  timelineBefore: { src: "timeline-before.webp", w: 1728, h: 856, alt: "Original timeline with stages and a single large 3D view" },
  team: { src: "team.webp", w: 1728, h: 850, alt: "Team by department, with a profile, AI summary and feedback" },
} satisfies Record<string, Img>;

const project: ProjectInfo = {
  kicker: "ArtorIA · 2026",
  logo: <span className="pa-mark">A</span>,
  title: "ArtorIA",
  tagline: "An AI-powered management platform for furniture and metalwork factories, from the 3D project to delivery.",
  paragraphs: [
    "The founder hired me to design the core screens of the product for its first client: a factory of about 10,000 m² with more than 100 employees.",
    "The screens I designed became the foundation of the platform’s design system.",
  ],
  details: [
    { term: "Role", value: "Product Designer" },
    { term: "Client", value: ["ArtorIA, for a furniture", "and metalwork factory"] },
    { term: "Platform", value: "Web app" },
    { term: "Year", value: "2026" },
    { term: "Deliverables", value: ["7 screens", "Modals", "Design system", "Type guide"] },
  ],
};

function Shot({ i, label }: { i: Img; label?: string }) {
  return (
    <figure className="ud-shot">
      {label && <figcaption className="ud-shot__label">{label}</figcaption>}
      <img src={`${A}/${i.src}`} width={i.w} height={i.h} alt={i.alt} loading="lazy" />
    </figure>
  );
}

function BeforeAfter({ before, after }: { before: Img; after: Img }) {
  return (
    <div className="ud-ba">
      <Shot i={before} label="Before" />
      <Shot i={after} label="After" />
    </div>
  );
}

export default function ArtoriaCaseStudy() {
  return (
    <ProjectLayout info={project}>
    <div className="cs ud ar">
      <header className="cs-bar">
        <Link href="/" className="cs-bar__item">ArtorIA</Link>
        <span className="cs-bar__item cs-bar__center">Case Study</span>
        <Link href="/" className="cs-bar__item cs-bar__right">Nicolle Koetzler</Link>
      </header>

      <main className="ud-main">
        <div className="ud-meta">
          <p>Management platform for furniture &amp; metalwork factories</p>
          <p>Web app · 2026</p>
        </div>
        <img className="ud-hero" src={`${A}/${img.project.src}`} width={img.project.w} height={img.project.h} alt={img.project.alt} />

        <section className="ud-text">
          <h1>Turning a Factory’s Operation into a 360° View of Every Job</h1>
          <p>
            ArtorIA is an AI-powered platform for furniture and metalwork factories. It brings the 3D project, the
            budget, the job’s execution, the team and the suppliers together in one place. Its first client is a
            factory of about 10,000 m² with more than 100 employees, producing custom furniture and metal structures.
          </p>
          <p>
            When I joined, ArtorIA had a working prototype, but no design system and cramped screens where everything
            competed for attention. The founder hired me to design the core screens of the product: the jobs list, the
            job detail with its budget, the timeline, voice logging, team and suppliers. These screens became the
            foundation of the platform’s design system.
          </p>
        </section>

        <section className="ud-text">
          <h2>The Challenge</h2>
          <p className="ud-lead">The biggest challenge was fragmentation.</p>
          <p>
            In the factory, every job goes through fixed phases (planning and budget) and phases that change from
            project to project: outsourced cutting, metalwork, painting, glass, varnish and assembly. Each phase has
            different people, documents and suppliers. Information was scattered across WhatsApp chats, spreadsheets
            and people’s heads, and the owner only found out about a delay once it had already become a loss.
          </p>
          <p>
            The existing prototype had the right features, but the 3D, the 2D and the parts list fought for the same
            space, there were redundant selectors, and the budget, the flow with the highest cost and risk, was put
            together outside the system. On top of that, factory-floor workers resist new systems, so the product had
            to be fed without asking them to open a screen.
          </p>
          <p className="ud-lead">The core question became:</p>
          <p className="ud-question">
            How might we turn a complex industrial operation into a clear, reliable view of every job, from the 3D
            project to delivery, without changing the routine of the people on the factory floor?
          </p>
        </section>

        <section className="ud-text">
          <h2>Goals</h2>
          <p>The project had four main goals:</p>
          <ul>
            <li><strong>Bring clarity:</strong> each screen answers one of the manager’s questions (how much does it cost, where does it stand, who is running late) and everything else is one click away.</li>
            <li><strong>Protect the budget:</strong> bring the calculation inside the job, with the cutting sheet validated and estimated prices flagged before approval.</li>
            <li><strong>Give a 360° view of the job:</strong> follow every stage with owners, documents and budgeted versus actual cost, always up to date.</li>
            <li><strong>Create a scalable foundation:</strong> a design system the founder could code and extend to the next screens.</li>
          </ul>
        </section>

        <section className="ud-text">
          <h2>Strategy</h2>
          <p>
            I didn’t have access to direct user research or usage metrics. I used what was available as input: the
            kickoff meeting with the founder, the two existing prototypes (the old app and a redesign in progress),
            the client’s profile and best practices from SaaS management products.
          </p>
          <p>I started by mapping who uses the product and what each person needs to know or do:</p>
          <dl className="ar-table">
            <div><dt>Leadership</dt><dd>See each job’s progress in seconds, what’s at risk and whether the actual cost fits the budget</dd></div>
            <div><dt>Purchasing &amp; budgets</dt><dd>Build and validate the budget, chase and quote suppliers without leaving the system</dd></div>
            <div><dt>Designers</dt><dd>Check the 3D model, compare it with the 2D and find a part quickly</dd></div>
            <div><dt>Factory workers</dt><dd>Report their work without learning a new system</dd></div>
          </dl>
          <p>From there, I defined five principles that guided every screen:</p>
          <ol>
            <li><strong>One screen, one main question.</strong> Everything else is one click away, in modals.</li>
            <li><strong>Minimalism.</strong> Few indicators at the top and nothing decorative; transcripts, part drawings and supplier data open in modals.</li>
            <li><strong>The AI proposes, the person confirms.</strong> The AI builds the budget, reads the voice notes and suggests suppliers, but every important change goes through a confirmation button.</li>
            <li><strong>Numbers always come with context.</strong> Every value sits next to the budget, the deadline or the percentage, so managers don’t have to do the math.</li>
            <li><strong>Color with meaning.</strong> Green, yellow and red only appear for status; the white highlight marks the main action.</li>
          </ol>
          <p>
            This helped turn the product from a set of features into a continuous flow that follows the job from the
            3D project to delivery.
          </p>
        </section>

        <section className="ud-text">
          <h2>Process</h2>
          <p>The project ran in short cycles, with deliveries and client feedback almost every day:</p>
          <ol>
            <li><strong>Kickoff and immersion.</strong> A conversation with the founder to understand the factory, the client and the pain points. I left with a prioritized list of screens: the budget as the most critical flow and the home page as low priority.</li>
            <li><strong>Analysis of the existing prototypes.</strong> I mapped what worked and what got in the way: cramped 3D and 2D views, a redundant project/catalog selector and the budget living outside the system.</li>
            <li><strong>UX study and user flows.</strong> I documented the problem, goals, decisions and flow of each screen, linking them into a single journey: from the 3D project to the budget, from the budget to execution, and from execution to suppliers.</li>
            <li><strong>First high-fidelity screens.</strong> The job detail with the budget modal, the timeline and suppliers, all using the same sample job so the flow could be read end to end.</li>
            <li><strong>Iteration with the client.</strong> Based on feedback, I simplified the layouts and moved details into modals, reduced the colors in the budget, and split the budget stage of the timeline into two tabs (Values and Overview).</li>
            <li><strong>Choosing the accent color.</strong> Purple was the color of the technology behind the product, not the client’s brand. I presented two alternatives applied to the real screens (white and orange), and the decision was white.</li>
            <li><strong>Complementary screens.</strong> The jobs list, voice logging (which became its own screen) and team.</li>
            <li><strong>Design system.</strong> I documented colors, typography, spacing, radius and components on a compact visual board to serve as the base for development.</li>
          </ol>
        </section>

        <section className="ud-text">
          <h2>Solution</h2>
          <p>
            The solution follows the job from start to finish: the jobs list shows what needs attention, the job detail
            generates the budget, the timeline tracks execution, voice logging feeds everything from the factory floor,
            and the suppliers and team screens take care of the people who make the job happen.
          </p>
        </section>

        <section className="ud-text">
          <h2>Key UX Decision 1: A Jobs List That Shows Risk First</h2>
          <p>
            Each job became a card with the part’s drawing, the client, the current stage and a progress indicator per
            stage. The status sits at the top of the card in plain words (“At risk · glass”, “Attention · MDF arrives
            today”), and the default sort is “risk first”. The owner opens the system and knows within seconds where to
            act.
          </p>
        </section>
        <Shot i={img.jobs} />

        <section className="ud-text">
          <h2>Key UX Decision 2: 3D, 2D and Parts Side by Side, and the Budget in a Modal</h2>
          <p>
            In the job detail, the 3D got the largest area and the parts stay visible on the right. A 3D / 3D + 2D / 2D
            switch lets people compare the views and close the 2D when it gets in the way. Clicking a part in the 3D
            highlights its row in the list and shows its size, material and price. I removed the project/catalog
            selector, which was redundant.
          </p>
          <p>
            The budget opens in a modal, so people never lose the job’s context. Inside it, validation comes before the
            values, and items without a quote are tagged “estimated”. The summary stays fixed on the right, with the
            margin on a slider that recalculates the total instantly.
          </p>
        </section>
        <BeforeAfter before={img.projectBefore} after={img.project} />

        <section className="ud-text">
          <h2>Key UX Decision 3: A 360° Timeline of the Job</h2>
          <p>
            The timeline shows every stage at the top, with owner, deadline and progress. Choosing a stage opens a
            panel with its progress, the actual cost against the budget with the remaining balance and the days left,
            plus tabs for owners, documents, materials and suppliers. A “What happened” history tells the stage’s
            story in plain language, marking what came in by voice.
          </p>
          <p>In the budget stage, the approved total stays fixed at the top and the content is split into two tabs: Values and Overview.</p>
        </section>
        <BeforeAfter before={img.timelineBefore} after={img.timeline} />

        <section className="ud-text">
          <h2>Key UX Decision 4: Workers Just Send a Voice Note</h2>
          <p>
            So the product doesn’t depend on workers using a new system, they send voice notes to a WhatsApp number
            that only receives messages. The AI recognizes the person by their phone number, identifies the job and
            the stage, then transcribes and summarizes. When the AI is unsure, or the change is big, the note waits for
            review and only updates the timeline when someone clicks <strong>Apply to timeline</strong>.
          </p>
          <p>
            At first, the reports lived only inside the timeline. With the client’s feedback, they got their own screen
            for the whole factory, and the timeline now shows only the current stage’s notes.
          </p>
        </section>

        <section className="ud-text">
          <h2>Key UX Decision 5: Suppliers and Team Answer “Who’s Holding Up the Job?”</h2>
          <p>
            In suppliers, the table shows active jobs, open balance, punctuality and status in plain words (“No reply
            for 6 days”). When a supplier stalls, the AI suggests an alternative with a better track record and a
            shortcut to request a quote.
          </p>
          <p>
            In team, people appear by department and hierarchy, with their current job and their latest voice note.
            The profile brings together feedback, jobs and documents, and the AI summarizes each person’s month from
            their voice reports.
          </p>
        </section>
        <Shot i={img.team} />

        <section className="ud-text">
          <h2>UI Design &amp; Design System</h2>
          <p>
            The visual direction had to feel reliable in an industrial setting without feeling cold. I used a dark
            theme with gray panels, clear typography and a single white highlight for the main action. Green, yellow
            and red are reserved for status. The side menu collapses to give the content the full width.
          </p>
          <p>
            The design system documents colors, typography, spacing, radius and reusable patterns: job cards, stages
            with progress, status chips, tables, tabs with counters, modals, AI blocks and an audio player.
          </p>
        </section>

        <section className="ud-text">
          <h2>Results</h2>
          <p>
            ArtorIA is still in development, so there are no post-launch usage metrics yet. The impact was measured by
            the product’s clarity, the alignment with the client and the foundation left ready for development.
          </p>
          <p>The project delivered:</p>
          <ul>
            <li>A continuous flow from the 3D project to delivery, instead of isolated screens.</li>
            <li>The budget, the flow with the highest financial risk, inside the job, with cutting-sheet validation and an alert for estimated prices before approval.</li>
            <li>The 360° view the owner asked for: progress, risk and budgeted versus actual cost for every stage.</li>
            <li>A way to feed the system that doesn’t change the factory floor’s routine: a WhatsApp voice note.</li>
            <li>A design system that became the platform’s visual foundation, which the founder uses to code the next screens.</li>
          </ul>
        </section>

        <section className="ud-text">
          <h2>Reflection</h2>
          <p>
            This project taught me that, in complex products, structure comes before visuals. ArtorIA looked like a
            screen redesign, but the real challenge was organizing an entire operation into a journey a manager can
            understand at a glance.
          </p>
          <p>
            My biggest contribution was turning loose features into a product that tells the story of every job,
            keeping AI as support and the decisions in people’s hands.
          </p>
        </section>

        <div className="ud-actions">
          <Link className="ud-btn" href="/#work">Back to all projects <span aria-hidden="true">↗</span></Link>
          <Link className="ud-btn ud-btn--primary" href="/cv">Go to my CV <span aria-hidden="true">↗</span></Link>
        </div>
      </main>
    </div>
    </ProjectLayout>
  );
}
