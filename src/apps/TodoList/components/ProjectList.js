import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects, selectedProject, onSelectProject }) => {
  return (
    <nav className="space-y-1.5">
      <Link to="/todo-list" onClick={() => onSelectProject('inbox')} className={`flex items-center gap-4 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${selectedProject === 'inbox' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'}`}>
        <span className="material-symbols-outlined text-lg">inbox</span>
        <span>Inbox</span>
      </Link>
      <Link to="today" onClick={() => onSelectProject('today')} className={`flex items-center gap-4 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${selectedProject === 'today' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'}`}>
        <span className="material-symbols-outlined text-lg">today</span>
        <span>Today</span>
      </Link>
      <Link to="upcoming" onClick={() => onSelectProject('upcoming')} className={`flex items-center gap-4 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${selectedProject === 'upcoming' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'}`}>
        <span className="material-symbols-outlined text-lg">upcoming</span>
        <span>Upcoming</span>
      </Link>
      <Link to="calendar" onClick={() => onSelectProject('calendar')} className={`flex items-center gap-4 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${selectedProject === 'calendar' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'}`}>
        <span className="material-symbols-outlined text-lg">bookmarks</span>
        <span>Calendar</span>
      </Link>
      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-8 mb-4 px-4">Projects</h3>
      {projects.map(project => (
        <a key={project.id} onClick={() => onSelectProject(project.id)} className={`flex items-center gap-4 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 group ${selectedProject === project.id ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'}`}>
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
          <span>{project.name}</span>
          <span className="material-symbols-outlined text-base ml-auto text-transparent group-hover:text-slate-500 dark:group-hover:text-slate-400">more_horiz</span>
        </a>
      ))}
    </nav>
  );
};

export default ProjectList;
