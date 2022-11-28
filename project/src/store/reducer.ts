import { createReducer } from '@reduxjs/toolkit';
import { changeActiveCity, setCities, setOffers, setOffer, requireAuthStatus, changeLoadingStatus, setComments, setNearPlaces } from './actions';
import { AuthStatus } from '../types/auth-status';
import { City, Offer, Comment } from '../types/offer-types';

type State = {
  cities: City[];
  activeCity: City | null;
  offers: Offer[];
  activeOffer: Offer | null;
  activeOfferNearPlaces: Offer[] | null;
  activeOfferComments: Comment[] | null;
  authStatus: AuthStatus;
  error: string | null;
  loadingStatus: boolean;
};

const initialState: State = {
  cities: [],
  activeCity: null,
  offers: [],
  activeOffer: null,
  activeOfferNearPlaces: null,
  activeOfferComments: null,
  authStatus: AuthStatus.Unknown,
  error: null,
  loadingStatus: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setCities, (state, action) => {
      state.cities = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffer, (state, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(setNearPlaces, (state, action) => {
      state.activeOfferNearPlaces = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.activeOfferComments = action.payload;
    })
    .addCase(changeLoadingStatus, (state, action) => {
      state.loadingStatus = action.payload;
    })
    .addCase(requireAuthStatus, (state, action) => {
      state.authStatus = action.payload;
    });
});
