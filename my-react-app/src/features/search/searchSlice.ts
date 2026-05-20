import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  query: string;
  isOpen: boolean;
}

const initialState: SearchState = {
  query: '',
  isOpen: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setQuery, setIsOpen } = searchSlice.actions;
export default searchSlice.reducer;
