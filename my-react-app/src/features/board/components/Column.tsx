import React, { memo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { ColumnType, Task } from '../types/kanban';
import TaskCard from './TaskCard';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

const Column = memo(({ column, tasks }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  return (
    <div className="flex flex-col w-72 shrink-0 bg-surface-hover/30 rounded-xl overflow-hidden h-full border border-border/50">
      <div className="p-4 border-b border-border/50 flex justify-between items-center bg-surface-hover/50">
        <h3 className="font-semibold text-sm text-text">{column.title}</h3>
        <span className="bg-surface px-2 py-0.5 rounded text-xs font-medium text-text-muted">
          {tasks.length}
        </span>
      </div>
      
      <div 
        ref={setNodeRef}
        className={`flex-1 p-3 overflow-y-auto transition-colors
          ${isOver ? 'bg-surface-hover/50' : ''}
        `}
      >
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
});

Column.displayName = 'Column';
export default Column;
