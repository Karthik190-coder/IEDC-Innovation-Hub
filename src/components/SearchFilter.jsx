function SearchFilter({ searchTerm, onSearchChange, selectedCategory, onCategoryChange, categories }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-10">
      <div className="relative flex-1">
        <label htmlFor="search" className="sr-only">Search projects</label>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by title..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange/30 focus:ring-offset-0 focus:border-orange transition-all duration-150 input-focus"
          />
        </div>
      </div>

      <div className="relative">
        <label htmlFor="category" className="sr-only">Filter by category</label>
        <div className="relative">
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full sm:w-48 pl-4 pr-10 py-2.5 rounded-lg border border-slate-200 bg-white text-navy focus:outline-none focus:ring-2 focus:ring-orange/30 focus:ring-offset-0 focus:border-orange appearance-none transition-all duration-150 cursor-pointer input-focus"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;