import { render, screen } from '@testing-library/react';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter } from '../history-router/history-router';
import App from './app';
import { ApiEndpoints, AppRoute, AuthStatus } from '../../const';
import { getRandomOffers, getRandomComments } from '../../utils/mocks';
import { StateType } from '../../types/state-types';
import { createApiClient } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';

const api = createApiClient();
const mockApi = new MockAdapter(api);
const middlwares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  StateType,
  Action<string>,
  ThunkDispatch<StateType, typeof api, Action>
  >(middlwares);

const offers = getRandomOffers();
const cities = offers.map((offer) => offer.city);
const comments = getRandomComments();

const store = mockStore({
  DATA: {
    cities,
    activeCity: cities[0],
    offers,
    activeOffer: offers[0],
    activeOfferNearPlaces: null,
    activeOfferComments: comments,
    loadingStatus: false,
  },
  USER: {
    userData: null,
    authStatus: AuthStatus.Auth,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Routing', () => {
  it('should be render Main page when navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    const placesWrapper = screen.getByTestId('places_wrapper');
    const mapWrapper = screen.getByTestId('map_wrapper');

    expect(placesWrapper).toBeInTheDocument();
    expect(mapWrapper).toBeInTheDocument();
  });

  it('should be render Main page with correctly city when navigate to "/:cityId"', () => {
    history.push(`${AppRoute.Root}${cities[0].name}`);

    render(fakeApp);

    const cityName = screen.getByText(cities[0].name);

    expect(cityName).toBeInTheDocument();
  });

  it('should be render Login page when navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    const emailText = screen.getByText('E-mail');
    const passwordText = screen.getByText('Password');

    expect(emailText).toBeInTheDocument();
    expect(passwordText).toBeInTheDocument();
  });

  it('should be render PlaceDetails page when navigate to "/offer:id"', () => {
    history.push(`${AppRoute.Offer}/${offers[0].id}`);
    const id = offers[0].id;

    mockApi
      .onGet(`${ApiEndpoints.Offers}/${id}`).reply(200, offers[0])
      .onGet(`${ApiEndpoints.Offers}/${id}/nearby`).reply(200, offers)
      .onGet(`${ApiEndpoints.Comments}/${id}`).reply(200, comments);

    render(fakeApp);

    const offerDescription = screen.getByText(offers[0].description);

    expect(offerDescription).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('Page Not Found 404')).toBeInTheDocument();
  });
});
