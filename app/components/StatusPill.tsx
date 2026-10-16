import Link from "next/link";
import { EMAIL } from "./site";
import TypedText from "./TypedText";

/** Availability pill: radar dot, email and a Get in touch button */
export default function StatusPill({ className }: { className?: string }) {
  return (
    <div className={className ? `v2-status ${className}` : "v2-status"}>
      <span className="v2-status__dot" aria-hidden="true" />
      <a href={`mailto:${EMAIL}`} className="v2-status__email"><TypedText text={EMAIL} /></a>
      <Link href="/contact" className="v2-status__cta">Get in touch</Link>
    </div>
  );
}
