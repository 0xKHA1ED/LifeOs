import React from 'react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask, onAddSubtask }) => {
  const priorityColors = {
    1: 'border-accent-400',
    2: 'border-yellow-400',
    3: 'border-blue-400',
    4: 'border-slate-300 dark:border-slate-600',
  };

  return (
    <div className="flex items-center gap-4 group">
      <button onClick={() => onUpdateTask(task.id, { is_completed: !task.is_completed })} className={`w-5 h-5 flex-shrink-0 rounded-full border-2 ${task.is_completed ? 'bg-primary border-primary' : priorityColors[task.priority]} group-hover:border-primary-400 transition-colors duration-200`}>
        {task.is_completed && <span className="material-symbols-outlined text-sm text-white" style={{fontVariationSettings: "'wght' 500"}}>check</span>}
      </button>
      <span className={`flex-grow ${task.is_completed ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white'} transition-colors duration-200`}>{task.title}</span>
      {task.tags && task.tags.map(tag => (
        <span key={tag} className="text-xs font-medium text-indigo-500 bg-indigo-100 dark:bg-indigo-500/20 px-2 py-0.5 rounded-full">{tag}</span>
      ))}
      {task.due_date && <span className="text-xs font-medium text-accent-500 bg-accent-100 dark:bg-accent-500/20 px-2 py-0.5 rounded-full">Due {new Date(task.due_date).toLocaleDateString()}</span>}
      <button onClick={() => onAddSubtask(task.id)} className="material-symbols-outlined text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">add</button>
      <button onClick={() => onDeleteTask(task.id)} className="material-symbols-outlined text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">delete</button>
    </div>
  );
};

export default TaskItem;
