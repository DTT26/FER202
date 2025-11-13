import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import paymentsReducer from './slices/paymentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    payments: paymentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
