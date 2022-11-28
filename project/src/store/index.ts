import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createApiClient } from '../services/api';

const api = createApiClient();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});
