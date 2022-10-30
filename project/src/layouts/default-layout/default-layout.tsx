import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { CitiesNavigation } from '../../components/cities-navigation/cities-navigation';

export const DefaultLayout: React.FC = () => (
  <>
    <Header />
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CitiesNavigation />
      <Outlet />
    </main>
  </>
);
