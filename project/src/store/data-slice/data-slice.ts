import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { City } from '../../types/offer-types';
import { DataSliceInitialState } from '../../types/state-types';
import { fetchOffersAction, fetchOneOfferAction, sendCommentAction } from '../api-actions';

const initialState: DataSliceInitialState = {
  cities: [],
  activeCity: null,
  offers: [],
  activeOffer: null,
  activeOfferNearPlaces: null,
  activeOfferComments: null,
  loadingStatus: false,
};

export const dataSlice = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeActiveCity: (state, action: PayloadAction<City>) => {
      state.activeCity = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        const [data, cities] = action.payload;

        state.offers = data;
        state.cities = cities;
        state.activeCity = cities[0];
        state.loadingStatus = false;
      })
      .addCase(fetchOneOfferAction.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(fetchOneOfferAction.fulfilled, (state, action) => {
        const [offer, nearPlaces, comments] = action.payload;

        state.activeOffer = offer;
        state.activeOfferNearPlaces = nearPlaces;
        state.activeOfferComments = comments;
        state.loadingStatus = false;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.activeOfferComments = action.payload;
      });
  },
});

export const { changeActiveCity } = dataSlice.actions;
