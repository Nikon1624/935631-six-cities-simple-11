import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header/header';

export const WithoutCitiesLayout = () => (
  <div className="page">
    <Header />
    <main className="page__main page__main--property">
      <Outlet />
    </main>
  </div>
);
