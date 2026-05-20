import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  isOpen: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setQuery, setIsOpen } = searchSlice.actions;
export default searchSlice.reducer;
