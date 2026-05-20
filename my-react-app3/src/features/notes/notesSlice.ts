import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotesState {
  content: string;
  isSaving: boolean;
  lastSaved: string | null;
}

const initialState: NotesState = {
  content: '# Project Notes\n\nStart writing your markdown here...\n\n- Task 1\n- Task 2\n\n> This supports standard markdown syntax.',
  isSaving: false,
  lastSaved: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
      state.isSaving = true;
    },
    saveComplete: (state) => {
      state.isSaving = false;
      state.lastSaved = new Date().toLocaleTimeString();
    },
  },
});

export const { setContent, saveComplete } = notesSlice.actions;
export default notesSlice.reducer;
