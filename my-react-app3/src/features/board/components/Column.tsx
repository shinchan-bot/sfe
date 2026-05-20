import React, { memo, useState } from 'react';
import { ColumnType, Task } from '../types/kanban';
import TaskCard from './TaskCard';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onDropTask: (taskId: string, columnId: string) => void;
  onDragStartTask: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
}

const Column = memo(({ column, tasks, onDropTask, onDragStartTask }: ColumnProps) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onDropTask(taskId, column.id);
    }
  };

  return (
    <div 
      className="flex flex-col w-72 shrink-0 bg-surface-hover/30 rounded-xl overflow-hidden h-full border border-border/50"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-4 border-b border-border/50 flex justify-between items-center bg-surface-hover/50">
        <h3 className="font-semibold text-sm text-text">{column.title}</h3>
        <span className="bg-surface px-2 py-0.5 rounded text-xs font-medium text-text-muted">
          {tasks.length}
        </span>
      </div>
      
      <div 
        className={`flex-1 p-3 overflow-y-auto transition-colors ${
          isOver ? 'bg-surface-hover/50 ring-2 ring-primary/50' : ''
        }`}
      >
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onDragStart={onDragStartTask}
          />
        ))}
      </div>
    </div>
  );
});

Column.displayName = 'Column';
export default Column;
