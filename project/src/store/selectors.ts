import { createSelector } from '@reduxjs/toolkit';
import { StateType } from '../types/state-types';
import { Offer, City, Comment } from '../types/offer-types';
import { AuthStatus } from '../types/auth-status';

type Selector<S> = (state: StateType) => S;

export const getAllOffers = (state: StateType): Offer[] => state.offers;
export const getActiveOffer = (state: StateType): Offer | null => state.activeOffer;
export const getActiveOfferNearPlaces = (state: StateType): Offer[] | null => state.activeOfferNearPlaces;
export const getActiveOfferComments = (state: StateType): Comment[] | null => state.activeOfferComments;
export const getCities = (state: StateType): City[] => state.cities;
export const getCity = (state: StateType): City | null => state.activeCity;
export const getLoadingStatus = (state: StateType): boolean => state.loadingStatus;
export const getAuthStatus = (state: StateType): AuthStatus => state.authStatus;

export const getCityById = (id: string | undefined): Selector<City> =>
  createSelector(
    [getCities],
    (cities) => cities.find((city) => city.name.toLowerCase() === id) ?? cities[0]
  );

export const getOffers = createSelector(
  [getAllOffers, getCity],
  (offers, city) => city ? offers.filter((offer) => offer.city.name === city.name) : []
);

export const getOfferPoints = createSelector(
  [getOffers],
  (offers) => offers.map((offer) => ({ ...offer.location, id: offer.id }))
);

export const getNearPlacePoints = createSelector(
  [getActiveOfferNearPlaces],
  (nearPlaces) => nearPlaces?.map((nearPlace) => ({ ...nearPlace.location, id: nearPlace.id })) ?? []
);
