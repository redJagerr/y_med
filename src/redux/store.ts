import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  });

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
