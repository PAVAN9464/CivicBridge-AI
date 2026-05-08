import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Schemes', href: '#platform' },
  { label: 'Eligibility Checker', href: '#eligibility' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-civic-navy/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <a href="#home" className="flex items-center gap-3 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-civic-gold/10 text-civic-gold ring-1 ring-civic-gold/20 font-semibold">
            CB
          </div>
          <div>
            <p className="text-lg font-semibold">CivicBridge AI</p>
            <p className="text-xs text-slate-400">Government services, accelerated.</p>
          </div>
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden border-t border-white/10 bg-civic-navy/95 px-6 py-4`}> 
        <nav className="space-y-3 text-sm font-medium text-slate-300">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block rounded-2xl px-4 py-3 transition hover:bg-white/5 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
