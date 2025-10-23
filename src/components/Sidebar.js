import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const getLinkClassName = ({ isActive }) =>
    `flex flex-col items-center gap-1 ${
      isActive
        ? 'text-primary'
        : 'text-gray-500 dark:text-gray-400'
    }`;

  const getIconClassName = (isActive) =>
    `material-symbols-outlined ${isActive ? 'filled' : ''}`;

  return (
    <aside className="hidden md:flex md:w-24 flex-col items-center justify-center space-y-8 border-r border-gray-200 dark:border-gray-800 bg-card-light dark:bg-card-dark">
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
    </aside>
  );
};

export default Sidebar;
