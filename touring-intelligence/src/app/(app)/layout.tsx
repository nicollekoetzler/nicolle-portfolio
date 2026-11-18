import { AppStateProvider } from "@/components/providers/app-state";
import { MobileBar } from "@/components/shell/mobile-bar";
import { Sidebar } from "@/components/shell/sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppStateProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <MobileBar />
          <main className="mx-auto w-full max-w-[1320px] px-4 pb-20 pt-6 sm:px-6 lg:px-10 lg:pt-10">{children}</main>
        </div>
      </div>
      <Toaster />
    </AppStateProvider>
  );
}
