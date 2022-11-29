import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoutes } from '../types/api-routes';
import { AppRoute } from '../types/app-route';
import { AuthData } from '../types/auth-data';
import { AuthStatus } from '../types/auth-status';
import { Offer, City, Comment } from '../types/offer-types';
import { AppDispatch, StateType } from '../types/state-types';
import { UserData } from '../types/user-data';
import { setToken, removeToken } from '../utils/token';
import { setOffers, setOffer, requireAuthStatus, setCities, changeActiveCity, changeLoadingStatus, setNearPlaces, setComments, redirectToRoute } from './actions';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'data/fetchOffersAction',
  async (_, { dispatch, extra: api }) => {
    dispatch(changeLoadingStatus(true));

    const { data } = await api.get<Offer[]>(ApiRoutes.Offers);
    const uniqCities = data.reduce<Record<string, City>>((acc, item) => {
      if (!acc[item.city.name]) {
        acc[item.city.name] = item.city;
      }

      return acc;
    }, {});

    const cities = Object.values(uniqCities).reverse();

    dispatch(setOffers(data));
    dispatch(setCities(cities));
    dispatch(changeActiveCity(cities[0]));
    dispatch(changeLoadingStatus(false));
  }
);

export const fetchOneOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'data/fetchOneOffer',
  async (id, { dispatch, extra: api }) => {
    dispatch(changeLoadingStatus(true));

    const [offer, nearPlaces, comments] = await Promise.all([
      api.get<Offer>(`${ApiRoutes.Offers}/${id}`),
      api.get<Offer[]>(`${ApiRoutes.Offers}/${id}/nearby`),
      api.get<Comment[]>(`${ApiRoutes.Comments}/${id}`)
    ]);

    dispatch(setOffer(offer.data));
    dispatch(setNearPlaces(nearPlaces.data));
    dispatch(setComments(comments.data));
    dispatch(changeLoadingStatus(false));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_, { dispatch, extra: api }) => {
    try {
      await api.get(ApiRoutes.Login);
      dispatch(requireAuthStatus(AuthStatus.Auth));
    } catch {
      dispatch(requireAuthStatus(AuthStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(ApiRoutes.Login, { email, password });
    setToken(token);
    dispatch(requireAuthStatus(AuthStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiRoutes.Logout);
    removeToken();
    dispatch(requireAuthStatus(AuthStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.Login));
  },
);
