import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    { id: '1', columnId: 'todo', title: 'Research competitors', description: 'Analyze top 3 competitors in the market' },
    { id: '2', columnId: 'todo', title: 'Design system', description: 'Create color palette and typography' },
    { id: '3', columnId: 'in-progress', title: 'Setup Redux', description: 'Configure Redux Toolkit and hooks' },
    { id: '4', columnId: 'in-progress', title: 'Build Kanban', description: 'Implement dnd-kit for drag and drop' },
    { id: '5', columnId: 'done', title: 'Project setup', description: 'Initialize Vite React TS project' },
  ],
};

const kanbanSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    moveTask: (state, action) => {
      const { id, columnId, index } = action.payload;
      const taskIndex = state.tasks.findIndex(t => t.id === id);
      if (taskIndex === -1) return;
      
      const [task] = state.tasks.splice(taskIndex, 1);
      task.columnId = columnId;
      
      const columnTasks = state.tasks.filter(t => t.columnId === columnId);
      columnTasks.splice(index, 0, task);
      
      state.tasks = [
        ...state.tasks.filter(t => t.columnId !== columnId),
        ...columnTasks
      ];
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    }
  },
});

export const { moveTask, addTask } = kanbanSlice.actions;
export default kanbanSlice.reducer;
