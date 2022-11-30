import { StateType } from '../../types/state-types';
import { AuthStatus, NameSpace } from '../../const';

export const getAuthStatus = (state: StateType): AuthStatus => state[NameSpace.User].authStatus;
