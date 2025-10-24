import React from 'react';
import TaskList from './TaskList';

const UpcomingPage = ({ tasks, onUpdateTask, onDeleteTask, onAddSubtask }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(today.getDate() + 7);

  const filteredTasks = tasks.filter(task => {
    if (!task.due_date) {
      return false;
    }
    const dueDate = new Date(task.due_date);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate > today && dueDate <= sevenDaysFromNow;
  });

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Upcoming</h1>
      <TaskList tasks={filteredTasks} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} onAddSubtask={onAddSubtask} />
    </div>
  );
};

export default UpcomingPage;
