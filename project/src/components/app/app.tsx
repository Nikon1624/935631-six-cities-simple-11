import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from '../../layouts/default-layout/default-layout';
import { LoginLayout } from '../../layouts/login-layout/login-layout';
import { WithoutCitiesLayout } from '../../layouts/without-cities-layout/without-cities-layout';
import { Main } from '../../pages/main/main';
import { Login } from '../../pages/login/login';
import { PlaceDetails } from '../../pages/place-details/place-details';
import { NotFound } from '../../pages/not-found/not-found';
import { AppRoute } from '../../types/app-route';
import { HistoryRouter } from '../history-router/history-router';
import { browserHistory } from '../../utils/browser-history';

function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<DefaultLayout />}>
          <Route index element={<Main />} />
          <Route path="city/:id" element={<Main />} />
        </Route>
        <Route path={AppRoute.Login} element={<LoginLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path={`${AppRoute.Offer}`} element={<WithoutCitiesLayout />}>
          <Route path=":id" element={<PlaceDetails />} />
        </Route>
        <Route path="*" element={<LoginLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
