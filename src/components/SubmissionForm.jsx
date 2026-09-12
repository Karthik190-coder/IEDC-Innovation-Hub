import { useState, useEffect } from 'react';

function SubmissionForm({ onSubmit, predefinedCategories }) {
  const [formData, setFormData] = useState({
    founderName: '',
    startupTitle: '',
    category: '',
    customCategory: '',
    summary: '',
    pitchDeckLink: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const categoriesWithOther = [...predefinedCategories, 'Other...'];

  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateCustomCategory = (category) => {
    const trimmed = category.trim();
    if (!trimmed) return 'Custom category is required';
    if (trimmed.length < 2) return 'Custom category must be at least 2 characters';
    if (trimmed.length > 30) return 'Custom category must be at most 30 characters';
    if (!/^[a-zA-Z0-9\s\-&]+$/.test(trimmed)) {
      return 'Custom category can only contain letters, numbers, spaces, hyphens, and &';
    }
    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.founderName.trim()) {
      newErrors.founderName = 'Founder name is required';
    }

    if (!formData.startupTitle.trim()) {
      newErrors.startupTitle = 'Startup title is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    } else if (formData.category === 'Other...') {
      const customError = validateCustomCategory(formData.customCategory);
      if (customError) {
        newErrors.customCategory = customError;
      }
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required';
    }

    if (formData.pitchDeckLink.trim() && !validateUrl(formData.pitchDeckLink)) {
      newErrors.pitchDeckLink = 'Please enter a valid URL (e.g., https://example.com)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const domain = formData.category === 'Other...' 
        ? formData.customCategory.trim() 
        : formData.category;

      const projectData = {
        title: formData.startupTitle,
        domain,
        teamLead: formData.founderName,
        abstract: formData.summary,
        pitchDeckLink: formData.pitchDeckLink,
      };

      await onSubmit(projectData);

      setSubmitStatus('success');
      setFormData({
        founderName: '',
        startupTitle: '',
        category: '',
        customCategory: '',
        summary: '',
        pitchDeckLink: '',
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (fieldName) => `
    w-full px-4 py-2.5 rounded-lg border bg-white text-navy placeholder-slate-400 
    focus:outline-none focus:ring-2 focus:ring-orange/30 focus:ring-offset-0 focus:border-orange transition-all duration-150
    ${errors[fieldName] ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' : 'border-slate-200'}
  `.trim();

  const showCustomCategory = formData.category === 'Other...';

  return (
    <section id="submit" className="relative bg-bg overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Motivational Copy */}
          <div className="max-w-lg mx-auto lg:mx-0 pt-4 lg:pt-8 animate-fade-in-up">
            <p className="text-eyebrow mb-4">Your Turn</p>
            <h2 className="text-display-sm text-navy mb-5 leading-[1.1]">
              You've seen what others are building.<br />
              <span className="text-orange">Now add your idea.</span>
            </h2>
            <p className="text-lead mb-8">
              You don't need everything figured out. Start with the problem you want to solve.
            </p>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-orange/10 flex items-center justify-center text-orange font-bold text-xs">1</span>
                <span>Fill in the basics — name, title, category</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-orange/10 flex items-center justify-center text-orange font-bold text-xs">2</span>
                <span>Describe the problem and your solution</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-orange/10 flex items-center justify-center text-orange font-bold text-xs">3</span>
                <span>Add a pitch deck link if you have one</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-orange/10 flex items-center justify-center text-orange font-bold text-xs">4</span>
                <span>Submit and join the showcase</span>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-lg bg-white border border-slate-200">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <p className="text-sm text-slate-600">Your idea will appear in the showcase immediately after submission. Community votes help promising projects get noticed.</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="animate-fade-in-up delay-1">
            <form onSubmit={handleSubmit} className="bg-bg-card rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm" noValidate>
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="founderName" className="block text-sm font-medium text-navy mb-1.5">
                      Founder Name
                    </label>
                    <input
                      type="text"
                      id="founderName"
                      name="founderName"
                      value={formData.founderName}
                      onChange={handleChange}
                      className={inputClass('founderName')}
                      placeholder="Your full name"
                      aria-invalid={errors.founderName ? 'true' : 'false'}
                      aria-describedby={errors.founderName ? 'founderName-error' : undefined}
                      disabled={isSubmitting}
                    />
                    {errors.founderName && (
                      <p id="founderName-error" className="mt-1 text-sm text-red-500" role="alert">{errors.founderName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="startupTitle" className="block text-sm font-medium text-navy mb-1.5">
                      Startup Title
                    </label>
                    <input
                      type="text"
                      id="startupTitle"
                      name="startupTitle"
                      value={formData.startupTitle}
                      onChange={handleChange}
                      className={inputClass('startupTitle')}
                      placeholder="Name of your startup/idea"
                      aria-invalid={errors.startupTitle ? 'true' : 'false'}
                      aria-describedby={errors.startupTitle ? 'startupTitle-error' : undefined}
                      disabled={isSubmitting}
                    />
                    {errors.startupTitle && (
                      <p id="startupTitle-error" className="mt-1 text-sm text-red-500" role="alert">{errors.startupTitle}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-navy mb-1.5">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputClass('category') + ' cursor-pointer'}
                    aria-invalid={errors.category ? 'true' : 'false'}
                    aria-describedby={errors.category ? 'category-error' : undefined}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a category</option>
                    {categoriesWithOther.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p id="category-error" className="mt-1 text-sm text-red-500" role="alert">{errors.category}</p>
                  )}

                  {showCustomCategory && (
                    <div className="mt-3">
                      <label htmlFor="customCategory" className="block text-sm font-medium text-navy mb-1.5">
                        Custom Category
                      </label>
                      <input
                        type="text"
                        id="customCategory"
                        name="customCategory"
                        value={formData.customCategory}
                        onChange={handleChange}
                        className={inputClass('customCategory')}
                        placeholder="e.g., AgriTech, SpaceTech, BioTech"
                        aria-invalid={errors.customCategory ? 'true' : 'false'}
                        aria-describedby={errors.customCategory ? 'customCategory-error' : undefined}
                        disabled={isSubmitting}
                      />
                      {errors.customCategory && (
                        <p id="customCategory-error" className="mt-1 text-sm text-red-500" role="alert">{errors.customCategory}</p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="summary" className="block text-sm font-medium text-navy mb-1.5">
                    Summary / Abstract
                  </label>
                  <textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    rows={5}
                    className={inputClass('summary') + ' resize-y min-h-[120px]'}
                    placeholder="Describe your idea, the problem it solves, target audience, and unique value proposition..."
                    aria-invalid={errors.summary ? 'true' : 'false'}
                    aria-describedby={errors.summary ? 'summary-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.summary && (
                    <p id="summary-error" className="mt-1 text-sm text-red-500" role="alert">{errors.summary}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="pitchDeckLink" className="block text-sm font-medium text-navy mb-1.5">
                    Pitch Deck Link <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="url"
                    id="pitchDeckLink"
                    name="pitchDeckLink"
                    value={formData.pitchDeckLink}
                    onChange={handleChange}
                    className={inputClass('pitchDeckLink')}
                    placeholder="https://drive.google.com/... or https://docs.google.com/..."
                    aria-invalid={errors.pitchDeckLink ? 'true' : 'false'}
                    aria-describedby={errors.pitchDeckLink ? 'pitchDeckLink-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.pitchDeckLink && (
                    <p id="pitchDeckLink-error" className="mt-1 text-sm text-red-500" role="alert">{errors.pitchDeckLink}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-lg bg-navy text-white font-semibold text-base hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-orange/30 focus:ring-offset-0 focus:border-orange transition-all duration-150 shadow-sm flex items-center justify-center gap-2 btn-primary"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Idea'
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 rounded-lg bg-emerald-light border border-emerald/30 text-emerald animate-fade-in-up" role="alert">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span className="font-medium">Idea submitted successfully!</span>
                    </div>
                    <p className="mt-1 text-sm">Your idea has been submitted and will appear in the projects list shortly.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 rounded-lg bg-rose-light border border-rose/30 text-rose animate-fade-in-up" role="alert">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                      </svg>
                      <span className="font-medium">Submission Failed</span>
                    </div>
                    <p className="mt-1 text-sm">Something went wrong. Please try again.</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SubmissionForm;