import { createAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../types/auth-status';
import { Offer, City, Comment } from '../types/offer-types';
import { UserData } from '../types/user-data';

export const changeActiveCity = createAction<City | null>('city/changeCity');

export const changeLoadingStatus = createAction<boolean>('data/changeLoadingStatus');

export const setOffers = createAction<Offer[]>('data/setOffers');

export const setOffer = createAction<Offer>('data/setOffer');

export const setNearPlaces = createAction<Offer[]>('data/setNearPlaces');

export const setComments = createAction<Comment[]>('data/setComments');

export const setCities = createAction<City[]>('data/setCities');

export const requireAuthStatus = createAction<AuthStatus>('user/requireAuthStatus');

export const setUserData = createAction<UserData>('user/setUserData');

export const redirectToRoute = createAction<string>('route/redirectToRoute');
