import React, { useCallback, useMemo } from 'react';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { COLUMNS, ColumnId } from '../types/kanban';
import { moveTask } from '../store/kanbanSlice';
import Column from './Column';

const Board = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(state => state.board.tasks);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const taskId = active.id as string;
        const overId = over.id as ColumnId;

        const activeTask = tasks.find(t => t.id === taskId);
        if (!activeTask) return;

        // We only support moving to a column for this demo (simplified nested DnD)
        // If dropping on a task, we could find its column, but for simplicity we assume 
        // column droppables. Wait, if we drop on a column:
        if (COLUMNS.find(col => col.id === overId)) {
            if (activeTask.columnId !== overId) {
                dispatch(moveTask({
                    id: taskId,
                    columnId: overId,
                    index: tasks.filter(t => t.columnId === overId).length
                }));
            }
        }
    }, [dispatch, tasks]);

    // useMemo for filtering tasks per column to avoid recalculation on every render
    const tasksByColumn = useMemo(() => {
        return COLUMNS.reduce((acc, col) => {
            acc[col.id] = tasks.filter(task => task.columnId === col.id);
            return acc;
        }, {} as Record<ColumnId, typeof tasks>);
    }, [tasks]);

    return (
        <div className="h-full flex flex-col">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-text mb-1">Kanban Board</h2>
                <p className="text-sm text-text-muted">Drag and drop tasks between columns.</p>
            </div>

            <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
                <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                    {COLUMNS.map(col => (
                        <Column
                            key={col.id}
                            column={col}
                            tasks={tasksByColumn[col.id] || []}
                        />
                    ))}
                </DndContext>
            </div>
        </div>
    );
};

export default Board;
