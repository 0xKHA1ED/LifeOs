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
          className="w-full pl-12 pr-4 py-4 text-sm font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 border-2 border-black focus:ring-0 focus:shadow-neo transition-all duration-200"
          placeholder="Add a new task..."
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="material-symbols-outlined absolute left-4 top-4 md:top-1/2 md:-translate-y-1/2 text-slate-900 dark:text-white font-bold pointer-events-none">add</span>
        <div className="md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 flex flex-wrap md:flex-nowrap items-center gap-2 mt-3 md:mt-0 opacity-100 md:opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 px-2 md:px-0">
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="flex-1 md:flex-none p-2 rounded-none border-2 border-black bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs focus:shadow-neo transition-all" />
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="flex-1 md:flex-none p-2 rounded-none border-2 border-black bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs focus:shadow-neo transition-all cursor-pointer">
            <option value={1}>P1</option>
            <option value={2}>P2</option>
            <option value={3}>P3</option>
            <option value={4}>P4</option>
          </select>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags" className="flex-1 md:flex-none p-2 w-full md:w-24 rounded-none border-2 border-black bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs focus:shadow-neo transition-all placeholder:text-slate-400" />
          <button type="submit" className="w-full md:w-auto p-2 bg-primary border-2 border-black text-white hover:bg-primary-600 hover:shadow-neo active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
            <span className="material-symbols-outlined text-lg font-bold">send</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
