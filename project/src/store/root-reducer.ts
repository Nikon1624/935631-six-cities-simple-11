import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataSlice } from './data-slice/data-slice';
import { userSlice } from './user-slice/user-slice';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
});
