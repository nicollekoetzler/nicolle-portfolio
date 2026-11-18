import { Bookmark, Compass, LayoutGrid, LineChart, Map, Settings, Users } from "lucide-react";

export const NAV = [
  { href: "/", label: "Overview", icon: LayoutGrid },
  { href: "/discover", label: "Venue Discovery", icon: Compass, primary: true },
  { href: "/markets", label: "Market Intelligence", icon: LineChart },
  { href: "/tour-planner", label: "Tour Planner", icon: Map, soon: true },
  { href: "/artists", label: "Artists", icon: Users },
  { href: "/saved", label: "Saved Opportunities", icon: Bookmark, countKey: "saved" as const },
  { href: "/settings", label: "Settings", icon: Settings },
];
