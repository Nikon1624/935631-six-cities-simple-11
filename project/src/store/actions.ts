import { createAction } from '@reduxjs/toolkit';

export const changeActiveCity = createAction<{ id: string | undefined }>('city/changeCity');
