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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30 w-72 flex-shrink-0
        bg-white dark:bg-slate-900 border-r-2 border-black
        p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary border-2 border-black shadow-neo flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">task_alt</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">TASKFLOW</h2>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-1 hover:bg-slate-100 rounded-full"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <ProjectList
            projects={projects}
            selectedProject={selectedProject}
            onSelectProject={(id) => {
              setSelectedProject(id);
              setIsSidebarOpen(false);
            }}
          />
        </div>
        <div className="mt-8">
          <AddProjectForm onAddProject={handleAddProject} />
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <div className="max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={
              <>
                <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsSidebarOpen(true)}
                      className="md:hidden p-2 bg-white border-2 border-black shadow-neo active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                    >
                      <span className="material-symbols-outlined">menu</span>
                    </button>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Inbox</h1>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                    <input
                      type="text"
                      placeholder="Filter tasks..."
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="flex-1 px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-2 border-black rounded-none focus:shadow-neo transition-all duration-200 placeholder:text-slate-400"
                    />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="flex-1 px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-2 border-black rounded-none focus:shadow-neo transition-all duration-200 cursor-pointer"
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
