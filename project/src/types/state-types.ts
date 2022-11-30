import { AuthStatus } from '../const';
import { store } from '../store/index';
import { City, Offer, Comment } from './offer-types';
import { UserData } from './user-data';

export type StateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type DataSliceInitialState = {
  cities: City[];
  loadingStatus: boolean;
  activeCity: City | null;
  offers: Offer[];
  activeOffer: Offer | null;
  activeOfferNearPlaces: Offer[] | null;
  activeOfferComments: Comment[] | null;
};

export type UserSliceInitialState = {
  userData: UserData | null;
  authStatus: AuthStatus;
};
