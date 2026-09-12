function ProjectCard({ project, onVote, getCategoryColor }) {
  const statusColors = {
    Ideation: 'bg-amber-light text-amber border-amber/30',
    Prototype: 'bg-blue-light text-blue border-blue/30',
    'Seed Funded': 'bg-emerald-light text-emerald border-emerald/30',
  };

  const getStatusColor = (status) => statusColors[status] || 'bg-slate-100 text-slate-700 border-slate/30';
  const domain = getCategoryColor(project.domain);

  return (
    <article className={`group relative bg-bg-card rounded-lg border border-slate-200 p-5 shadow-sm card-hover flex flex-col h-full ${domain.border}`}>
      {/* Animated category accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:from-accent group-hover:via-accent group-hover:to-transparent transition-all duration-350 category-accent" style={{ '--accent': domain.accent, width: '0' }} />
      
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          {/* Category badge above title */}
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[0.6875rem] font-semibold uppercase tracking-wide ${domain.bg} ${domain.text} border ${domain.border} mb-2`}>
            {project.domain}
          </span>
          <h3 className="text-lg font-bold text-navy truncate pr-2 leading-snug">
            {project.title}
          </h3>
        </div>
      </div>

      <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-slate-500">
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Team: {project.teamSize}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span>{project.teamLead}</span>
        </span>
        {project.pitchDeckLink && (
          <a
            href={project.pitchDeckLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-teal hover:text-teal-hover hover:underline transition-colors text-sm"
            aria-label={`View pitch deck for ${project.title}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span>View Pitch Deck ↗</span>
          </a>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>

        <button
          type="button"
          onClick={(e) => {
            onVote(project.id);
            const btn = e.currentTarget;
            btn.classList.add('vote-pop');
            setTimeout(() => btn.classList.remove('vote-pop'), 300);
          }}
          className="group flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-orange font-medium text-sm hover:bg-orange/10 hover:text-orange-hover transition-all duration-150 border border-orange/20"
          aria-label={`Vote for ${project.title}. Current votes: ${project.votes}`}
        >
          <svg className="w-5 h-5 text-orange group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="tabular-nums font-semibold">{project.votes}</span>
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;