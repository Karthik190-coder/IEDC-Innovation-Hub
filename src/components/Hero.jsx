import heroImage from '../assets/Hero_image.png';

function Hero({ onScrollToSubmit, projectCount, categoryCount, totalVotes }) {
    return (
    <section id="home" className="relative bg-bg overflow-hidden">
      {/* Subtle background atmosphere */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Editorial Content */}
          <div className="max-w-xl mx-auto lg:mx-0">
            <div className="animate-fade-in-up">
              <span className="text-eyebrow mb-4 inline-block">IEDC Onboarding 2026</span>
            </div>

            <h1 className="text-display text-navy mb-6 animate-fade-in-up delay-1">
              Have an idea?<br />
              <span className="text-orange">Let's build it.</span>
            </h1>

            <p className="text-lead mb-8 animate-fade-in-up delay-2">
              Share what you're building, discover ideas from fellow innovators, and help promising projects get noticed.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up delay-3">
              <a
                href="#projects"
                className="group btn-primary w-full sm:w-auto px-7 py-4 rounded-lg bg-navy text-white font-semibold text-base hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 shadow-sm"
              >
                Explore Projects
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              <button
                type="button"
                onClick={onScrollToSubmit}
                className="btn-secondary w-full sm:w-auto px-7 py-4 rounded-lg border-2 border-navy text-navy font-semibold text-base hover:bg-navy hover:text-white transition-all duration-150"
              >
                Submit an Idea
              </button>
            </div>

            {/* Dynamic stats from actual data */}
            <div className="mt-10 pt-8 border-t border-slate-200 animate-fade-in-up delay-4">
              <dl className="grid grid-cols-3 gap-6">
                <div>
                  <dt className="text-caption text-slate-500 mb-1">Projects</dt>
                  <dd className="text-2xl font-bold text-navy tabular-nums">{projectCount}</dd>
                </div>
                <div>
                  <dt className="text-caption text-slate-500 mb-1">Categories</dt>
                  <dd className="text-2xl font-bold text-navy tabular-nums">{categoryCount}</dd>
                </div>
                <div>
                  <dt className="text-caption text-slate-500 mb-1">Community Votes</dt>
                  <dd className="text-2xl font-bold text-navy tabular-nums">{totalVotes}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center animate-fade-in-up delay-2">
          <img
            src={heroImage}
            alt="Students collaborating on innovative ideas"
            className="w-full max-w-2xl h-auto object-contain"
          />
          </div>  
          <div className="lg:hidden animate-fade-in-up delay-2">
          <img
            src={heroImage}
            alt="Students collaborating on innovative ideas"
            className="w-full max-w-md mx-auto h-auto object-contain"
          />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;