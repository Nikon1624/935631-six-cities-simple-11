const AUTH_TOKEN_KEY = 'api-token';

export type Token = string;

export const getToken = (): Token => localStorage.getItem(AUTH_TOKEN_KEY) ?? '';

export const setToken = (token: Token): void => localStorage.setItem(AUTH_TOKEN_KEY, token);

export const removeToken = (): void => localStorage.removeItem(AUTH_TOKEN_KEY);
