import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  return (
    <footer className="sticky bottom-0 z-10 bg-glass-light/90 dark:bg-glass-dark/90 backdrop-blur-sm md:hidden">
      <nav className="flex justify-around">
        <NavLink to="/subscription-tracker" end className={getLinkClassName}>
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined">dashboard</span>
              <p className="text-xs font-medium">Dashboard</p>
            </>
          )}
        </NavLink>
        <NavLink to="/subscription-tracker/add-new" className={getLinkClassName}>
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined">add_box</span>
              <p className="text-xs font-medium">Add New</p>
            </>
          )}
        </NavLink>
        <NavLink to="/subscription-tracker/settings" className={getLinkClassName}>
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined">settings</span>
              <p className="text-xs font-medium">Settings</p>
            </>
          )}
        </NavLink>
      </nav>
    </footer>
  );
};

const getLinkClassName = ({ isActive }) =>
  `flex flex-col items-center gap-1 rounded-lg p-2 transition-colors duration-200 ${
    isActive
      ? 'text-primary'
      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
  }`;

export default BottomNav;
