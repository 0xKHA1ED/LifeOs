import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="hidden md:flex md:w-72 flex-shrink-0 bg-glass-light dark:bg-glass-dark backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 p-6 flex-col justify-between transition-colors duration-300">
      <div className="flex items-center gap-3 mb-8">
        <span className="material-symbols-outlined text-primary text-3xl">subscriptions</span>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Subscriptions</h2>
      </div>
      <nav className="space-y-1.5">
        <NavLink to="/subscription-tracker" end className={getLinkClassName}>
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined text-lg">dashboard</span>
              <span>Dashboard</span>
            </>
          )}
        </NavLink>
        <NavLink to="/subscription-tracker/add-new" className={getLinkClassName}>
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined text-lg">add_box</span>
              <span>Add New</span>
            </>
          )}
        </NavLink>
        <NavLink to="/subscription-tracker/settings" className={getLinkClassName}>
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined text-lg">settings</span>
              <span>Settings</span>
            </>
          )}
        </NavLink>
      </nav>
    </aside>
  );
};

const getLinkClassName = ({ isActive }) =>
  `flex items-center gap-4 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
    isActive
      ? 'bg-primary/10 text-primary'
      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
  }`;

export default Sidebar;
