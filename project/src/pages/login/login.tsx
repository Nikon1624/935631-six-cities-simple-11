import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AuthData } from '../../types/auth-data';
import { useAppDispatch } from '../../hooks/index';
import { loginAction } from '../../store/api-actions';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [authData, setAuthData] = useState<AuthData>({ login: '', password: '' });

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const fieldName = evt.target.name;

    switch (fieldName) {
      case 'email':
        setAuthData({ ...authData, login: evt.target.value });
        break;
      case 'password':
        setAuthData({ ...authData, password: evt.target.value });
        break;
      default:
        throw new Error('Unknown field');
    }
  };

  const hundleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (authData.login && authData.password) {
      dispatch(loginAction(authData));
    }
  };

  return (
    <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <form className="login__form form" onSubmit={hundleFormSubmit}>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">E-mail</label>
            <input
              value={authData.login}
              className="login__input form__input"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleFieldChange}
            />
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">Password</label>
            <input
              value={authData.password}
              className="login__input form__input"
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleFieldChange}
            />
          </div>
          <button className="login__submit form__submit button" type="submit">Sign in</button>
        </form>
      </section>
      <section className="locations locations--login locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/some">
            <span>Amsterdam</span>
          </a>
        </div>
      </section>
    </div>
  );
};
