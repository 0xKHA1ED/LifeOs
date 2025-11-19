import React, { useState, useEffect, useContext } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';

const NotesApp = () => {
    const { user } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const appId = 'default-notes-app';
            const collectionPath = `/artifacts/${appId}/users/${user.uid}/notes`;

            const unsubscribe = onSnapshot(collection(db, collectionPath), (snapshot) => {
                const notesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })).sort((a, b) => {
                    // Sort by updatedAt descending, fallback to createdAt
                    const dateA = a.updatedAt?.seconds || a.createdAt?.seconds || 0;
                    const dateB = b.updatedAt?.seconds || b.createdAt?.seconds || 0;
                    return dateB - dateA;
                });

                setNotes(notesData);
                setLoading(false);

                // If no note is selected and we have notes, select the first one (optional, maybe better to show empty state)
                // if (!selectedNoteId && notesData.length > 0) {
                //   setSelectedNoteId(notesData[0].id);
                // }
            });

            return () => unsubscribe();
        } else {
            setNotes([]);
            setLoading(false);
        }
    }, [user]);

    const handleAddNote = async () => {
        if (user) {
            const appId = 'default-notes-app';
            const collectionPath = `/artifacts/${appId}/users/${user.uid}/notes`;

            const newNote = {
                title: '',
                content: '',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            const docRef = await addDoc(collection(db, collectionPath), newNote);
            setSelectedNoteId(docRef.id);
        }
    };

    const handleUpdateNote = async (id, updates) => {
        if (user) {
            // Optimistic update for UI responsiveness
            setNotes(prevNotes => prevNotes.map(note =>
                note.id === id ? { ...note, ...updates } : note
            ));

            const appId = 'default-notes-app';
            const docPath = `/artifacts/${appId}/users/${user.uid}/notes/${id}`;
            const docRef = doc(db, docPath);

            // Debounce could be added here if needed, but Firestore handles frequent writes reasonably well for this scale
            await updateDoc(docRef, {
                ...updates,
                updatedAt: serverTimestamp()
            });
        }
    };

    const handleDeleteNote = async (id) => {
        if (user) {
            if (window.confirm('Are you sure you want to delete this note?')) {
                const appId = 'default-notes-app';
                const docPath = `/artifacts/${appId}/users/${user.uid}/notes/${id}`;
                await deleteDoc(doc(db, docPath));

                if (selectedNoteId === id) {
                    setSelectedNoteId(null);
                }
            }
        }
    };

    const selectedNote = notes.find(n => n.id === selectedNoteId);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Sidebar
                notes={notes}
                selectedNoteId={selectedNoteId}
                onSelectNote={setSelectedNoteId}
                onAddNote={handleAddNote}
                onDeleteNote={handleDeleteNote}
            />
            <NoteEditor
                note={selectedNote}
                onUpdateNote={handleUpdateNote}
            />
        </div>
    );
};

export default NotesApp;
