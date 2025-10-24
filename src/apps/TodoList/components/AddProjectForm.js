import React, { useState } from 'react';

const AddProjectForm = ({ onAddProject }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAddProject({
        name,
        created_at: new Date(),
      });
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-600 transition-all duration-200 shadow-glow">
        <span className="material-symbols-outlined text-lg">add</span>
        <span>New Project</span>
      </button>
    </form>
  );
};

export default AddProjectForm;
