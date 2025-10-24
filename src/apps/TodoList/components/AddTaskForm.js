import React, { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');
  const [priority, setPriority] = useState(4);
  const [repeat, setRepeat] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        title,
        due_date: dueDate,
        tags: tags.split(',').map(tag => tag.trim()),
        priority: parseInt(priority),
        repeat_rule: repeat,
        is_completed: false,
        created_at: new Date(),
      });
      setTitle('');
      setDueDate('');
      setTags('');
      setPriority(4);
      setRepeat('');
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="relative group">
        <input
          className="w-full pl-12 pr-4 py-3 text-sm bg-white/60 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
          placeholder="Add a new task..."
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none group-focus-within:text-primary transition-colors">add</span>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" />
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
            <option value={1}>P1</option>
            <option value={2}>P2</option>
            <option value={3}>P3</option>
            <option value={4}>P4</option>
          </select>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags" className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" />
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
