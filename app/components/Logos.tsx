/* eslint-disable @next/next/no-img-element -- SVG logos keep their Figma sizes as plain <img> */

/* light-on-dark versions from the Figma file; Trial Lawyers University has its grey wordmark lightened to match */
const logos = [
  { src: "morrell", name: "The Morrell Law Firm", w: 144, h: 34 },
  { src: "california", name: "California Trial Law Group", w: 156, h: 36 },
  { src: "justice", name: "Justice 4 Elders", w: 158, h: 39 },
  { src: "simmons", name: "Simmons Law", w: 137, h: 32 },
  { src: "bush", name: "Bush & Bush", w: 65, h: 24 },
  { src: "taylor", name: "Taylor & Siemens", w: 143, h: 30 },
  { src: "trial-lawyers", name: "Trial Lawyers University", w: 153, h: 32 },
  { src: "hostgator", name: "HostGator", w: 139, h: 30 },
];

/** Client logos for the "Trusted by" carousel; render it twice (the second hidden) for a seamless loop */
export default function Logos({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="logos" aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <li key={l.src} className="logo">
          <img src={`/assets/logos/${l.src}.svg`} width={l.w} height={l.h} alt={hidden ? "" : l.name} />
        </li>
      ))}
    </ul>
  );
}
