import { configureStore } from '@reduxjs/toolkit';

import dataProcess from './dataProcess';

const store = configureStore({
  reducer: {
    dataProcess
  }
});

export default store;
