import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApiClient } from '../services/api';
import { ApiEndpoints } from '../const';
import { StateType } from '../types/state-types';
import { FormData } from '../types/review-form-data';
import { getRandomOffer, getRandomOffers, getRandomComments } from '../utils/mocks';
import { checkAuthAction, fetchOffersAction, fetchOneOfferAction, loginAction, logoutAction, sendCommentAction } from './api-actions';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './actions';

const offers = getRandomOffers();
const offer = getRandomOffer();
const comments = getRandomComments();

describe('Async actions', () => {
  const api = createApiClient();
  const mockApi = new MockAdapter(api);
  const middlwares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      StateType,
      Action<string>,
      ThunkDispatch<StateType, typeof api, Action>
    >(middlwares);

  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch fetchOffersAction when GET /offers', async () => {
    mockApi
      .onGet(ApiEndpoints.Offers).reply(200, offers);

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchOneOfferAction when GET /offers/:id', async () => {
    const id = '11';

    mockApi
      .onGet(`${ApiEndpoints.Offers}/${id}`).reply(200, offer)
      .onGet(`${ApiEndpoints.Offers}/${id}/nearby`).reply(200, offers)
      .onGet(`${ApiEndpoints.Comments}/${id}`).reply(200, comments);

    await store.dispatch(fetchOneOfferAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOneOfferAction.pending.type,
      fetchOneOfferAction.fulfilled.type,
    ]);
  });

  it('should dispatch sendCommentAction when POST /comments/:id', async () => {
    const fakePayload = {
      hotelId: '11',
      formData: {
        comment: '',
        rating: 1,
      },
    };

    mockApi
      .onPost(`${ApiEndpoints.Comments}/${fakePayload.hotelId}`)
      .reply(200, comments);

    await store.dispatch(sendCommentAction(fakePayload));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendCommentAction.pending.type,
      sendCommentAction.fulfilled.type,
    ]);
  });

  it('should authorization status is «auth» when server return 200', async () => {
    mockApi
      .onGet(ApiEndpoints.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch loginAction and redirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
    const token = 'lalala';

    mockApi
      .onPost(ApiEndpoints.Login)
      .reply(200, { token });

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).nthCalledWith(1, 'api-token', token);
  });

  it('should dispatch logoutAction and redirectToRoute when DELETE /logout', async () => {
    mockApi
      .onDelete(ApiEndpoints.Logout)
      .reply(204);

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      redirectToRoute.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).nthCalledWith(1, 'api-token');
  });
});
