import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const HomePage = () => {
  const { user, signInWithGoogle } = useContext(AuthContext);

  // Reusable styles for the brutalist card look
  const cardBaseStyle = "group relative flex flex-col items-start p-6 border-4 border-black rounded-lg transition-all duration-200 ease-out hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";

  return (
    <div className="min-h-screen w-full bg-[#f0f0f0] text-slate-900 font-sans selection:bg-pink-400 selection:text-white flex flex-col">

      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">

        {/* Hero Section */}
        <div className="max-w-4xl w-full text-center mb-16">
          <div className="inline-block bg-white border-4 border-black p-4 md:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-2">
              Life<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">OS</span>
            </h1>
            <p className="text-xl font-bold font-mono text-slate-600">v0.1.0 // SYSTEM_ONLINE</p>
          </div>
          <p className="text-xl font-medium max-w-md mx-auto bg-yellow-200 border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Organize your chaos. Boldly.
          </p>
        </div>

        {/* App Grid */}
        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">

            {/* Subscription Tracker Card */}
            <Link to="/subscription-tracker" className={`${cardBaseStyle} bg-rose-300 hover:bg-rose-400`}>
              <div className="bg-white border-2 border-black p-3 rounded-md mb-4">
                <span className="material-symbols-outlined text-4xl text-black">credit_card</span>
              </div>
              <h2 className="text-2xl font-black uppercase mb-2">Subscriptions</h2>
              <p className="font-mono text-sm font-bold opacity-80">
                TRACK EXPENSES & BILLS
              </p>
              <div className="mt-auto pt-4 w-full flex justify-end">
                <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </Link>

            {/* To-Do List Card */}
            <Link to="/todo-list" className={`${cardBaseStyle} bg-lime-300 hover:bg-lime-400`}>
              <div className="bg-white border-2 border-black p-3 rounded-md mb-4">
                <span className="material-symbols-outlined text-4xl text-black">check_box</span>
              </div>
              <h2 className="text-2xl font-black uppercase mb-2">To-Do List</h2>
              <p className="font-mono text-sm font-bold opacity-80">
                EXECUTE TASKS & GOALS
              </p>
              <div className="mt-auto pt-4 w-full flex justify-end">
                <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </Link>

            {/* Notes Card */}
            <Link to="/notes-app" className={`${cardBaseStyle} bg-amber-300 hover:bg-amber-400`}>
              <div className="bg-white border-2 border-black p-3 rounded-md mb-4">
                <span className="material-symbols-outlined text-4xl text-black">edit_note</span>
              </div>
              <h2 className="text-2xl font-black uppercase mb-2">Notes</h2>
              <p className="font-mono text-sm font-bold opacity-80">
                BRAINDUMP & ARCHIVE
              </p>
              <div className="mt-auto pt-4 w-full flex justify-end">
                <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </Link>

          </div>
        ) : (
          /* Auth Section */
          <div className="w-full max-w-md">
            <button
              onClick={signInWithGoogle}
              className="w-full group relative bg-white text-black text-xl font-black uppercase border-4 border-black py-4 px-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-2 active:translate-y-2 active:shadow-none transition-all duration-150"
            >
              <div className="flex items-center justify-center gap-3">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-8 h-8" alt="Google" />
                <span>Access System</span>
              </div>
            </button>
            <p className="mt-4 text-center font-mono text-sm text-slate-500 font-bold">
              SECURE ENTRY REQUIRED
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
