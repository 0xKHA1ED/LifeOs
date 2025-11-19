import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects, selectedProject, onSelectProject }) => {
  return (
    <nav className="space-y-3">
      <Link to="/todo-list" onClick={() => onSelectProject('inbox')} className={`flex items-center gap-3 px-4 py-3 border-2 border-black transition-all duration-200 ${selectedProject === 'inbox' ? 'bg-primary text-white shadow-neo translate-x-1 -translate-y-1' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:-translate-y-1 hover:shadow-neo'}`}>
        <span className="material-symbols-outlined">inbox</span>
        <span className="font-bold">Inbox</span>
      </Link>
      <Link to="today" onClick={() => onSelectProject('today')} className={`flex items-center gap-3 px-4 py-3 border-2 border-black transition-all duration-200 ${selectedProject === 'today' ? 'bg-accent text-white shadow-neo translate-x-1 -translate-y-1' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:-translate-y-1 hover:shadow-neo'}`}>
        <span className="material-symbols-outlined">today</span>
        <span className="font-bold">Today</span>
      </Link>
      <Link to="upcoming" onClick={() => onSelectProject('upcoming')} className={`flex items-center gap-3 px-4 py-3 border-2 border-black transition-all duration-200 ${selectedProject === 'upcoming' ? 'bg-indigo-500 text-white shadow-neo translate-x-1 -translate-y-1' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:-translate-y-1 hover:shadow-neo'}`}>
        <span className="material-symbols-outlined">upcoming</span>
        <span className="font-bold">Upcoming</span>
      </Link>
      <Link to="calendar" onClick={() => onSelectProject('calendar')} className={`flex items-center gap-3 px-4 py-3 border-2 border-black transition-all duration-200 ${selectedProject === 'calendar' ? 'bg-emerald-500 text-white shadow-neo translate-x-1 -translate-y-1' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:-translate-y-1 hover:shadow-neo'}`}>
        <span className="material-symbols-outlined">bookmarks</span>
        <span className="font-bold">Calendar</span>
      </Link>

      <div className="mt-8 mb-4 px-2 flex items-center justify-between">
        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Projects</h3>
        <span className="text-xs font-bold bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-none border border-black">{projects.length}</span>
      </div>

      <div className="space-y-2">
        {projects.map(project => (
          <a key={project.id} onClick={() => onSelectProject(project.id)} className={`flex items-center gap-3 px-4 py-2.5 border-2 border-transparent hover:border-black transition-all duration-200 group cursor-pointer ${selectedProject === project.id ? 'bg-slate-100 dark:bg-slate-800 border-black font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'}`}>
            <span className="w-3 h-3 border-2 border-black bg-indigo-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></span>
            <span>{project.name}</span>
            <span className="material-symbols-outlined text-base ml-auto opacity-0 group-hover:opacity-100 transition-opacity">more_horiz</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default ProjectList;
