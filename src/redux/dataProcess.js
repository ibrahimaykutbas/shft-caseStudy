import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterType: 'daily'
};

const dataProcessSlice = createSlice({
  name: 'dataProcess',
  initialState,
  reducers: {
    setFilterType(state, action) {
      state.filterType = action.payload;
    }
  }
});

export const { setFilterType } = dataProcessSlice.actions;
export default dataProcessSlice.reducer;