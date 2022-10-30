import { Link } from 'react-router-dom';
import { AppRoute } from '../../types/AppRoute';

export const LoginHeader = () => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link" to={AppRoute.Root}>
            <img className="header__logo" src={ `${ process.env.PUBLIC_URL }/img/logo.svg` } alt="6 cities logo" width="81" height="41" />
          </Link>
        </div>
      </div>
    </div>
  </header>
);
