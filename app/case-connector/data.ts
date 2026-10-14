export const goals = [
  {
    title: ["Simplify the", "referral workflow"],
    text: "Create a clear and intuitive process for attorneys to review and manage referral opportunities.",
  },
  {
    title: ["Improve visibility", "and organization"],
    text: "Make it easier for attorneys to understand where their cases stand, what actions are required, and what is happening next.",
  },
  {
    title: ["Create a connected", "experience"],
    text: "Bring networking, case discovery and case management together into a single platform instead of relying on multiple disconnected tools.",
  },
  {
    title: ["Design for adoption"],
    text: "Keep the experience straightforward so attorneys can focus on opportunities and relationships rather than learning a complex system.",
  },
];

export type Phase = {
  title: string;
  date: string;
  goal: string;
  items: string[];
  deliverable?: string;
};

/** Ordered by date; odd phases sit below the timeline, even phases above it */
export const phases: Phase[] = [
  {
    title: "Phase 1: Foundation & Core Setup",
    date: "December 2025",
    goal: "Establish the technical foundation and core structure of the app.",
    items: [
      "Define app architecture (frontend, backend, database)",
      "Repository and environment setup (dev / staging / prod)",
      "Authentication system (Sign Up, Login and Logout)",
      "Base UI components / design system",
    ],
  },
  {
    title: "Phase 2: Profile & Account Features",
    date: "1st Half - January 2026",
    goal: "Enable users to build and manage their profiles.",
    items: [
      "My Profile (Profile settings, Account settings).",
      "Profile fields (Biography, Languages, Education, Experience, Video Introduction).",
      "Data saving and editing functionality.",
    ],
    deliverable:
      "Navigable app with functional authentication and core structure in place. Fully editable and functional user profiles.",
  },
  {
    title: "Phase 3: Cases & Network (User Side)",
    date: "2nd Half - January 2026",
    goal: "Enable case discovery and interaction.",
    items: [
      "My Network",
      "Find Cases: Case listings and Case overview",
      "Actions: Apply and Save",
      "Chat (initial version)",
      "Listed Cases",
    ],
    deliverable: "Users can discover, save, apply to, and interact with cases.",
  },
  {
    title: "Phase 4: Dashboard & Case Status",
    date: "1st Half - February 2026",
    goal: "Provide visibility into case progress and activity.",
    items: [
      "Main Dashboard: Cases in progress, In review and Weekly / Monthly summary.",
      "My Cases.",
      "Case status tracking.",
      "Notifications implementation.",
    ],
    deliverable: "Functional dashboard with clear case status and summaries.",
  },
  {
    title: "Phase 5: Payments & Withdrawals",
    date: "2nd Half - February 2026",
    goal: "Implement the financial flow of the app.",
    items: [
      "Payments dashboard.",
      "Payment history.",
      "Withdrawals (request + status).",
      "Payment gateway integration.",
      "Security & validation rules.",
    ],
    deliverable: "End-to-end payments and withdrawals.",
  },
  {
    title: "Phase 6: Refinement & UX Improvements",
    date: "1st Half - March 2026",
    goal: "Improve usability, performance, and overall experience.",
    items: ["UX/UI refinements", "Performance optimizations", "Data saving and editing functionality."],
    deliverable: "A smoother, more polished app experience.",
  },
  {
    title: "Phase 7: Final Testing & Launch Preparation",
    date: "2nd Half - March 2026",
    goal: "Prepare the app for launch.",
    items: [
      "End-to-end testing.",
      "Bug fixes.",
      "Security review.",
      "Final UI adjustments.",
      "Production deployment preparation.",
      "Basic product documentation.",
    ],
    deliverable: "Launch-ready MVP.",
  },
];

/** Lists are kept the same length on both sides so the two persona cards line up row by row */
export const personas = [
  {
    name: "Case Poster",
    label: "Persona 1",
    role: "Refers cases out",
    image: "/assets/case-connector/cc-persona-1.png",
    quote: "“I need to delegate cases I can’t or shouldn’t take—and still know my client is in good hands.”",
    goals: [
      "Delegate cases quickly and ethically",
      "Earn referral fees with zero hassle",
      "Make sure clients get quality representation",
      "Work only with verified, trusted attorneys",
    ],
    pains: [
      "Hard to find reliable attorneys to refer to",
      "Unclear referral-fee ethics (ABA + state rules)",
      "Slow, manual hand-offs over calls and email",
      "No guarantee the client is followed up",
      "No sense of what a fair referral fee is",
      "Risk to the client relationship at hand-off",
    ],
    insights: [
      "Verified attorneys: bar license + ID check",
      "Pre-approved, ethical fee guidelines",
      "AI-suggested fees by case type",
      "Ratings, reviews and track record",
      "One clear flow: post, review bids, accept",
      "Guided client hand-off with live updates",
    ],
  },
  {
    name: "Case Bidder",
    label: "Persona 2",
    role: "Takes cases in",
    image: "/assets/case-connector/cc-persona-2.png",
    quote: "“I want quality cases that fit my practice—without paying for leads that go nowhere.”",
    goals: [
      "Win new clients efficiently",
      "Spend less per client than on ads",
      "Find cases in their practice area and state",
      "Compete under fair, transparent rules",
    ],
    pains: [
      "High marketing costs (PPC, SEO, lead gen)",
      "Low-quality leads from third-party vendors",
      "Leads already shared with other firms",
      "Incomplete case details, unclear value",
      "Referral fees that feel arbitrary",
      "Slow back-and-forth while good cases go fast",
    ],
    insights: [
      "Client details unlocked once a bid wins",
      "Standardized case summaries",
      "Uploads for reports, medical notes and photos",
      "Open bidding: bidder count + time left",
      "State-specific fee compliance built in",
      "Real-time alerts and urgent-case flags",
    ],
  },
];

export const marketProblems = [
  "Referral process is slow, informal, and unreliable",
  "Ethical confusion around referral fees",
  "High cost per lead",
  "Low-quality or duplicated leads",
  "Lack of trust between attorneys",
  "Difficulty organizing delegation workflow",
  "Fear of harming client relationship",
];

export const marketSolutions = [
  "Centralized, transparent referral marketplace",
  "Built-in compliance engine based on ABA rules",
  "Bid-based model for case acquisition",
  "Verified cases with documentation",
  "Ratings, history, reviews, and identity verification",
  "Dashboard with tracking + notifications",
  "Secure, structured client-transition path",
];

export type SitemapNode = { label: string; primary?: boolean; children?: SitemapNode[] };

/** App Architecture sitemap from the Figma file, rendered as a tree */
export const sitemap: SitemapNode = {
  label: "Sign Up",
  children: [
    {
      label: "Home",
      children: [
        {
          label: "My Profile",
          primary: true,
          children: [
            {
              label: "Profile Settings",
              children: [
                { label: "Languages" },
                { label: "Verifications" },
                { label: "Video Introduction" },
                { label: "Biography" },
                { label: "Education" },
                { label: "Experience" },
              ],
            },
            { label: "Account Settings" },
            { label: "Dashboard" },
            { label: "Logout" },
          ],
        },
        {
          label: "My Cases",
          primary: true,
          children: [
            { label: "Case Status", children: [{ label: "Chat" }] },
            { label: "Payments", children: [{ label: "Dashboard" }] },
          ],
        },
        {
          label: "Dashboard",
          primary: true,
          children: [
            { label: "Cases in Progress" },
            { label: "In Review" },
            { label: "Payments", children: [{ label: "Withdrawal" }] },
            { label: "Weekly/Monthly Summary" },
          ],
        },
        {
          label: "Home",
          primary: true,
          children: [
            { label: "My Network" },
            {
              label: "Find Cases",
              children: [{ label: "Apply" }, { label: "Save" }, { label: "Case Overview" }, { label: "Ask Question/Chat" }],
            },
            { label: "Notifications" },
            { label: "My Cases", children: [{ label: "Listed Cases" }, { label: "Chat" }] },
            { label: "Payments", children: [{ label: "Dashboard" }] },
          ],
        },
      ],
    },
  ],
};
