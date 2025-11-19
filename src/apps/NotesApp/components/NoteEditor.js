import React from 'react';

const NoteEditor = ({ note, onUpdateNote }) => {
    if (!note) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50/50 dark:bg-gray-900/50 text-gray-400 dark:text-gray-500">
                <div className="text-center">
                    <span className="material-symbols-outlined text-6xl mb-4 opacity-50">edit_note</span>
                    <p className="text-xl">Select a note to view or edit</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="p-8 max-w-4xl mx-auto w-full h-full flex flex-col">
                <input
                    type="text"
                    value={note.title}
                    onChange={(e) => onUpdateNote(note.id, { title: e.target.value })}
                    placeholder="Note Title"
                    className="text-4xl font-bold text-gray-800 dark:text-gray-100 bg-transparent border-none outline-none placeholder-gray-300 dark:placeholder-gray-600 mb-6 w-full"
                />
                <textarea
                    value={note.content}
                    onChange={(e) => onUpdateNote(note.id, { content: e.target.value })}
                    placeholder="Start typing..."
                    className="flex-1 resize-none text-lg leading-relaxed text-gray-600 dark:text-gray-300 bg-transparent border-none outline-none placeholder-gray-300 dark:placeholder-gray-600 w-full"
                />
                <div className="mt-4 text-xs text-gray-400 dark:text-gray-500 text-right">
                    Last edited: {note.updatedAt ? new Date(note.updatedAt.seconds * 1000).toLocaleString() : 'Just now'}
                </div>
            </div>
        </div>
    );
};

export default NoteEditor;
