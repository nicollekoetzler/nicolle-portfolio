export const roles = ["DEVELOPER", "DESIGNER", "THINKER", "BUILDER"];

export type Project = {
  title: string;
  image: string;
  alt: string;
  tags: string[];
  /** CSS object-position matching the crop in the Figma design */
  position?: string;
  /** Muted looping video shown instead of the image (the image becomes its poster) */
  video?: string;
  /** External link shown to the right of the title */
  link?: { href: string; label: string };
};

export const featured: Project = {
  title: "Case Connector",
  image: "/assets/case-connector.png",
  video: "/assets/case-connector.mp4",
  link: { href: "https://apps.apple.com/us/app/tlu-case-connector/id6759930495", label: "View on the App Store" },
  alt: "Case Connector app shown on a phone in a futuristic blue room",
  tags: ["CASE REFERRAL SOLUTION", "MOBILE APP", "SOFTWARE DEVELOPMENT", "UI/UX DESIGN"],
  position: "center",
};

const lawFirmTags = ["LAW FIRM WEBSITE", "UI/UX DESIGN", "SOFTWARE DEVELOPMENT"];

export const projects: Project[] = [
  { title: "California Trial Law Group", image: "/assets/project-california-trial.png", alt: "California Trial Law Group website", tags: lawFirmTags },
  { title: "Moore Payne Law", image: "/assets/project-moore-payne.png", alt: "Moore Payne Law website", tags: lawFirmTags },
  { title: "Law-Di-Gras", image: "/assets/project-law-di-gras.png", alt: "Law-Di-Gras event website", tags: lawFirmTags, position: "50% 9%" },
  { title: "Wilk Law", image: "/assets/project-wilk-law.png", alt: "Wilk Law website", tags: lawFirmTags, position: "50% 9%" },
];
