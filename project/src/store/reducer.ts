import { createReducer } from '@reduxjs/toolkit';
import { changeActiveCity } from './actions';
import { ApartamentCardType } from '../types/card-types';
import { CityType } from '../types/city-types';
import { cityList } from '../mocks/city';
import { apartamentList } from '../mocks/offers';

type State = {
  cities: CityType[];
  activeCity: CityType;
  offers: ApartamentCardType[];
};

const initialState: State = {
  cities: cityList,
  activeCity: cityList[0],
  offers: apartamentList,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveCity, (state, action) => {
      state.activeCity = state.cities.find((city) => city.title.toLowerCase() === action.payload.id) ?? state.cities[0];
    });
});
