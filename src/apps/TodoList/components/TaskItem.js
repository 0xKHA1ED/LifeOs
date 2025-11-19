import React from 'react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask, onAddSubtask }) => {
  const priorityColors = {
    1: 'border-accent-400',
    2: 'border-yellow-400',
    3: 'border-blue-400',
    4: 'border-slate-300 dark:border-slate-600',
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 group">
      <div className="flex items-start sm:items-center gap-4 w-full">
        <button onClick={() => onUpdateTask(task.id, { is_completed: !task.is_completed })} className={`w-6 h-6 flex-shrink-0 border-2 border-black transition-all duration-200 flex items-center justify-center mt-1 sm:mt-0 ${task.is_completed ? 'bg-primary shadow-none' : 'bg-white hover:bg-slate-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]'}`}>
          {task.is_completed && <span className="material-symbols-outlined text-base text-white font-bold">check</span>}
        </button>
        <div className="flex-grow min-w-0">
          <span className={`block font-medium break-words ${task.is_completed ? 'text-slate-400 dark:text-slate-500 line-through decoration-2 decoration-slate-400' : 'text-slate-900 dark:text-white'}`}>{task.title}</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {task.tags && task.tags.map(tag => (
              <span key={tag} className="text-xs font-bold text-indigo-700 bg-indigo-100 border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{tag}</span>
            ))}
            {task.due_date && <span className="text-xs font-bold text-slate-700 bg-white border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Due {new Date(task.due_date).toLocaleDateString()}</span>}
          </div>
        </div>
      </div>

      <div className="flex gap-2 self-end sm:self-auto sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <button onClick={() => onAddSubtask(task.id)} className="w-8 h-8 flex items-center justify-center border-2 border-black bg-white hover:bg-slate-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
          <span className="material-symbols-outlined text-slate-900 text-sm">add</span>
        </button>
        <button onClick={() => onDeleteTask(task.id)} className="w-8 h-8 flex items-center justify-center border-2 border-black bg-accent hover:bg-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
          <span className="material-symbols-outlined text-white text-sm">delete</span>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
