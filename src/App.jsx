import { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import SearchFilter from './components/SearchFilter';
import SubmissionForm from './components/SubmissionForm';

const API_BASE = 'https://iedc-innovation-hub.onrender.com/api/projects';

const PREDEFINED_CATEGORIES = ['AI', 'EdTech', 'FinTech', 'HealthTech', 'Sustainability', 'IoT'];

const CATEGORY_COLOR_PALETTE = [
  { bg: 'bg-violet-light', text: 'text-violet', border: 'border-violet/30', accent: 'bg-violet' },
  { bg: 'bg-blue-light', text: 'text-blue', border: 'border-blue/30', accent: 'bg-blue' },
  { bg: 'bg-green-light', text: 'text-green', border: 'border-green/30', accent: 'bg-green' },
  { bg: 'bg-rose-light', text: 'text-rose', border: 'border-rose/30', accent: 'bg-rose' },
  { bg: 'bg-emerald-light', text: 'text-emerald', border: 'border-emerald/30', accent: 'bg-emerald' },
  { bg: 'bg-amber-light', text: 'text-amber', border: 'border-amber/30', accent: 'bg-amber' },
  { bg: 'bg-cyan-light', text: 'text-cyan', border: 'border-cyan/30', accent: 'bg-cyan' },
  { bg: 'bg-indigo-light', text: 'text-indigo', border: 'border-indigo/30', accent: 'bg-indigo' },
  { bg: 'bg-pink-light', text: 'text-pink', border: 'border-pink/30', accent: 'bg-pink' },
  { bg: 'bg-lime-light', text: 'text-lime', border: 'border-lime/30', accent: 'bg-lime' },
];

const PREDEFINED_COLORS = {
  AI: CATEGORY_COLOR_PALETTE[0],
  EdTech: CATEGORY_COLOR_PALETTE[1],
  FinTech: CATEGORY_COLOR_PALETTE[2],
  HealthTech: CATEGORY_COLOR_PALETTE[3],
  Sustainability: CATEGORY_COLOR_PALETTE[4],
  IoT: CATEGORY_COLOR_PALETTE[5],
};

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getCategoryColor(domain) {
  if (PREDEFINED_COLORS[domain]) {
    return PREDEFINED_COLORS[domain];
  }
  const index = hashString(domain) % CATEGORY_COLOR_PALETTE.length;
  return CATEGORY_COLOR_PALETTE[index];
}

function App() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const allCategories = useMemo(() => {
    const categories = new Set(PREDEFINED_CATEGORIES);
    projects.forEach(p => categories.add(p.domain));
    return Array.from(categories).sort((a, b) => {
      const aPredefined = PREDEFINED_CATEGORIES.includes(a);
      const bPredefined = PREDEFINED_CATEGORIES.includes(b);
      if (aPredefined && !bPredefined) return -1;
      if (!aPredefined && bPredefined) return 1;
      return a.localeCompare(b);
    });
  }, [projects]);

  const projectCount = projects.length;
  const categoryCount = allCategories.length;
  const totalVotes = projects.reduce((sum, p) => sum + (p.votes || 0), 0);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (selectedCategory) params.append('domain', selectedCategory);
      const response = await fetch(`${API_BASE}?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    let mounted = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects().then(() => {
      if (!mounted) return;
    });
    return () => { mounted = false; };
  }, [fetchProjects]);

  const handleVote = async (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const newVotes = project.votes + 1;
    const updatedProject = { ...project, votes: newVotes };
    setProjects(prev => prev.map(p => p.id === projectId ? updatedProject : p));

    try {
      const response = await fetch(`${API_BASE}/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: project.status, votes: newVotes }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update vote');
      }
    } catch (err) {
      console.error('Vote sync error:', err);
      setProjects(prev => prev.map(p => p.id === projectId ? project : p));
    }
  };

  const handleSubmit = async (projectData) => {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit project');
    }

    const newProject = await response.json();
    setProjects(prev => [newProject, ...prev]);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || project.domain.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const scrollToSubmit = () => {
    const element = document.getElementById('submit');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <Header />

      <main>
        <Hero 
          onScrollToSubmit={scrollToSubmit} 
          projectCount={projectCount}
          categoryCount={categoryCount}
          totalVotes={totalVotes}
        />

        <section id="projects" className="py-14 sm:py-20 bg-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-eyebrow mb-3">Showcase</p>
              <h2 className="text-section text-navy mb-3">
                Ideas Taking Shape
              </h2>
              <p className="text-lead max-w-2xl">
                Explore what fellow innovators are building. Search, filter, and show support.
              </p>
            </div>

            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={allCategories}
            />

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-bg-card rounded-lg border border-slate-200 p-5 animate-pulse">
                    <div className="h-5 bg-slate-200 rounded w-3/4 mb-3" />
                    <div className="h-4 bg-slate-200 rounded w-full mb-1.5" />
                    <div className="h-4 bg-slate-200 rounded w-5/6 mb-1.5" />
                    <div className="h-4 bg-slate-200 rounded w-4/6" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <svg className="w-14 h-14 mx-auto text-rose mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-lg font-medium text-navy mb-1">Failed to load projects</h3>
                <p className="text-slate-500 mb-3">{error}</p>
                <button
                  onClick={fetchProjects}
                  className="px-4 py-2 rounded-lg bg-navy text-white font-medium hover:bg-navy-light transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <ProjectGrid projects={filteredProjects} onVote={handleVote} getCategoryColor={getCategoryColor} />
            )}
          </div>
        </section>

        <SubmissionForm onSubmit={handleSubmit} predefinedCategories={PREDEFINED_CATEGORIES} />
      </main>

      <footer className="bg-navy text-slate-400 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>IEDC Innovation Hub &copy; 2026. Building the future, one idea at a time.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;