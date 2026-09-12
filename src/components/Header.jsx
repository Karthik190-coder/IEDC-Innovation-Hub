import { useState } from 'react';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#submit', label: 'Submit Idea' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#home" className="flex items-center gap-2.5 text-navy hover:opacity-80 transition-opacity" aria-label="IEDC Innovation Hub - Home">
              <span className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-navy">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange rounded-full" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold tracking-tight">IEDC <span className="text-orange">✦</span> Innovation Hub</span>
            </a>
          </div>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                className={idx === 2
                  ? "px-5 py-2.5 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-navy-light transition-all duration-150 shadow-sm"
                  : "px-4 py-2 text-slate-600 hover:text-navy font-medium text-sm transition-colors rounded-md"
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-500 hover:text-navy hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-64 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2 pt-2">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                className={idx === 2
                  ? "px-4 py-3 mx-2 rounded-lg bg-navy text-white font-semibold text-sm text-center"
                  : "px-4 py-2.5 text-slate-600 hover:text-navy hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors"
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;