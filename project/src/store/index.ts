import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createApiClient } from '../services/api';
import { redirect } from './middleware/redirect';

const api = createApiClient();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }).concat(redirect),
});
