import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/board/store/kanbanSlice';
import searchReducer from '../features/search/searchSlice';
import chatReducer from '../features/chat/chatSlice';
import feedReducer from '../features/feed/feedSlice';
import tableReducer from '../features/table/tableSlice';
import notesReducer from '../features/notes/notesSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    search: searchReducer,
    chat: chatReducer,
    feed: feedReducer,
    table: tableReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
