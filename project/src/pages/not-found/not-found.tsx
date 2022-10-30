import { Link } from 'react-router-dom';
import { AppRoute } from '../../types/AppRoute';

export const NotFound = () => (
  <div className="property__gallery-container container">
    <h1>Page Not Found 404</h1>
    <Link to={AppRoute.Root} className="locations__item-link">Go to main</Link>
  </div>
);
