import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../types/app-route';
import { DefaultLayout } from '../../layouts/default-layout/default-layout';
import { LoginLayout } from '../../layouts/login-layout/login-layout';
import { WithoutCitiesLayout } from '../../layouts/without-cities-layout/without-cities-layout';
import { Main } from '../../pages/main/main';
import { Login } from '../../pages/login/login';
import { PlaceDetails } from '../../pages/place-details/place-details';
import { NotFound } from '../../pages/not-found/not-found';
import { apartamentList } from '../../mocks/offers';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<DefaultLayout />}>
          <Route index element={<Main availablePlaceCount={5} apartamentList={apartamentList} />} />
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
    </BrowserRouter>
  );
}

export default App;
