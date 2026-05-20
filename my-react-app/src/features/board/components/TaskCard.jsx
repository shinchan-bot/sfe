import React, { memo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = memo(({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-surface border border-border p-3 rounded-lg shadow-sm mb-3 flex gap-2 cursor-default
        ${isDragging ? 'ring-2 ring-primary ring-opacity-50' : 'hover:border-text-muted transition-colors'}
      `}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="mt-1 text-text-muted hover:text-text cursor-grab active:cursor-grabbing"
      >
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
