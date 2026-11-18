import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="label">404</p>
        <h1 className="mt-2 text-[22px] font-semibold">This page isn&apos;t part of the prototype.</h1>
        <Link href="/" className="mt-4 inline-block text-[13px] text-accent hover:underline">Back to overview</Link>
      </div>
    </div>
  );
}
