import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const HomePage = () => {
  const { user, signInWithGoogle } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-white">LifeOS</h1>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">Your life, organized.</p>
        {user ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/subscription-tracker" className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Subscription Tracker</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage your subscriptions.</p>
          </Link>
          <Link to="/todo-list" className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">To-Do List</h2>
            <p className="text-gray-600 dark:text-gray-400">Organize your tasks.</p>
          </Link>
        </div>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
