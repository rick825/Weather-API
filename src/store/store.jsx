import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './reducer';

const store = configureStore({
  reducer: {
    city: weatherReducer,
  },
});

export default store;
