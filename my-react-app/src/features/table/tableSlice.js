import { createSlice } from '@reduxjs/toolkit';

const mockData = [
  { id: '1', name: 'Alice Smith', role: 'Admin', status: 'Active', lastLogin: '2024-03-10' },
  { id: '2', name: 'Bob Jones', role: 'Editor', status: 'Inactive', lastLogin: '2024-02-15' },
  { id: '3', name: 'Charlie Brown', role: 'Viewer', status: 'Active', lastLogin: '2024-03-12' },
  { id: '4', name: 'Diana Prince', role: 'Admin', status: 'Active', lastLogin: '2024-03-14' },
  { id: '5', name: 'Eve Adams', role: 'Editor', status: 'Pending', lastLogin: '2024-03-11' },
  { id: '6', name: 'Frank Wright', role: 'Viewer', status: 'Active', lastLogin: '2024-03-09' },
  { id: '7', name: 'Grace Hopper', role: 'Admin', status: 'Active', lastLogin: '2024-03-13' },
];

const initialState = {
  data: mockData,
  filter: '',
  page: 1,
  sortBy: null,
  sortDesc: false,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSort: (state, action) => {
      if (state.sortBy === action.payload) {
        state.sortDesc = !state.sortDesc;
      } else {
        state.sortBy = action.payload;
        state.sortDesc = false;
      }
    },
  },
});

export const { setFilter, setPage, setSort } = tableSlice.actions;
export default tableSlice.reducer;
