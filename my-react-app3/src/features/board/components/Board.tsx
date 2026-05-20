import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { COLUMNS, ColumnId } from '../types/kanban';
import { moveTask } from '../store/kanbanSlice';
import Column from './Column';

const Board = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.board.tasks);

  const handleDragStartTask = useCallback((e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDropTask = useCallback((taskId: string, columnId: string) => {
    const activeTask = tasks.find(t => t.id === taskId);
    if (!activeTask) return;

    if (activeTask.columnId !== columnId) {
      dispatch(moveTask({ 
        id: taskId, 
        columnId: columnId as ColumnId,
        index: tasks.filter(t => t.columnId === columnId).length 
      }));
    }
  }, [dispatch, tasks]);

  const tasksByColumn = useMemo(() => {
    return COLUMNS.reduce((acc, col) => {
      acc[col.id] = tasks.filter(task => task.columnId === col.id);
      return acc;
    }, {} as Record<ColumnId, typeof tasks>);
  }, [tasks]);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-text mb-1">Kanban Board (HTML5 Drag & Drop)</h2>
        <p className="text-sm text-text-muted">Drag and drop tasks between columns without external libraries.</p>
      </div>
      
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {COLUMNS.map(col => (
          <Column 
            key={col.id} 
            column={col} 
            tasks={tasksByColumn[col.id] || []}
            onDropTask={handleDropTask}
            onDragStartTask={handleDragStartTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
