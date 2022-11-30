import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiEndpoints } from '../const';
import { AppRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { Offer, City, Comment } from '../types/offer-types';
import { AppDispatch } from '../types/state-types';
import { UserData } from '../types/user-data';
import { FormData } from '../types/review-form-data';
import { setToken, removeToken } from '../utils/token';
import { redirectToRoute } from './actions';

export const fetchOffersAction = createAsyncThunk<[Offer[], City[]], undefined, {
  extra: AxiosInstance;
}>(
  'data/fetchOffersAction',
  async (_, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(ApiEndpoints.Offers);
    const uniqCities = data.reduce<Record<string, City>>((acc, item) => {
      if (!acc[item.city.name]) {
        acc[item.city.name] = item.city;
      }

      return acc;
    }, {});

    const cities = Object.values(uniqCities).reverse();

    return [data, cities];
  }
);

export const fetchOneOfferAction = createAsyncThunk<[Offer, Offer[], Comment[]], string, {
  extra: AxiosInstance;
}>(
  'data/fetchOneOffer',
  async (id, { extra: api }) => {
    const [offer, nearPlaces, comments] = await Promise.all([
      api.get<Offer>(`${ApiEndpoints.Offers}/${id}`),
      api.get<Offer[]>(`${ApiEndpoints.Offers}/${id}/nearby`),
      api.get<Comment[]>(`${ApiEndpoints.Comments}/${id}`)
    ]);

    return [offer.data, nearPlaces.data, comments.data];
  }
);

export const sendCommentAction = createAsyncThunk<Comment[],
  {
    hotelId: string;
    formData: FormData;
  },
  {
    extra: AxiosInstance;
  }>(
    'data/sendComment',
    async ({ hotelId, formData }, { extra: api }) => {
      const { data } = await api.post<Comment[]>(`${ApiEndpoints.Comments}/${hotelId}`, formData);

      return data;
    },
  );

export const checkAuthAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_, { extra: api }) => {
    await api.get(ApiEndpoints.Login);
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(ApiEndpoints.Login, { email, password });
    setToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));

    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiEndpoints.Logout);
    removeToken();
    dispatch(redirectToRoute(AppRoute.Login));
  },
);
