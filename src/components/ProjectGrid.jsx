import ProjectCard from './ProjectCard';

function ProjectGrid({ projects, onVote, getCategoryColor }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium text-navy mb-2">No projects found</h3>
        <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onVote={onVote} getCategoryColor={getCategoryColor} />
      ))}
    </div>
  );
}

export default ProjectGrid;