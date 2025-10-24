import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import ProjectList from './components/ProjectList';
import AddProjectForm from './components/AddProjectForm';
import TodayPage from './components/TodayPage';
import UpcomingPage from './components/UpcomingPage';
import CalendarPage from './components/CalendarPage';
import QuickAdd from './components/QuickAdd';

const TodoList = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('inbox');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const appId = 'default-todo-list';
      const projectsCollectionPath = `/artifacts/${appId}/users/${user.uid}/projects`;
      const projectsUnsubscribe = onSnapshot(collection(db, projectsCollectionPath), (snapshot) => {
        const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectsData);
      });

      const tasksCollectionPath = `/artifacts/${appId}/users/${user.uid}/tasks`;
      const tasksUnsubscribe = onSnapshot(collection(db, tasksCollectionPath), (snapshot) => {
        const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksData);
        setLoading(false);
      });

      return () => {
        projectsUnsubscribe();
        tasksUnsubscribe();
      };
    } else {
      setTasks([]);
      setProjects([]);
      setLoading(false);
    }
  }, [user]);

  const handleAddTask = async (task) => {
    if (user) {
      const appId = 'default-todo-list';
      const collectionPath = `/artifacts/${appId}/users/${user.uid}/tasks`;
      await addDoc(collection(db, collectionPath), { ...task, projectId: selectedProject });
    }
  };

  const handleAddSubtask = async (parentId) => {
    const title = prompt('Enter subtask title:');
    if (title && user) {
      const appId = 'default-todo-list';
      const collectionPath = `/artifacts/${appId}/users/${user.uid}/tasks`;
      await addDoc(collection(db, collectionPath), {
        title,
        is_completed: false,
        parent_task_id: parentId,
        projectId: selectedProject,
        created_at: new Date(),
      });
    }
  };

  const handleAddProject = async (project) => {
    if (user) {
      const appId = 'default-todo-list';
      const collectionPath = `/artifacts/${appId}/users/${user.uid}/projects`;
      await addDoc(collection(db, collectionPath), project);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    if (user) {
      const appId = 'default-todo-list';
      const docPath = `/artifacts/${appId}/users/${user.uid}/tasks/${id}`;
      const docRef = doc(db, docPath);
      await updateDoc(docRef, updates);
    }
  };

  const handleDeleteTask = async (id) => {
    if (user) {
      const appId = 'default-todo-list';
      const docPath = `/artifacts/${appId}/users/${user.uid}/tasks/${id}`;
      await deleteDoc(doc(db, docPath));
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTasks = Array.from(tasks);
    const draggedTask = newTasks.find(task => task.id === draggableId);
    draggedTask.parent_task_id = destination.droppableId === 'root' ? null : destination.droppableId;
    
    // This is a simplified reordering logic. A more robust solution would involve updating the order in the database.
    setTasks(newTasks);
  };

  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');

  const filteredTasks = tasks
    .filter(task => {
      if (selectedProject === 'inbox') {
        return !task.projectId || task.projectId === 'inbox';
      }
      return task.projectId === selectedProject;
    })
    .filter(task => task.title.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'due_date') {
        return new Date(a.due_date) - new Date(b.due_date);
      }
      if (sortBy === 'priority') {
        return a.priority - b.priority;
      }
      return new Date(b.created_at) - new Date(a.created_at);
    });

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-72 flex-shrink-0 bg-glass-light dark:bg-glass-dark backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 p-6 flex flex-col justify-between transition-colors duration-300">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary text-3xl">task_alt</span>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">TaskFlow AI</h2>
          </div>
          <ProjectList projects={projects} selectedProject={selectedProject} onSelectProject={setSelectedProject} />
        </div>
        <div className="mt-8">
          <AddProjectForm onAddProject={handleAddProject} />
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={
              <>
                <header className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Inbox</h1>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Filter tasks"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-all duration-200"
                    />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-all duration-200"
                    >
                      <option value="created_at">Sort by Date</option>
                      <option value="due_date">Sort by Due Date</option>
                      <option value="priority">Sort by Priority</option>
                    </select>
                  </div>
                </header>
                <QuickAdd onAddTask={handleAddTask} />
                <AddTaskForm onAddTask={handleAddTask} />
                {loading ? (
                  <p>Loading tasks...</p>
                ) : (
                  <TaskList tasks={filteredTasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} onAddSubtask={handleAddSubtask} onDragEnd={handleDragEnd} />
                )}
              </>
            } />
            <Route path="today" element={<TodayPage tasks={tasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} onAddSubtask={handleAddSubtask} />} />
            <Route path="upcoming" element={<UpcomingPage tasks={tasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} onAddSubtask={handleAddSubtask} />} />
            <Route path="calendar" element={<CalendarPage tasks={tasks} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default TodoList;
