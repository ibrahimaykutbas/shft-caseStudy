import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterType: 'daily',
  product: {}
};

const dataProcessSlice = createSlice({
  name: 'dataProcess',
  initialState,
  reducers: {
    setFilterType(state, action) {
      state.filterType = action.payload;
    },
    setData(state, action) {
      state.product = action.payload;
    }
  }
});

export const { setFilterType, setData } = dataProcessSlice.actions;
export default dataProcessSlice.reducer;