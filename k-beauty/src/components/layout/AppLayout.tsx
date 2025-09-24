import Navbar from "../Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-[var(--container)] px-6">
          <Navbar />
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-[var(--container)] px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
