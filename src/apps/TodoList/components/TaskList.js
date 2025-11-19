import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onAddSubtask, onDragEnd }) => {
  const tasksByParent = tasks.reduce((acc, task) => {
    const parentId = task.parent_task_id || 'root';
    if (!acc[parentId]) {
      acc[parentId] = [];
    }
    acc[parentId].push(task);
    return acc;
  }, {});

  const renderTasks = (parentId) => {
    const children = tasksByParent[parentId];
    if (!children) {
      return null;
    }
    return (
      <Droppable droppableId={parentId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
            {children.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white dark:bg-slate-800 p-4 border-2 border-black shadow-neo transition-all duration-200 hover:-translate-y-1 hover:shadow-neo-lg"
                  >
                    <TaskItem
                      task={task}
                      onUpdateTask={onUpdateTask}
                      onDeleteTask={onDeleteTask}
                      onAddSubtask={onAddSubtask}
                    />
                    {renderTasks(task.id)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Tasks</h3>
          {renderTasks('root')}
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskList;
