import { City, Offer, Comment } from '../../types/offer-types';
import { DataSliceInitialState } from '../../types/state-types';
import { dataSlice, changeActiveCity } from './data-slice';
import { getRandomCity, getRandomOffers, getRandomCities, getRandomOffer, getRandomComments } from '../../utils/mocks';
import { fetchOffersAction, fetchOneOfferAction } from '../api-actions';

const city: City = getRandomCity();
const cities: City[] = getRandomCities();
const offers: Offer[] = getRandomOffers();
const offer: Offer = getRandomOffer();
const comments: Comment[] = getRandomComments();

describe('Reducer: data-slice', () => {
  let state: DataSliceInitialState;

  beforeEach(() => {
    state = {
      cities: [],
      activeCity: null,
      offers: [],
      activeOffer: null,
      activeOfferNearPlaces: null,
      activeOfferComments: null,
      loadingStatus: false,
    };
  });

  it('should return initial state', () => {
    expect(dataSlice.reducer(undefined, { type: 'UNKNOWN' }))
      .toEqual(state);
  });

  it('should change active city', () => {
    expect(dataSlice.reducer(state, changeActiveCity(city)))
      .toEqual({ ...state, activeCity: city });
  });

  it('should change load status when pending load offers', () => {
    expect(dataSlice.reducer(state, {type: fetchOffersAction.pending.type}))
      .toEqual({ ...state, loadingStatus: true });
  });

  it('should update offers by load offers', () => {
    expect(dataSlice.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: [offers, cities]}))
      .toEqual({ ...state, offers, cities, activeCity: cities[0], loadingStatus: false });
  });

  it('should change load status when load offers rejected', () => {
    expect(dataSlice.reducer(state, {type: fetchOffersAction.rejected.type}))
      .toEqual({ ...state, loadingStatus: false });
  });

  it('should change load status when pending load one offer', () => {
    expect(dataSlice.reducer(state, {type: fetchOneOfferAction.pending.type}))
      .toEqual({ ...state, loadingStatus: true });
  });

  it('should update one offer by load offer', () => {
    expect(dataSlice.reducer(state, {type: fetchOneOfferAction.fulfilled.type, payload: [offer, offers, comments]}))
      .toEqual({ ...state, activeOffer: offer, activeOfferNearPlaces: offers, activeOfferComments: comments, loadingStatus: false });
  });

  it('should change load status when load one offer rejected', () => {
    expect(dataSlice.reducer(state, {type: fetchOneOfferAction.rejected.type}))
      .toEqual({ ...state, loadingStatus: false });
  });
});
