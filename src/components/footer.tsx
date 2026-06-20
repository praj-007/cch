import Link from "next/link";

export function Footer() {
  return (
    <footer className="nav-elevated mt-auto border-t-[3px] border-black">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sketch-box flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-sketch text-2xl font-bold">CaseCompHub</p>
            <p className="text-sm text-muted">
              the practice ground for case competitions ~
            </p>
          </div>
          <div className="flex gap-6 font-hand text-sm font-bold">
            <Link href="/calendar" className="hover:underline">
              Calendar
            </Link>
            <Link href="/practice" className="hover:underline">
              Practice
            </Link>
            <Link href="/community" className="hover:underline">
              Community
            </Link>
          </div>
        </div>
        <p className="mt-4 text-center font-hand text-xs text-muted">
          © 2026 CaseCompHub · MVP Pilot · Delhi-NCR
        </p>
      </div>
    </footer>
  );
}