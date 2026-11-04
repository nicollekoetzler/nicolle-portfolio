/* eslint-disable @next/next/no-img-element -- design exports keep their sizes as plain <img> */
import Link from "next/link";
import ProjectLayout, { type ProjectInfo } from "../components/ProjectAside";
import Reveal from "../case-connector/presentation/Reveal";
import Annotated, { type Note } from "./Annotated";
import LoopDemo from "./LoopDemo";
import "../case-connector/presentation/presentation.css";
import "./artoria-case.css";

const A = "/assets/artoria";

/* hidden for now, kept ready to bring back: the live review demo and the closing block for Orpex */
const SHOW_DEMO = false;
const SHOW_ORPEX_BLOCK = false;

const project: ProjectInfo = {
  href: "/artoria",
  logo: <span className="pa-mark"><img src={`${A}/prumo-icon.svg`} width={48} height={48} alt="" /></span>,
  title: "Prumo",
  tagline: "The AI that helps run a furniture and metalwork factory, from the 3D project to delivery.",
  paragraphs: [],
  details: [
    { term: "My Role", value: "Product Designer" },
    { term: "Technology", value: "ArtorIA" },
    { term: "Platform", value: "Web app" },
    { term: "Status", value: "In development" },
  ],
  contact: true,
  tags: [
    { label: "Product Design", icon: "design" },
    { label: "AI Experience", icon: "spark" },
    { label: "Design System", icon: "layers" },
  ],
};

const facts = [
  { value: "~10,000 m²", label: "first client's factory" },
  { value: "100+", label: "people on the operation" },
  { value: "0", label: "new apps for the factory floor" },
  { value: "Near-daily", label: "feedback cycles with the client" },
];

const people = [
  { who: "Leadership", need: "What's at risk, and does the real cost still fit the budget?" },
  { who: "Purchasing", need: "What do I need to quote, and who's holding up the job?" },
  { who: "Designers", need: "Does the 3D match the 2D, and where is this part?" },
  { who: "Factory floor", need: "How do I report my work without learning a new system?" },
];

const jobsNotes: Note[] = [
  { x: 14, y: 24, title: "Status in plain words", text: "“At risk · glass” tells you what's wrong and where. No code to decode, no chart to read." },
  { x: 64.2, y: 17.6, title: "Risk first, by default", text: "The list sorts itself by what needs attention, so the owner doesn't have to go looking." },
  { x: 83.6, y: 3, title: "Four numbers, no more", text: "Jobs running, deliveries this month, jobs at risk and approved value. The rest is one click away." },
  { x: 57, y: 73.6, title: "Starting a job is one drop", text: "Send the 3D or the drawing and the engine plans the stages for you to review." },
];

const detailNotes: Note[] = [
  { x: 76.8, y: 8.2, title: "3D, 2D or both", text: "The views used to fight for space. Now one switch compares them, and the 3D gets the largest area." },
  { x: 78.6, y: 25.5, title: "One selection, everywhere", text: "Click a part in the model and its row lights up, with size, material and price." },
  { x: 34, y: 78.2, title: "Numbers with context", text: "Each part shows its cost right where you're looking, so nobody has to open a spreadsheet." },
  { x: 15.2, y: 88.5, title: "The job's vital signs", text: "Material yield, area, weight and production days, generated from the model." },
  { x: 98.2, y: 89.3, title: "The budget starts here", text: "The riskiest flow used to live outside the system. Now it's calculated from the 3D and the parts list." },
];

const reportNotes: Note[] = [
  { x: 47.6, y: 46.8, title: "Strangers don't get through", text: "A number the system doesn't know is flagged, and it changes nothing until someone says who it is." },
  { x: 50.3, y: 25.4, title: "Confidence, field by field", text: "Who, which job, which stage. You see what the AI is sure of, not one vague score." },
  { x: 50.1, y: 46, title: "The proof stays attached", text: "The original audio and transcript sit right above the summary. You can always check the source." },
  { x: 71.2, y: 77.4, title: "Preview before it happens", text: "You see exactly what changes on the timeline: 35% to 50%, before anything moves." },
  { x: 67.8, y: 94.7, title: "One click to say yes", text: "Confirming takes a second, editing takes two. Reviewing should never feel like work." },
];

const autonomy = [
  { hears: "A clear note and a small update", does: "Applies it and keeps the proof", who: "AI, and anyone can check it" },
  { hears: "An unsure match or a big change", does: "Drafts the report and waits", who: "A person confirms" },
  { hears: "A number it doesn't know", does: "Flags it and changes nothing", who: "A person identifies it" },
  { hears: "A budget item with no real quote", does: "Tags it “estimated” before approval", who: "A person approves" },
];

const principles = [
  { title: "One screen, one question", text: "How much does it cost, where does it stand, who is late. Everything else is one click away." },
  { title: "AI proposes, people confirm", text: "AI does the heavy lifting. Every important change passes through a person." },
  { title: "Numbers come with context", text: "Each value sits next to its budget, deadline or percentage, so nobody does the math." },
  { title: "Color only means status", text: "Green, yellow and red are never decoration, so they keep their meaning." },
];

const orpexMap = [
  { yours: "Trust Inbox", mine: "Voice reports: a queue of AI proposals, each one settled in a click." },
  { yours: "A reason on every action", mine: "Each report keeps its audio, its transcript and what it will change." },
  { yours: "Verified done, never fake complete", mine: "Confidence per field, and nothing unsure reaches the timeline." },
  { yours: "Cockpit", mine: "Jobs sorted by risk: what needs you, in seconds." },
];

const orpexIdeas = [
  { title: "Show doubt, not just activity", text: "An inbox that says why the agent is unsure, field by field, is faster to clear than one that only says what it did." },
  { title: "Earned autonomy", text: "Let founders widen what an AI worker can do alone, rule by rule, as its track record grows." },
  { title: "The mistake is the product", text: "The moment an agent gets it wrong decides whether people keep trusting it. I'd design that moment first." },
];

/** `orpex` adds the closing block written for Orpex (the /artoria/orpex link) */
export default function ArtoriaCase({ orpex = false }: { orpex?: boolean }) {
  return (
    <ProjectLayout info={project} flush>
      <main className="cp ar">
        <section className="cp-block ar-hero">
          <img className="ar-hero__icon" src={`${A}/prumo-icon.svg`} width={72} height={72} alt="Prumo" />
          <p className="ar-kicker">Prumo · AI for furniture and metalwork factories · Technology by ArtorIA</p>
          <h1>AI proposes.<br />People confirm.</h1>
          <p className="ar-hero__lead">
            How I designed the way a 100-person factory and its AI work together: the floor reports by voice note,
            Prumo drafts the update, and every important change waits for a person’s yes.
          </p>
          <img src={`${A}/reports-v2.webp`} width={3456} height={1700} alt="Prumo voice reports: a WhatsApp voice note, what the AI understood and the change waiting for a person" />
        </section>

        <ul className="cp-block ar-facts">
          {facts.map((f) => <li key={f.label}><strong>{f.value}</strong><span>{f.label}</span></li>)}
        </ul>

        <section className="cp-block ar-split">
          <div>
            <p className="cp-eyebrow">The problem</p>
            <h2>The owner found out about a delay once it was already a loss.</h2>
          </div>
          <div className="ar-split__body">
            <p>
              Every job moves through cutting, metalwork, painting, glass, varnish and assembly, each with different
              people, documents and suppliers. The information lived in three places:
            </p>
            <ul className="ar-places">
              <li>WhatsApp chats</li>
              <li>Spreadsheets</li>
              <li>People’s heads</li>
            </ul>
            <p>
              The founder had a working prototype, but no design system and screens where everything competed for
              attention. And there was one hard constraint: factory workers don’t want a new system.
            </p>
          </div>
        </section>

        <section className="cp-block ar-people">
          <div className="cp-text">
            <p className="cp-eyebrow">Who it serves</p>
            <h2>Four people, four questions</h2>
          </div>
          <ul>
            {people.map((p) => <li key={p.who}><span>{p.who}</span><p>“{p.need}”</p></li>)}
          </ul>
        </section>

        <section className="cp-block ar-chapter">
          <header>
            <span>01</span>
            <div><h2>Where should I look first?</h2><p>The jobs screen answers in seconds. It’s a to-do list for the owner’s attention.</p></div>
          </header>
          <Annotated src={`${A}/jobs-v2.webp`} w={3458} h={1736} alt="Jobs screen with status chips, risk sorting and summary numbers" notes={jobsNotes} />
        </section>

        <section className="cp-block ar-chapter">
          <header>
            <span>02</span>
            <div><h2>What am I building, and what will it cost?</h2><p>One job, one screen: the model, the drawing, the parts and the budget stay together.</p></div>
          </header>
          <Annotated src={`${A}/detail-v2.webp`} w={3456} h={1700} alt="Job detail with the 3D model, 2D drawing, parts list and budget button" notes={detailNotes} />
        </section>

        <section className="cp-block ar-chapter">
          <header>
            <span>03</span>
            <div><h2>What happened on the floor today?</h2><p>Workers keep doing what they already do: they send a WhatsApp voice note. The AI does the rest, and a person has the last word.</p></div>
          </header>
          <Annotated src={`${A}/reports-v2.webp`} w={3456} h={1700} alt="Voice reports with a transcript, the AI summary and the change to the timeline" notes={reportNotes} />
        </section>

        {SHOW_DEMO && (
        <section className="cp-block ar-try">
          <div className="cp-text">
            <p className="cp-eyebrow">Try it</p>
            <h2>You’re the manager now</h2>
            <p>This isn’t a picture: I rebuilt the review flow in code. Three voice notes just came in. See what Prumo understood, and decide.</p>
          </div>
          <LoopDemo />
        </section>
        )}

        <section className="cp-block ar-rules">
          <div className="cp-text">
            <p className="cp-eyebrow">The real design problem</p>
            <h2>How much should the AI do alone?</h2>
            <p>The hardest decision wasn’t a screen. It was drawing the line between what the AI can do by itself and what needs a person.</p>
          </div>
          <div className="ar-table" role="table" aria-label="What the AI does in each situation">
            <div className="ar-table__head" role="row"><span role="columnheader">When the AI gets</span><span role="columnheader">It</span><span role="columnheader">Who decides</span></div>
            {autonomy.map((a) => (
              <div key={a.hears} role="row"><span role="cell">{a.hears}</span><span role="cell">{a.does}</span><span role="cell">{a.who}</span></div>
            ))}
          </div>
        </section>

        <section className="cp-block ar-principles">
          <div className="cp-text">
            <p className="cp-eyebrow">Principles</p>
            <h2>Four rules behind every screen</h2>
          </div>
          <ol>
            {principles.map((p, i) => <li key={p.title}><span>{i + 1}</span><strong>{p.title}</strong><p>{p.text}</p></li>)}
          </ol>
        </section>

        <section className="cp-block ar-split">
          <div>
            <p className="cp-eyebrow">Where it stands</p>
            <h2>From loose features to a product that tells the story of every job.</h2>
          </div>
          <div className="ar-split__body">
            <p>
              Prumo is still in development, so there are no usage numbers yet, and I didn’t have direct access to
              users: I worked from the founder, the client’s profile and the existing prototypes, with feedback almost
              every day.
            </p>
            <p>
              What I delivered: a continuous flow from the 3D project to delivery, the budget brought inside the job, a
              way to feed the system that doesn’t change the floor’s routine, and a design system the founder now uses
              to code the next screens.
            </p>
            <p>The lesson I took with me: in AI products, trust is a design decision. It has to be drawn on the screen.</p>
          </div>
        </section>

        {orpex && SHOW_ORPEX_BLOCK && (
          <section className="cp-block ar-orpex">
            <div className="cp-text">
              <p className="ar-kicker">For the Orpex team</p>
              <h2>Same idea, different floor</h2>
              <p>“AI workers execute. You orchestrate.” When I read that, I recognized the problem I’ve been working on. Here’s how your ideas line up with what I’ve designed.</p>
            </div>
            <dl className="ar-map">
              {orpexMap.map((m) => <div key={m.yours}><dt>{m.yours}</dt><dd>{m.mine}</dd></div>)}
            </dl>
            <div className="cp-text">
              <h3>Three things I’d love to explore with you</h3>
            </div>
            <ul className="ar-ideas">
              {orpexIdeas.map((i) => <li key={i.title}><strong>{i.title}</strong><p>{i.text}</p></li>)}
            </ul>
          </section>
        )}

        <section className="cp-block ar-end">
          <h2>{orpex ? "Let’s build the next one together." : "Want to see more?"}</h2>
          <div>
            <Link className="cp-cta__btn" href="/contact">
              <span className="cp-cta__icon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" /></svg></span>
              Get in touch with me
            </Link>
            <Link className="cp-cta__btn cp-cta__btn--ghost" href="/#work">
              <span className="cp-cta__icon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" /></svg></span>
              See other projects
            </Link>
          </div>
        </section>
        <Reveal />
      </main>
    </ProjectLayout>
  );
}
