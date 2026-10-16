import Shell from "../components/Shell";

/* Home, About, Contact and CV share one persistent shell, so the menu pill can glide between pages */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
