import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { createApiClient } from '../services/api';
import { redirect } from './middleware/redirect';

const api = createApiClient();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }).concat(redirect),
});
