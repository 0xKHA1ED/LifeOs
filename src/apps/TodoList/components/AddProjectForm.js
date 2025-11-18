import React, { useState } from 'react';

const AddProjectForm = ({ onAddProject }) => {
  const [name, setName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAddProject({
        name,
        created_at: new Date(),
      });
      setName('');
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    setName('');
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-600 transition-all duration-200 shadow-glow"
      >
        <span className="material-symbols-outlined text-lg">add</span>
        <span>New Project</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
        autoFocus
        className="w-full px-3 py-2 text-sm bg-white/60 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 px-3 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-600 transition-all duration-200"
        >
          Add
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-300/50 dark:hover:bg-slate-600/50 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddProjectForm;
