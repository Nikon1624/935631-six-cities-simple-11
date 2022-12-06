import { AuthStatus } from '../../const';
import { UserSliceInitialState } from '../../types/state-types';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userSlice } from './user-slice';
import { getRandomUser } from '../../utils/mocks';
import { UserData } from '../../types/user-data';

const user: UserData = getRandomUser();

describe('Reducer: user-slice', () => {
  let state: UserSliceInitialState;

  beforeEach(() => {
    state = {
      userData: null,
      authStatus: AuthStatus.Unknown,
    };
  });

  it('should return initial state', () => {
    expect(userSlice.reducer(undefined, { type: 'UNKNOWN' }))
      .toEqual(state);
  });

  it('should change auth status to Auth when check fulfilled', () => {
    expect(userSlice.reducer(state, { type: checkAuthAction.fulfilled.type }))
      .toEqual({ ...state, authStatus: AuthStatus.Auth });
  });

  it('should change auth status to NoAuth when check rejected', () => {
    expect(userSlice.reducer(state, { type: checkAuthAction.rejected.type }))
      .toEqual({ ...state, authStatus: AuthStatus.NoAuth });
  });

  it('should update state when user login', () => {
    expect(userSlice.reducer(state, { type: loginAction.fulfilled.type, payload: user }))
      .toEqual({ ...state, authStatus: AuthStatus.Auth, userData: user });
  });

  it('should change state when user logout', () => {
    expect(userSlice.reducer(state, { type: logoutAction.fulfilled.type }))
      .toEqual({ ...state, authStatus: AuthStatus.NoAuth });
  });
});
