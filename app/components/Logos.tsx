/* eslint-disable @next/next/no-img-element -- SVG logos keep their Figma root sizes as plain <img> */

/** Client logos for the "Trusted by" carousel; render it twice (the second hidden) for a seamless loop */
export default function Logos({ hidden = false }: { hidden?: boolean }) {
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
      <li className="logo">
        <img src="/assets/logo-hostgator.svg" width={225} height={40} alt={alt("HostGator")} />
      </li>
    </ul>
  );
}
