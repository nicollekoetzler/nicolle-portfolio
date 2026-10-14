export const roles = ["DEVELOPER", "DESIGNER", "THINKER", "+10 YEARS EXPERIENCE"];

export type Project = {
  title: string;
  image: string;
  alt: string;
  tags: string[];
  /** CSS object-position matching the crop in the Figma design */
  position?: string;
  /** Muted looping video shown instead of the image (the image becomes its poster) */
  video?: string;
  /** Case study page, opened in a new tab from the image and title */
  caseStudy?: string;
  /** Live site, opened in a new tab from the image and a "View Project" link */
  site?: string;
  /** External link shown to the right of the title */
  link?: { href: string; label: string };
};

export const featured: Project = {
  title: "Case Connector",
  image: "/assets/case-connector.png",
  video: "/assets/case-connector.mp4",
  caseStudy: "/case-connector",
  link: { href: "https://apps.apple.com/us/app/tlu-case-connector/id6759930495", label: "Download on the App Store" },
  alt: "Case Connector app shown on a phone in a futuristic blue room",
  tags: ["CASE REFERRAL SOLUTION", "MOBILE APP", "SOFTWARE DEVELOPMENT", "UI/UX DESIGN"],
  position: "center",
};

const lawFirmTags = ["LAW FIRM WEBSITE", "UI/UX DESIGN", "SOFTWARE DEVELOPMENT"];

export const projects: Project[] = [
  { title: "California Trial Law Group", site: "https://california-trial-law-group-c53x5nd6y.thecaselygroup.dev", image: "/assets/project-california-trial.png", alt: "California Trial Law Group website", tags: lawFirmTags },
  {
    title: "CG Performance Dashboard",
    caseStudy: "/performance-dashboard",
    image: "/assets/project-performance-dashboard-laptop.webp",
    alt: "CG Performance leads dashboard on a laptop",
    tags: ["SAAS DASHBOARD", "UI/UX DESIGN", "PRODUCT DESIGN"],
  },
  { title: "Law-Di-Gras", site: "https://lawdigras.org", image: "/assets/project-law-di-gras.png", alt: "Law-Di-Gras event website", tags: lawFirmTags, position: "50% 9%" },
  {
    title: "Attorney Share",
    site: "https://www.figma.com/proto/NoQjxJUGQZ9GxpyvNlfyHu/Attorney-Share?node-id=1-3&viewport=-669%2C129%2C0.44&t=RxRbhiPDiprU4r2x-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    image: "/assets/project-attorney-share.png",
    alt: "Attorney Share website: Attorney Referrals Just Got Easy",
    tags: ["LEGAL TECH WEBSITE", "UI/UX DESIGN"],
  },
];
