import React from 'react';

const Sidebar = ({ notes, selectedNoteId, onSelectNote, onAddNote, onDeleteNote }) => {
    return (
        <aside className="w-80 flex-shrink-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 flex flex-col h-full transition-colors duration-300">
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
                <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-yellow-500 text-3xl">description</span>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Notes</h2>
                </div>
                <button
                    onClick={onAddNote}
                    className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl shadow-lg shadow-yellow-500/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined">add</span>
                    New Note
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {notes.length === 0 ? (
                    <div className="text-center text-gray-400 dark:text-gray-500 mt-10">
                        <p>No notes yet.</p>
                        <p className="text-sm">Create one to get started!</p>
                    </div>
                ) : (
                    notes.map((note) => (
                        <div
                            key={note.id}
                            onClick={() => onSelectNote(note.id)}
                            className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 border border-transparent ${selectedNoteId === note.id
                                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700/30 shadow-sm'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                        >
                            <h3 className={`font-semibold mb-1 truncate ${selectedNoteId === note.id ? 'text-yellow-700 dark:text-yellow-400' : 'text-gray-700 dark:text-gray-200'
                                }`}>
                                {note.title || 'Untitled Note'}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {note.content || 'No content'}
                            </p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteNote(note.id);
                                }}
                                className="absolute right-2 top-2 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all duration-200"
                                title="Delete note"
                            >
                                <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
