import React, { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import { AuthContext } from '../contexts/AuthContext';

const SettingsPage = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { user, loading, signInWithGoogle, signOutUser } = useContext(AuthContext);

  return (
    <div id="settings-page" className="page">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-transparent bg-background-light/80 p-4 pb-2 backdrop-blur-sm dark:border-border-dark dark:bg-background-dark/80">
        <div className="w-12">
          <button className="nav-link flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-900 dark:text-text-light hover:bg-gray-200 dark:hover:bg-hover-dark" data-page="dashboard">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
        <h1 className="flex-1 text-center text-lg font-bold text-gray-900 dark:text-text-light">Settings</h1>
        <div className="w-12"></div>
      </header>
      <main className="p-4 space-y-6">
        <div className="p-4 bg-card-light dark:bg-card-dark rounded-xl">
          <h2 className="font-bold mb-2 text-gray-900 dark:text-text-light">Account</h2>
          <div id="user-info-container" className="text-center">
            {loading ? (
              <p className="text-sm text-gray-600 dark:text-text-dark mb-4">Connecting...</p>
            ) : user ? (
              <>
                <p className="text-sm text-gray-600 dark:text-text-dark mb-4">Signed in as: {user.email}</p>
                <button onClick={signOutUser} id="sign-out-btn" className="w-full rounded-lg bg-gray-200 py-2.5 px-4 font-semibold text-gray-800 shadow-sm hover:bg-gray-300 dark:bg-hover-dark dark:text-text-light dark:hover:bg-opacity-80">Sign Out</button>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600 dark:text-text-dark mb-4">You are not signed in.</p>
                <button onClick={signInWithGoogle} id="google-login-btn" className="w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-2.5 px-4 font-semibold text-white shadow-sm hover:bg-red-600">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42v20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.659-.138-3.965-.389-5.234z" /><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" /><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" /><path fill="#1976D2" d="M43.611 20.083H42v20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.574l6.19 5.238C42.012 35.836 44 30.138 44 24c0-2.659-.138-3.965-.389-5.234z" /></svg>
                  Sign In with Google
                </button>
              </>
            )}
          </div>
        </div>
        <div className="p-4 bg-card-light dark:bg-card-dark rounded-xl">
          <h2 className="font-bold mb-2 text-gray-900 dark:text-text-light">Appearance</h2>
          <div className="flex justify-between items-center text-gray-900 dark:text-text-light">
            <span>Dark Mode</span>
            <button onClick={toggleDarkMode} className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 dark:bg-gray-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark">
              <span className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}>
                <span className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${darkMode ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'}`}>
                  <span className="material-symbols-outlined !text-base text-gray-400">light_mode</span>
                </span>
                <span className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${darkMode ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'}`}>
                  <span className="material-symbols-outlined !text-base text-primary">dark_mode</span>
                </span>
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
