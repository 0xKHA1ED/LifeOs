import React from 'react';
import TaskList from './TaskList';

const TodayPage = ({ tasks, onUpdateTask, onDeleteTask, onAddSubtask }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredTasks = tasks.filter(task => {
    if (!task.due_date) {
      return false;
    }
    const dueDate = new Date(task.due_date);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate <= today;
  });

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Today</h1>
      <TaskList tasks={filteredTasks} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} onAddSubtask={onAddSubtask} />
    </div>
  );
};

export default TodayPage;
