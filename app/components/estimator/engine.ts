/* Project Discovery & Budget Estimator: the shared brain.
   Questions, how they adapt to earlier answers, the local (no-AI) reading of a project description and the budget
   math all live here, so the browser and the API route (app/api/estimator) agree on every number.
   Prices are in PRICING below: tune them there and the whole flow follows. */

export type ProjectType = "website" | "webapp" | "mobile" | "dashboard" | "ecommerce" | "designsystem" | "audit" | "unsure";

export type Answers = {
  description: string;
  projectType?: ProjectType;
  stage?: string;
  objectives: string[];
  industry?: string;
  challenges: string;
  services: string[];
  features: string[];
  followupQuestion: string;
  followupAnswer: string;
  stack?: string;
  integrations: string[];
  timeline?: string;
  priority?: string;
  budget?: string;
  name: string;
  email: string;
  company: string;
  notes: string;
};

export const emptyAnswers: Answers = {
  description: "",
  objectives: [],
  challenges: "",
  services: [],
  features: [],
  followupQuestion: "",
  followupAnswer: "",
  integrations: [],
  name: "",
  email: "",
  company: "",
  notes: "",
};

export type Option = { id: string; label: string; hint?: string; glyph?: string };

/* ---------- Catalog ---------- */

export const PROJECT_TYPES: (Option & { id: ProjectType })[] = [
  { id: "website", label: "Website", hint: "Marketing site, landing pages, firm or brand site", glyph: "◐" },
  { id: "webapp", label: "Web app / SaaS", hint: "A product people sign in to and use", glyph: "◇" },
  { id: "mobile", label: "Mobile app", hint: "iOS and Android", glyph: "▢" },
  { id: "dashboard", label: "Dashboard / internal tool", hint: "Data, reporting, ops and admin", glyph: "▥" },
  { id: "ecommerce", label: "E-commerce", hint: "Catalog, checkout, subscriptions", glyph: "◈" },
  { id: "designsystem", label: "Design system", hint: "Tokens, components, documentation", glyph: "▦" },
  { id: "audit", label: "UX audit / redesign", hint: "Find what’s holding an existing product back", glyph: "◎" },
  { id: "unsure", label: "Not sure yet", hint: "Let’s figure out the right shape together", glyph: "?" },
];

export const STAGES: Option[] = [
  { id: "idea", label: "Just an idea", hint: "Needs discovery and definition" },
  { id: "defined", label: "Defined, not designed", hint: "Requirements or a brief exist" },
  { id: "designed", label: "Designs ready", hint: "Figma files to build from" },
  { id: "existing", label: "Live product to improve", hint: "It works, but it could work better" },
  { id: "rebuild", label: "Rebuild from scratch", hint: "The current version is holding you back" },
];

export const OBJECTIVES: Option[] = [
  { id: "launch", label: "Launch a new product" },
  { id: "leads", label: "Generate more leads" },
  { id: "conversion", label: "Increase conversions" },
  { id: "usability", label: "Improve usability" },
  { id: "brand", label: "Modernize the brand" },
  { id: "efficiency", label: "Save the team time" },
  { id: "scale", label: "Scale to more users" },
  { id: "funding", label: "Show investors a demo" },
  { id: "retention", label: "Keep users coming back" },
];

export const INDUSTRIES: Option[] = [
  { id: "legal", label: "Legal" },
  { id: "saas", label: "SaaS / Tech" },
  { id: "health", label: "Health" },
  { id: "finance", label: "Finance" },
  { id: "commerce", label: "Retail / E-commerce" },
  { id: "education", label: "Education" },
  { id: "realestate", label: "Real estate" },
  { id: "services", label: "Professional services" },
  { id: "other", label: "Something else" },
];

export const SERVICES: Option[] = [
  { id: "strategy", label: "Product strategy", hint: "Discovery workshops, scope, roadmap" },
  { id: "research", label: "UX research", hint: "Interviews, testing, analytics" },
  { id: "ui", label: "UX/UI design", hint: "Flows, wireframes, high-fidelity screens" },
  { id: "system", label: "Design system", hint: "Reusable components and tokens" },
  { id: "frontend", label: "Front-end development", hint: "React, Next.js, Tailwind" },
  { id: "fullstack", label: "Full-stack development", hint: "APIs, database, auth, hosting" },
  { id: "branding", label: "Branding", hint: "Logo, identity, visual language" },
  { id: "content", label: "Content & copy", hint: "Messaging and page copy" },
  { id: "seo", label: "SEO & performance", hint: "Technical SEO, Core Web Vitals" },
  { id: "support", label: "Ongoing support", hint: "Monthly improvements after launch" },
];

type Feature = Option & { cost: [number, number]; weeks: number; types: ProjectType[] };
const ALL: ProjectType[] = ["website", "webapp", "mobile", "dashboard", "ecommerce", "unsure"];

export const FEATURES: Feature[] = [
  // product features
  { id: "auth", label: "Accounts & sign-in", cost: [1500, 3000], weeks: 1, types: ["webapp", "mobile", "dashboard", "ecommerce", "unsure"] },
  { id: "roles", label: "Roles & permissions", cost: [1500, 3500], weeks: 1, types: ["webapp", "dashboard", "unsure"] },
  { id: "payments", label: "Payments & billing", cost: [2000, 4500], weeks: 1.5, types: ["webapp", "mobile", "ecommerce", "unsure"] },
  { id: "dashboards", label: "Dashboards & reporting", cost: [2500, 6000], weeks: 2, types: ["webapp", "dashboard", "mobile", "unsure"] },
  { id: "admin", label: "Admin panel", cost: [2000, 4500], weeks: 1.5, types: ["webapp", "mobile", "ecommerce", "dashboard", "unsure"] },
  { id: "notifications", label: "Email & push notifications", cost: [1000, 2500], weeks: 0.5, types: ["webapp", "mobile", "dashboard", "ecommerce", "unsure"] },
  { id: "uploads", label: "File & document uploads", cost: [1000, 2500], weeks: 0.5, types: ["webapp", "mobile", "dashboard", "unsure"] },
  { id: "realtime", label: "Real-time / chat", cost: [2500, 5500], weeks: 1.5, types: ["webapp", "mobile", "dashboard", "unsure"] },
  { id: "ai", label: "AI features", hint: "Assistants, summaries, smart search", cost: [3000, 8000], weeks: 2, types: ALL },
  { id: "offline", label: "Offline mode", cost: [2500, 5000], weeks: 1.5, types: ["mobile"] },
  { id: "appstore", label: "App Store & Play release", cost: [1000, 2000], weeks: 1, types: ["mobile"] },
  // website and store features
  { id: "cms", label: "Editable content (CMS)", cost: [1500, 3500], weeks: 1, types: ["website", "ecommerce", "unsure"] },
  { id: "blog", label: "Blog / resources", cost: [800, 2000], weeks: 0.5, types: ["website", "ecommerce"] },
  { id: "forms", label: "Lead capture & intake forms", cost: [800, 2000], weeks: 0.5, types: ["website", "webapp", "unsure"] },
  { id: "booking", label: "Booking & scheduling", cost: [1200, 3000], weeks: 1, types: ["website", "webapp", "mobile"] },
  { id: "multilingual", label: "Multiple languages", cost: [1200, 3000], weeks: 1, types: ALL },
  { id: "motion", label: "Rich animation & interactions", cost: [1500, 4000], weeks: 1, types: ["website", "webapp", "ecommerce"] },
  { id: "catalog", label: "Product catalog & search", cost: [2000, 4000], weeks: 1, types: ["ecommerce"] },
  { id: "subscriptions", label: "Subscriptions", cost: [1500, 3500], weeks: 1, types: ["ecommerce", "webapp"] },
  // design system scope
  { id: "tokens", label: "Design tokens", cost: [1200, 2500], weeks: 1, types: ["designsystem"] },
  { id: "figma-lib", label: "Figma component library", cost: [3000, 7000], weeks: 2, types: ["designsystem"] },
  { id: "react-lib", label: "Coded React components", cost: [5000, 12000], weeks: 3, types: ["designsystem"] },
  { id: "docs", label: "Documentation site", cost: [2000, 4500], weeks: 1, types: ["designsystem"] },
  { id: "theming", label: "Theming & dark mode", cost: [1200, 3000], weeks: 1, types: ["designsystem"] },
  // audit scope
  { id: "heuristic", label: "Heuristic evaluation", cost: [800, 1800], weeks: 0.5, types: ["audit"] },
  { id: "a11y", label: "Accessibility review", cost: [1000, 2500], weeks: 0.5, types: ["audit", "designsystem"] },
  { id: "analytics", label: "Analytics & funnel review", cost: [1000, 2500], weeks: 0.5, types: ["audit"] },
  { id: "testing", label: "Usability testing", cost: [2000, 4500], weeks: 1, types: ["audit"] },
  { id: "competitive", label: "Competitive analysis", cost: [800, 2000], weeks: 0.5, types: ["audit"] },
  { id: "concepts", label: "Redesign concepts", cost: [2500, 6000], weeks: 1.5, types: ["audit"] },
];

export const STACKS: Option[] = [
  { id: "none", label: "No preference", hint: "Recommend what fits best" },
  { id: "next", label: "React / Next.js", hint: "Modern, fast, SEO-friendly" },
  { id: "existing", label: "Our existing stack", hint: "Work inside a current codebase" },
  { id: "nocode", label: "No-code / CMS platform", hint: "Webflow, WordPress, Shopify" },
];

export const INTEGRATIONS: Option[] = [
  { id: "stripe", label: "Stripe" },
  { id: "crm", label: "CRM (HubSpot, Salesforce)" },
  { id: "clio", label: "Clio / legal practice tools" },
  { id: "google", label: "Google Workspace" },
  { id: "analytics", label: "Analytics (GA4, Clarity)" },
  { id: "llm", label: "OpenAI / Claude" },
  { id: "database", label: "Supabase / Postgres" },
  { id: "automation", label: "Zapier / Make" },
  { id: "calendar", label: "Calendly / Cal.com" },
  { id: "custom-api", label: "A custom or internal API" },
];

export const TIMELINES: Option[] = [
  { id: "asap", label: "ASAP", hint: "Under a month" },
  { id: "1-3", label: "1–3 months" },
  { id: "3-6", label: "3–6 months" },
  { id: "flexible", label: "Flexible", hint: "Quality over speed" },
];

export const PRIORITIES: Option[] = [
  { id: "speed", label: "Speed to market", hint: "Ship something real, fast" },
  { id: "quality", label: "Craft & polish", hint: "Every detail considered" },
  { id: "budget", label: "Staying on budget", hint: "Do the essentials well" },
  { id: "scale", label: "Room to grow", hint: "Built to scale later" },
];

export const BUDGETS: (Option & { range: [number, number] })[] = [
  { id: "lt5", label: "Under $5k", range: [0, 5000] },
  { id: "5-15", label: "$5k – $15k", range: [5000, 15000] },
  { id: "15-30", label: "$15k – $30k", range: [15000, 30000] },
  { id: "30-60", label: "$30k – $60k", range: [30000, 60000] },
  { id: "60plus", label: "$60k+", range: [60000, 150000] },
  { id: "unsure", label: "Not sure yet", hint: "Use the estimate as a guide", range: [0, 0] },
];

/* ---------- Pricing (USD) ----------
   base: the core of each project type with design and build included, [low, high, weeksLow, weeksHigh] */
export const PRICING = {
  base: {
    website: [3500, 8000, 3, 6],
    webapp: [14000, 32000, 8, 14],
    mobile: [16000, 36000, 9, 16],
    dashboard: [9000, 22000, 6, 10],
    ecommerce: [8000, 18000, 5, 9],
    designsystem: [3000, 7000, 2, 4],
    audit: [2000, 4000, 1, 2],
    unsure: [6000, 16000, 4, 9],
  } as Record<ProjectType, [number, number, number, number]>,
  stage: { idea: 1.12, defined: 1, designed: 0.72, existing: 0.85, rebuild: 1 } as Record<string, number>,
  services: {
    strategy: [1500, 3500],
    research: [2000, 5000],
    branding: [2500, 6500],
    content: [1000, 3000],
    seo: [800, 2500],
  } as Record<string, [number, number]>,
  integration: [600, 1800] as [number, number],
  designOnly: 0.45,
  devOnly: 0.7,
  rush: 1.2,
  polish: 1.1,
  existingStack: 1.06,
  retainerFrom: 1500,
};

/* ---------- Helpers ---------- */

export const label = (list: Option[], id?: string) => list.find((o) => o.id === id)?.label ?? "";
export const labels = (list: Option[], ids: string[]) => ids.map((id) => label(list, id)).filter(Boolean);
export const typeLabel = (t?: ProjectType) => label(PROJECT_TYPES, t) || "project";
/* how the type reads inside a sentence: "a web app", "an online store" */
const NOUNS: Record<ProjectType, string> = {
  website: "website",
  webapp: "web app",
  mobile: "mobile app",
  dashboard: "dashboard",
  ecommerce: "online store",
  designsystem: "design system",
  audit: "UX audit",
  unsure: "project",
};
/* how the industry reads inside a sentence: "in the legal space" */
const INDUSTRY_PHRASE: Record<string, string> = {
  legal: "legal", saas: "tech", health: "health", finance: "finance", commerce: "retail",
  education: "education", realestate: "real estate", services: "professional services",
};
export const industryPhrase = (id?: string) => (id && INDUSTRY_PHRASE[id] ? `the ${INDUSTRY_PHRASE[id]} space` : "");
export const typeNoun = (t?: ProjectType) => NOUNS[t ?? "unsure"];
export const withArticle = (w: string) => `${/^[aeio]|^un/i.test(w) ? "an" : "a"} ${w}`;

export const featuresFor = (t?: ProjectType) => FEATURES.filter((f) => f.types.includes(t ?? "unsure"));

/* services that mean code gets written */
export const buildsCode = (a: Answers) =>
  a.services.some((s) => s === "frontend" || s === "fullstack") || (a.services.length === 0 && a.projectType !== "audit");

/* sensible services for each type, used to pre-select the services step */
export const DEFAULT_SERVICES: Record<ProjectType, string[]> = {
  website: ["ui", "frontend", "seo"],
  webapp: ["strategy", "ui", "fullstack"],
  mobile: ["strategy", "ui", "fullstack"],
  dashboard: ["ui", "fullstack"],
  ecommerce: ["ui", "frontend", "seo"],
  designsystem: ["system", "frontend"],
  audit: ["research", "ui"],
  unsure: ["strategy", "ui"],
};

/* ---------- Reading a free-text description (local fallback for the AI) ---------- */

export type Analysis = {
  projectType?: ProjectType;
  industry?: string;
  services: string[];
  features: string[];
  objectives: string[];
  insight: string;
};

const has = (text: string, re: RegExp) => re.test(text);

export function analyzeLocally(description: string): Analysis {
  const t = description.toLowerCase();
  let projectType: ProjectType | undefined;
  if (has(t, /design system|component library|ui kit|tokens/)) projectType = "designsystem";
  else if (has(t, /\baudit\b|usability review|ux review|why (users|people) (leave|drop)/)) projectType = "audit";
  else if (has(t, /\b(ios|android|app store|mobile app|play store)\b/)) projectType = "mobile";
  else if (has(t, /e-?commerce|online store|shopify|checkout|sell (our|my)? ?products|\bshop\b/)) projectType = "ecommerce";
  else if (has(t, /dashboard|internal tool|back ?office|admin tool|reporting|kpi|metrics/)) projectType = "dashboard";
  else if (has(t, /saas|platform|web app|webapp|portal|marketplace|sign ?up|log ?in|subscription|mvp/)) projectType = "webapp";
  else if (has(t, /website|landing|site\b|homepage|marketing|portfolio|redesign/)) projectType = "website";

  let industry: string | undefined;
  if (has(t, /\blaw\b|legal|attorney|lawyer|law firm|litigation|paralegal|case management/)) industry = "legal";
  else if (has(t, /health|clinic|patient|medical|therap|wellness/)) industry = "health";
  else if (has(t, /fintech|finance|bank|invest|accounting|insurance|payments? platform/)) industry = "finance";
  else if (has(t, /school|course|student|education|learning|edtech/)) industry = "education";
  else if (has(t, /real estate|property|realtor|rental/)) industry = "realestate";
  else if (has(t, /store|retail|brand|products|e-?commerce/)) industry = "commerce";
  else if (has(t, /saas|startup|b2b|software/)) industry = "saas";

  const features: string[] = [];
  const add = (id: string, re: RegExp) => has(t, re) && features.push(id);
  add("auth", /log ?in|sign ?(up|in)|accounts?|members?|users? can/);
  add("roles", /roles?|permission|admins?|teams?\b/);
  add("payments", /pay(ment)?s?|stripe|billing|invoice|checkout/);
  add("subscriptions", /subscription|recurring|membership/);
  add("dashboards", /dashboard|analytics|report|charts?|kpi/);
  add("ai", /\bai\b|gpt|claude|llm|chat ?bot|assistant|machine learning|automat/);
  add("booking", /book(ing)?|schedul|appointment|calendar/);
  add("realtime", /real-?time|live|chat\b|messag/);
  add("uploads", /upload|documents?|files?|pdf/);
  add("notifications", /notif|reminder|alerts?|emails? (users|clients)/);
  add("cms", /cms|edit (the )?content|update (pages|content) (myself|ourselves)|blog/);
  add("multilingual", /multilingual|bilingual|languages|portuguese|spanish|translation/);
  add("forms", /lead|intake|contact form|quote form|forms?\b/);
  add("offline", /offline/);
  const typeFeatures = new Set(featuresFor(projectType).map((f) => f.id));
  const fitting = [...new Set(features)].filter((f) => typeFeatures.has(f));

  const objectives: string[] = [];
  if (has(t, /lead|clients|customers|grow/)) objectives.push("leads");
  if (has(t, /convert|conversion|sales|sign-?ups/)) objectives.push("conversion");
  if (has(t, /launch|new product|mvp|from scratch/)) objectives.push("launch");
  if (has(t, /outdated|old|modern|brand|look/)) objectives.push("brand");
  if (has(t, /manual|time|spreadsheet|automate|efficien/)) objectives.push("efficiency");
  if (has(t, /investor|pitch|funding|demo/)) objectives.push("funding");
  if (has(t, /confus|hard to use|usability|users? struggle/)) objectives.push("usability");

  const services = projectType ? DEFAULT_SERVICES[projectType] : [];
  const bits = [
    projectType ? withArticle(typeNoun(projectType)) : "a digital product",
    industry ? `in ${industryPhrase(industry)}` : "",
    fitting.length ? `with ${listJoin(labels(FEATURES, fitting.slice(0, 3)).map((l) => l.toLowerCase()))}` : "",
  ].filter(Boolean);
  const insight = projectType || industry || fitting.length
    ? `Sounds like ${bits.join(" ")}. I’ve pre-filled what I could; adjust anything that’s off.`
    : "Thanks. Let’s shape it step by step; I’ll adapt the questions as we go.";

  return { projectType, industry, services, features: fitting, objectives: [...new Set(objectives)].slice(0, 3), insight };
}

export function listJoin(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/* ---------- The tailored follow-up question (local fallback for the AI) ---------- */

export function followupLocally(a: Answers): { question: string; placeholder: string } {
  const f = new Set(a.features);
  if (a.industry === "legal" && a.projectType !== "designsystem")
    return { question: "Which tools does your firm already rely on for intake and case management, and where do things fall through the cracks today?", placeholder: "e.g. Clio for matters, a Google Form for intake, leads lost after hours…" };
  if (f.has("payments") || f.has("subscriptions"))
    return { question: "How will you charge customers: one-time payments, subscriptions, or usage-based pricing?", placeholder: "e.g. monthly plans with a free trial, plus one-off add-ons" };
  if (f.has("ai"))
    return { question: "What should the AI actually do for your users, and what data would it work from?", placeholder: "e.g. summarize uploaded documents and answer questions about them" };
  const byType: Record<ProjectType, { question: string; placeholder: string }> = {
    website: { question: "Which websites do you admire, and what do you like about them?", placeholder: "Links or names, and what stands out" },
    webapp: { question: "Who are the primary users, and what’s the one thing they must be able to do on day one?", placeholder: "e.g. clinic managers who need to see today’s schedule at a glance" },
    mobile: { question: "Does the app depend on device features like the camera, location or working offline?", placeholder: "e.g. scan receipts with the camera, works on spotty connections" },
    dashboard: { question: "Where does the data live today, and how fresh does it need to be?", placeholder: "e.g. Postgres + Google Sheets, updated hourly" },
    ecommerce: { question: "Roughly how many products will you sell, and are you on a platform like Shopify today?", placeholder: "e.g. ~40 products, moving from Etsy" },
    designsystem: { question: "How many products or teams will build with the system?", placeholder: "e.g. two web apps and a marketing site, 6 developers" },
    audit: { question: "Which number worries you most right now: conversion, retention, support tickets, something else?", placeholder: "e.g. 70% of sign-ups never finish onboarding" },
    unsure: { question: "What would success look like six months after launch?", placeholder: "Describe the outcome, not the features" },
  };
  return byType[a.projectType ?? "unsure"];
}

/* ---------- Steps ---------- */

export type Field =
  | { key: keyof Answers; kind: "single"; options: Option[]; label?: string; columns?: 1 | 2 | 3 }
  | { key: keyof Answers; kind: "multi"; options: Option[]; label?: string; max?: number; optional?: boolean }
  | { key: keyof Answers; kind: "text"; label?: string; placeholder: string; optional?: boolean; rows?: number }
  | { key: keyof Answers; kind: "input"; label: string; placeholder: string; type?: string; optional?: boolean; autoComplete?: string };

export type StepId = "describe" | "type" | "stage" | "goals" | "context" | "services" | "features" | "followup" | "tech" | "timeline" | "budget" | "contact";

export type Step = {
  id: StepId;
  section: string;
  /* the label for this answer in the transcript */
  short: string;
  prompt: string;
  sub?: string;
  fields: Field[];
  optional?: boolean;
};

export function stepsFor(a: Answers): Step[] {
  const tl = typeNoun(a.projectType);
  const space = industryPhrase(a.industry);
  const steps: Step[] = [
    {
      id: "describe",
      short: "Idea",
      section: "Project",
      prompt: "Hi, I’m Nicolle’s project assistant. In a sentence or two, what are you looking to build?",
      sub: "Plain words are perfect. I’ll read it, pre-fill what I can and tailor the rest of the questions.",
      fields: [{ key: "description", kind: "text", placeholder: "e.g. A client portal for our law firm where clients can upload documents, track their case and book calls with an attorney.", rows: 4 }],
    },
    {
      id: "type",
      short: "Type",
      section: "Project",
      prompt: "Which of these is closest to what you have in mind?",
      fields: [{ key: "projectType", kind: "single", options: PROJECT_TYPES, columns: 2 }],
    },
    {
      id: "stage",
      short: "Stage",
      section: "Project",
      prompt: a.projectType === "audit" ? "Where is the product today?" : `Where is the ${tl} today?`,
      fields: [{ key: "stage", kind: "single", options: a.projectType === "audit" ? STAGES.filter((s) => s.id === "existing" || s.id === "rebuild") : STAGES, columns: 1 }],
    },
    {
      id: "goals",
      short: "Goals",
      section: "Objectives",
      prompt: `What should this ${tl} achieve for the business?`,
      sub: "Pick up to three. The top goals shape what gets built first.",
      fields: [{ key: "objectives", kind: "multi", options: OBJECTIVES, max: 3 }],
    },
    {
      id: "context",
      short: "Business",
      section: "Business",
      prompt: "Tell me a little about the business behind it.",
      sub: "What’s the industry, and what’s not working today?",
      fields: [
        { key: "industry", kind: "single", options: INDUSTRIES, label: "Industry", columns: 3 },
        {
          key: "challenges",
          kind: "text",
          label: "Biggest challenge",
          optional: true,
          rows: 3,
          placeholder:
            a.industry === "legal"
              ? "e.g. Potential clients drop off before booking a consultation; intake is still done by phone."
              : a.stage === "existing"
                ? "e.g. Users sign up but don’t come back; the interface feels dated."
                : "e.g. We’re doing this in spreadsheets and it doesn’t scale.",
        },
      ],
    },
    {
      id: "services",
      short: "Services",
      section: "Scope",
      prompt: `Here’s the help I’d suggest for ${withArticle(tl)}${space ? ` in ${space}` : ""}. Adjust as needed.`,
      sub: "Pre-selected from what you’ve told me so far.",
      fields: [{ key: "services", kind: "multi", options: SERVICES }],
    },
    {
      id: "features",
      short: a.projectType === "audit" ? "Audit scope" : "Capabilities",
      section: "Scope",
      prompt:
        a.projectType === "audit"
          ? "What should the audit cover?"
          : a.projectType === "designsystem"
            ? "What should the design system include?"
            : `Which capabilities does the ${tl} need?`,
      sub: "Each one shifts the estimate. You’ll see it move as you choose.",
      fields: [{ key: "features", kind: "multi", options: featuresFor(a.projectType) }],
    },
    {
      id: "followup",
      short: "Follow-up",
      section: "Scope",
      prompt: a.followupQuestion || followupLocally(a).question,
      sub: "One question tailored to your answers. Optional, but it makes the brief sharper.",
      optional: true,
      fields: [{ key: "followupAnswer", kind: "text", placeholder: followupLocally(a).placeholder, optional: true, rows: 3 }],
    },
  ];

  if (buildsCode(a)) {
    steps.push({
      id: "tech",
      short: "Tech",
      section: "Technology",
      prompt: "Any preferences on technology, or systems it has to connect to?",
      fields: [
        { key: "stack", kind: "single", options: a.projectType === "mobile" ? STACKS.filter((s) => s.id !== "nocode") : STACKS, label: "Stack", columns: 2 },
        { key: "integrations", kind: "multi", options: a.industry === "legal" ? INTEGRATIONS : INTEGRATIONS.filter((i) => i.id !== "clio"), label: "Integrations", optional: true },
      ],
    });
  }

  steps.push(
    {
      id: "timeline",
      short: "Timeline",
      section: "Timeline",
      prompt: "When would you like to launch, and what matters most?",
      fields: [
        { key: "timeline", kind: "single", options: TIMELINES, label: "Timeline", columns: 2 },
        { key: "priority", kind: "single", options: PRIORITIES, label: "Top priority", columns: 2 },
      ],
    },
    {
      id: "budget",
      short: "Budget",
      section: "Budget",
      prompt: "Do you have a budget range in mind?",
      sub: "There’s no wrong answer. It helps me suggest the right scope, and you’ll see my estimate next to it.",
      fields: [{ key: "budget", kind: "single", options: BUDGETS, columns: 3 }],
    },
    {
      id: "contact",
      short: "Contact",
      section: "You",
      prompt: "Last step: where should I send the full proposal?",
      fields: [
        { key: "name", kind: "input", label: "Your name", placeholder: "Jane Doe", autoComplete: "name" },
        { key: "email", kind: "input", label: "Work email", placeholder: "jane@company.com", type: "email", autoComplete: "email" },
        { key: "company", kind: "input", label: "Company", placeholder: "Company or firm", optional: true, autoComplete: "organization" },
        { key: "notes", kind: "text", label: "Anything else?", placeholder: "Links, deadlines, decision makers…", optional: true, rows: 2 },
      ],
    },
  );
  return steps;
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/* can the visitor move past this step? */
export function stepComplete(step: Step, a: Answers): boolean {
  return step.fields.every((f) => {
    const v = a[f.key];
    if ((f.kind === "text" || f.kind === "input") && f.optional) return true;
    if (f.key === "email") return isEmail(String(v ?? ""));
    if (f.key === "description") return String(v ?? "").trim().length >= 8;
    if (f.kind === "multi") return Boolean(f.optional) || (Array.isArray(v) && v.length > 0);
    return Array.isArray(v) ? v.length > 0 : Boolean(String(v ?? "").trim());
  });
}

/* ---------- Estimate ---------- */

export type Estimate = {
  low: number;
  high: number;
  weeksLow: number;
  weeksHigh: number;
  mvpLow: number;
  mvpHigh: number;
  breakdown: { label: string; share: number }[];
  lines: { label: string; low: number; high: number }[];
  retainer: number | null;
  fit: "aligned" | "stretch" | "below" | "above" | "unknown";
  confidence: number; // 0..1, grows as the brief fills in
};

const round = (n: number) => (n < 10000 ? Math.round(n / 500) * 500 : Math.round(n / 1000) * 1000);

export function estimate(a: Answers): Estimate {
  const type = a.projectType ?? "unsure";
  const [bl, bh, wl, wh] = PRICING.base[type];
  const lines: Estimate["lines"] = [];
  const hasDesign = a.services.some((s) => s === "ui" || s === "system");
  const hasDev = a.services.some((s) => s === "frontend" || s === "fullstack");
  let coreFactor = 1;
  if (a.services.length && type !== "audit" && type !== "designsystem") {
    if (hasDesign && !hasDev) coreFactor = PRICING.designOnly;
    else if (hasDev && !hasDesign) coreFactor = PRICING.devOnly;
    else if (!hasDesign && !hasDev) coreFactor = 0.3;
  }
  const stageFactor = PRICING.stage[a.stage ?? "defined"] ?? 1;
  lines.push({ label: `${typeLabel(type)} core`, low: bl * coreFactor * stageFactor, high: bh * coreFactor * stageFactor });

  let weeksL = wl * Math.max(coreFactor, 0.5);
  let weeksH = wh * Math.max(coreFactor, 0.5);

  const feats = FEATURES.filter((f) => a.features.includes(f.id) && f.types.includes(type));
  if (feats.length) {
    // design-only work prices features at a fraction: they still need flows and screens
    const k = coreFactor === PRICING.designOnly ? 0.4 : 1;
    lines.push({ label: `${feats.length} ${feats.length === 1 ? "capability" : "capabilities"}`, low: sum(feats.map((f) => f.cost[0])) * k, high: sum(feats.map((f) => f.cost[1])) * k });
    const fw = sum(feats.map((f) => f.weeks)) * k;
    weeksL += fw * 0.6;
    weeksH += fw;
  }
  for (const s of a.services) {
    const c = PRICING.services[s];
    if (c) lines.push({ label: label(SERVICES, s), low: c[0], high: c[1] });
  }
  if (a.services.includes("system") && type !== "designsystem") lines.push({ label: "Design system foundations", low: 2500, high: 6000 });
  if (a.integrations.length && buildsCode(a)) {
    const n = a.integrations.length;
    lines.push({ label: `${n} ${n === 1 ? "integration" : "integrations"}`, low: n * PRICING.integration[0], high: n * PRICING.integration[1] });
    weeksH += n * 0.4;
    weeksL += n * 0.2;
  }

  let low = sum(lines.map((l) => l.low));
  let high = sum(lines.map((l) => l.high));
  let mult = 1;
  if (a.timeline === "asap") mult *= PRICING.rush;
  if (a.priority === "quality") mult *= PRICING.polish;
  if (a.stack === "existing") mult *= PRICING.existingStack;
  if (a.stack === "nocode" && type !== "webapp" && type !== "dashboard") mult *= 0.85;
  // a quote-like spread (about ±22% around the middle) reads more credible than the raw min/max
  const mid = ((low + high) / 2) * mult;
  low = round(mid * 0.78);
  high = round(mid * 1.22);
  if (high - low < 1500) high = low + 1500;

  // MVP: the core plus the first third of the capabilities, no extras
  // lean MVP: a trimmed core plus about a third of the capabilities, no extras
  const mvpMid = (((lines[0].low + lines[0].high) / 2) * 0.6 + (feats.length ? ((lines[1].low + lines[1].high) / 2) * 0.3 : 0)) * mult;
  const mvpLow = round(mvpMid * 0.8);
  const mvpHigh = round(Math.max(mvpLow + 1000, mvpMid * 1.2));

  const weeksLow = Math.max(1, Math.round(weeksL));
  const weeksHigh = Math.max(weeksLow + 1, Math.round(weeksH));

  const discovery = (a.services.includes("strategy") || a.services.includes("research") || a.stage === "idea" ? 14 : 7);
  const design = hasDesign || type === "audit" || type === "designsystem" || !a.services.length ? (hasDev ? 28 : 60) : 6;
  const build = hasDev || (!a.services.length && type !== "audit") ? 48 : 0;
  const qa = build ? 12 : 8;
  const total = discovery + design + build + qa;
  const breakdown = [
    { label: "Discovery & strategy", share: discovery / total },
    { label: type === "audit" ? "Research & recommendations" : "Design", share: design / total },
    { label: "Build", share: build / total },
    { label: build ? "QA & launch" : "Handoff", share: qa / total },
  ].filter((b) => b.share > 0);

  const b = BUDGETS.find((x) => x.id === a.budget);
  let fit: Estimate["fit"] = "unknown";
  if (b && b.id !== "unsure") {
    const [min, max] = b.range;
    if (max < low) fit = "below";
    else if (min > high) fit = "above";
    else if (max < (low + high) / 2) fit = "stretch";
    else fit = "aligned";
  }
  const filled = [a.projectType, a.stage, a.objectives.length, a.services.length, a.features.length, a.timeline, a.budget].filter(Boolean).length;

  return {
    low,
    high,
    weeksLow,
    weeksHigh,
    mvpLow: Math.min(mvpLow, low),
    mvpHigh: Math.min(mvpHigh, high),
    breakdown,
    lines: lines.map((l) => ({ ...l, low: round(l.low * mult), high: round(l.high * mult) })),
    retainer: a.services.includes("support") ? PRICING.retainerFrom : null,
    fit,
    confidence: Math.min(1, 0.25 + filled * 0.11),
  };
}

const sum = (n: number[]) => n.reduce((x, y) => x + y, 0);

export const money = (n: number) => (n >= 1000 ? `$${Math.round(n / 100) / 10}k`.replace(".0k", "k") : `$${n}`);

/* ---------- Brief (local fallback for the AI summary) ---------- */

export type Brief = {
  headline: string;
  summary: string;
  requirements: string[];
  considerations: string[];
  approach: string;
  phases: { name: string; detail: string }[];
};

export function briefLocally(a: Answers, e: Estimate): Brief {
  const ind = a.industry && a.industry !== "other" ? label(INDUSTRIES, a.industry) : "";
  const who = a.company.trim() || (ind ? `a ${ind.toLowerCase()} business` : "your team");
  const goals = labels(OBJECTIVES, a.objectives).map((g) => g.toLowerCase());
  const feats = labels(FEATURES, a.features);
  const ints = labels(INTEGRATIONS, a.integrations);

  const summary = [
    `${a.stage === "existing" ? "Improve" : a.stage === "rebuild" ? "Rebuild" : "Design and build"} ${a.projectType === "audit" ? "the current product" : withArticle(typeNoun(a.projectType))} for ${who}${goals.length ? ` that helps ${listJoin(goals)}` : ""}.`,
    a.challenges.trim() ? `The main challenge today: ${trimSentence(a.challenges)}` : "",
    feats.length ? `Core scope covers ${listJoin(feats.slice(0, 4).map((f) => f.toLowerCase()))}${feats.length > 4 ? `, plus ${feats.length - 4} more` : ""}.` : "",
  ].filter(Boolean).join(" ");

  const requirements = [
    ...feats.slice(0, 5),
    ...(ints.length ? [`Integrations: ${ints.join(", ")}`] : []),
    ...(a.objectives.includes("leads") || a.objectives.includes("conversion") ? ["Conversion-focused flows with analytics from day one"] : []),
    ...(a.services.includes("system") ? ["Reusable component system"] : []),
  ].slice(0, 6);

  const considerations: string[] = [];
  if (e.fit === "stretch") considerations.push(`Your budget covers the lower end of the range. Launching the core first and phasing the rest keeps it comfortable.`);
  if (e.fit === "below") considerations.push(`Your budget sits under the full estimate. A phased plan starting with a lean MVP (${money(e.mvpLow)}–${money(e.mvpHigh)}) keeps momentum without cutting corners.`);
  if (a.timeline === "asap" && e.weeksLow > 4) considerations.push(`A launch in under a month is tight for this scope (${e.weeksLow}–${e.weeksHigh} weeks). Prioritizing a first release makes it realistic.`);
  if (a.industry === "legal") considerations.push("Client confidentiality matters: secure document handling, access control and clear data retention.");
  if (a.industry === "health") considerations.push("Health data may fall under HIPAA or LGPD; hosting and vendors need to be chosen with that in mind.");
  if (a.features.includes("ai")) considerations.push("AI features need clear guardrails, real example data to test against, and a plan for cost per request.");
  if (a.integrations.length >= 3) considerations.push("Several integrations: early API access and test accounts will keep the schedule safe.");
  if (a.stage === "idea") considerations.push("Starting from an idea, a short discovery phase protects the budget by deciding what not to build.");
  if (!considerations.length) considerations.push("Scope looks well defined. The next step is a short call to confirm priorities and success metrics.");

  const approach =
    a.priority === "speed"
      ? "Ship a focused first release quickly, then iterate in short cycles based on real usage."
      : a.priority === "quality"
        ? "Invest in a strong design foundation and detailed craft before scaling the feature set."
        : a.priority === "budget"
          ? "Scope tightly around the must-haves and phase everything else into later releases."
          : "Build on a scalable architecture and design system so new features stay cheap to add.";

  const phases = e.breakdown.map((b) => ({
    name: b.label,
    detail: `${Math.round(b.share * 100)}% of effort`,
  }));

  const head = `${ind && a.industry !== "services" ? `${ind} ` : ""}${typeNoun(a.projectType)}`;
  return { headline: `${head.charAt(0).toUpperCase()}${head.slice(1)}${a.company.trim() ? ` · ${a.company.trim()}` : ""}`, summary, requirements, considerations: considerations.slice(0, 3), approach, phases };
}

function trimSentence(s: string) {
  const t = s.trim().replace(/\s+/g, " ");
  const cut = t.length > 180 ? `${t.slice(0, 177).trimEnd()}…` : t;
  return /[.!?…]$/.test(cut) ? cut : `${cut}.`;
}

/* plain-text version of the brief, for the email and the mailto fallback */
export function briefText(a: Answers, e: Estimate, b: Brief) {
  const row = (k: string, v: string) => (v ? `${k}: ${v}` : "");
  return [
    `PROJECT BRIEF: ${b.headline}`,
    "",
    b.summary,
    "",
    row("Name", a.name),
    row("Email", a.email),
    row("Company", a.company),
    "",
    row("Description", a.description.trim()),
    row("Type", typeLabel(a.projectType)),
    row("Stage", label(STAGES, a.stage)),
    row("Objectives", labels(OBJECTIVES, a.objectives).join(", ")),
    row("Industry", label(INDUSTRIES, a.industry)),
    row("Challenge", a.challenges.trim()),
    row("Services", labels(SERVICES, a.services).join(", ")),
    row("Features", labels(FEATURES, a.features).join(", ")),
    a.followupAnswer.trim() ? `Q: ${a.followupQuestion || followupLocally(a).question}\nA: ${a.followupAnswer.trim()}` : "",
    row("Stack", label(STACKS, a.stack)),
    row("Integrations", labels(INTEGRATIONS, a.integrations).join(", ")),
    row("Timeline", label(TIMELINES, a.timeline)),
    row("Priority", label(PRIORITIES, a.priority)),
    row("Budget in mind", label(BUDGETS, a.budget)),
    "",
    `ESTIMATE: ${money(e.low)} – ${money(e.high)} · ${e.weeksLow}–${e.weeksHigh} weeks`,
    `Lean MVP: ${money(e.mvpLow)} – ${money(e.mvpHigh)}`,
    e.retainer ? `Ongoing support from ${money(e.retainer)}/month` : "",
    "",
    "Requirements:",
    ...b.requirements.map((r) => `- ${r}`),
    "",
    "Considerations:",
    ...b.considerations.map((c) => `- ${c}`),
    "",
    row("Notes", a.notes.trim()),
  ]
    .filter((l, i, arr) => l !== "" || arr[i - 1] !== "")
    .join("\n")
    .trim();
}

/* keep only known ids and sane strings: anything coming back from the client or the model goes through this */
export function sanitizeAnswers(input: unknown): Answers {
  const o = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (v: unknown, max = 1200) => (typeof v === "string" ? v.slice(0, max) : "");
  const one = (v: unknown, list: Option[]) => (typeof v === "string" && list.some((x) => x.id === v) ? v : undefined);
  const many = (v: unknown, list: Option[]) => (Array.isArray(v) ? [...new Set(v.filter((x): x is string => typeof x === "string" && list.some((y) => y.id === x)))] : []);
  return {
    description: str(o.description, 2000),
    projectType: one(o.projectType, PROJECT_TYPES) as ProjectType | undefined,
    stage: one(o.stage, STAGES),
    objectives: many(o.objectives, OBJECTIVES),
    industry: one(o.industry, INDUSTRIES),
    challenges: str(o.challenges),
    services: many(o.services, SERVICES),
    features: many(o.features, FEATURES),
    followupQuestion: str(o.followupQuestion, 300),
    followupAnswer: str(o.followupAnswer),
    stack: one(o.stack, STACKS),
    integrations: many(o.integrations, INTEGRATIONS),
    timeline: one(o.timeline, TIMELINES),
    priority: one(o.priority, PRIORITIES),
    budget: one(o.budget, BUDGETS),
    name: str(o.name, 120),
    email: str(o.email, 200),
    company: str(o.company, 160),
    notes: str(o.notes),
  };
}
