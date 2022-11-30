import { createSelector } from '@reduxjs/toolkit';
import { StateType } from '../../types/state-types';
import { Offer, City, Comment } from '../../types/offer-types';
import { NameSpace } from '../../const';

type Selector<S> = (state: StateType) => S;

export const getAllOffers = (state: StateType): Offer[] => state[NameSpace.Data].offers;
export const getActiveOffer = (state: StateType): Offer | null => state[NameSpace.Data].activeOffer;
export const getActiveOfferNearPlaces = (state: StateType): Offer[] | null => state[NameSpace.Data].activeOfferNearPlaces;
export const getActiveOfferComments = (state: StateType): Comment[] | null => state[NameSpace.Data].activeOfferComments;
export const getCities = (state: StateType): City[] => state[NameSpace.Data].cities;
export const getCity = (state: StateType): City | null => state[NameSpace.Data].activeCity;
export const getLoadingStatus = (state: StateType): boolean => state[NameSpace.Data].loadingStatus;

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
