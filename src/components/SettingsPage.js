import React, { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import { AuthContext } from '../contexts/AuthContext';

const SettingsPage = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { user, loading, signInWithGoogle, signOutUser } = useContext(AuthContext);

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        </header>
        <div className="space-y-8">
          <div className="p-4 bg-glass-light dark:bg-glass-dark backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-800/50">
            <h2 className="font-bold mb-2 text-slate-900 dark:text-slate-200">Account</h2>
            <div id="user-info-container" className="text-center">
              {loading ? (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Connecting...</p>
              ) : user ? (
                <>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Signed in as: {user.email}</p>
                  <button onClick={signOutUser} id="sign-out-btn" className="w-full rounded-lg bg-slate-200 py-2.5 px-4 font-semibold text-slate-800 shadow-sm hover:bg-slate-300 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:bg-opacity-80">Sign Out</button>
                </>
              ) : (
                <>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">You are not signed in.</p>
                  <button onClick={signInWithGoogle} id="google-login-btn" className="w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-2.5 px-4 font-semibold text-white shadow-sm hover:bg-red-600">
                    Sign In with Google
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="p-4 bg-glass-light dark:bg-glass-dark backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-800/50">
            <h2 className="font-bold mb-2 text-slate-900 dark:text-slate-200">Appearance</h2>
            <div className="flex justify-between items-center text-slate-900 dark:text-slate-200">
              <span>Dark Mode</span>
              <button onClick={toggleDarkMode} className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 dark:bg-slate-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark">
                <span className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}>
                  <span className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${darkMode ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'}`}>
                    <span className="material-symbols-outlined !text-base text-slate-400">light_mode</span>
                  </span>
                  <span className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${darkMode ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'}`}>
                    <span className="material-symbols-outlined !text-base text-primary">dark_mode</span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
