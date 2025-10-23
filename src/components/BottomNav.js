import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  const getLinkClassName = ({ isActive }) =>
    `flex flex-col items-center gap-1 ${
      isActive
        ? 'text-primary'
        : 'text-gray-500 dark:text-gray-400'
    }`;

  const getIconClassName = (isActive) =>
    `material-symbols-outlined ${isActive ? 'filled' : ''}`;

  return (
    <footer className="sticky bottom-0 z-10 border-t border-gray-200 bg-background-light/90 pb-safe-area-inset-bottom pt-2 backdrop-blur-sm dark:border-gray-800 dark:bg-background-dark/90 md:hidden">
      <nav className="flex justify-around">
        <NavLink to="/" className={getLinkClassName}>
          {({ isActive }) => (
            <>
              <span className={getIconClassName(isActive)}>dashboard</span>
              <p className="text-xs font-medium">Dashboard</p>
            </>
          )}
        </NavLink>
        <NavLink to="/add-new" className={getLinkClassName}>
          {({ isActive }) => (
            <>
              <span className={getIconClassName(isActive)}>add_box</span>
              <p className="text-xs font-medium">Add New</p>
            </>
          )}
        </NavLink>
        <NavLink to="/settings" className={getLinkClassName}>
          {({ isActive }) => (
            <>
              <span className={getIconClassName(isActive)}>settings</span>
              <p className="text-xs font-medium">Settings</p>
            </>
          )}
        </NavLink>
      </nav>
    </footer>
  );
};

export default BottomNav;
