import React, { memo } from 'react';
import { Task } from '../types/kanban';
import { GripVertical } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
}

const TaskCard = memo(({ task, onDragStart }: TaskCardProps) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-surface border border-border p-3 rounded-lg shadow-sm mb-3 flex gap-2 cursor-grab active:cursor-grabbing hover:border-text-muted transition-colors"
    >
      <div className="mt-1 text-text-muted hover:text-text">
        <GripVertical size={16} />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-text">{task.title}</h4>
        {task.description && (
          <p className="text-xs text-text-muted mt-1">{task.description}</p>
        )}
      </div>
    </div>
  );
});

TaskCard.displayName = 'TaskCard';
export default TaskCard;
