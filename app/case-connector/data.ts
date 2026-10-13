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

export const personas = [
  {
    name: "Persona 1 · Case Poster",
    image: "/assets/case-connector/cc-persona-1.png",
    quote: "“I need to delegate cases I can’t or shouldn’t take—and still ensure my client is in good hands.”",
    goals: [
      "Delegate cases quickly and ethically.",
      "Earn referral fees without complicated processes.",
      "Ensure the client receives quality representation.",
      "Connect with trustworthy, verified attorneys.",
    ],
    pains: [
      "Difficulty finding reliable attorneys to hand cases off to.",
      "Fear of violating referral fee ethics rules (ABA + state-specific rules).",
      "Manual, slow, unstructured referral process (calls, emails, networking).",
      "No guarantee the receiving attorney will follow up with the client.",
      "Uncertainty about fair referral fee percentages.",
      "Wasted time with attorneys who don’t respond or aren’t interested.",
      "Lack of transparency when multiple attorneys express interest.",
      "Concerns about damaging the client relationship during the handoff.",
    ],
    insights: [
      "Verified attorney accounts (bar license + identity check).",
      "Clearly defined and pre-approved ethical referral fee guidelines.",
      "Secure platform for organizing bids, communications, and documents.",
      "AI-assisted referral fee recommendations based on case type.",
      "Attorney ratings, reviews, and historical performance.",
      "Clear workflow for case posting, bidding, and acceptance.",
      "Automated notifications for bids, messages, and updates.",
      "Streamlined client-transition process to protect client well-being.",
    ],
  },
  {
    name: "Persona 2 · Case Bidder",
    image: "/assets/case-connector/cc-persona-2.png",
    quote: "“I need to delegate cases I can’t or shouldn’t take—and still ensure my client is in good hands.”",
    goals: [
      "Acquire new clients efficiently.",
      "Reduce cost of client acquisition (versus ads).",
      "Find cases that genuinely match their expertise and jurisdiction.",
      "Compete fairly for cases with transparent rules.",
    ],
    pains: [
      "High marketing costs (PPC, SEO, lead generation).",
      "Poor-quality leads from third-party vendors.",
      "Leads already contacted by multiple firms (not exclusive).",
      "Incomplete or unclear case information.",
      "No visibility into case value before committing.",
      "Referral fees that feel arbitrary or unfair.",
      "Slow and inefficient back-and-forth with the referring attorney.",
      "Need to react fast to secure good cases.",
    ],
    insights: [
      "Exclusive access to client information only after bid acceptance.",
      "Case summaries standardized for clarity and quick evaluation.",
      "Document upload system for police reports, medical notes, photos, etc.",
      "Transparent bidding system with number of bidders + time remaining.",
      "State-specific referral fee compliance built in.",
      "Real-time alerts for new cases in relevant practice areas.",
      "Ability to showcase expertise, ratings, and track record.",
      "Priority flagging for urgent cases requiring fast action.",
    ],
  },
];

export const insights = [
  "Attorneys need simplicity + legal ethics compliance above everything else.",
  "Case Posters want: reliability + speed + protection.",
  "Case Bidders want: quality cases + transparency + fair competition.",
  "The platform must reduce friction, eliminate uncertainty, and increase clarity.",
  "Trust is the cornerstone — verification and reputation systems are essential.",
  "Market is ready for a legal-tech marketplace that standardizes referrals.",
  "Referral fees are misunderstood, causing hesitation → must be made transparent.",
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
