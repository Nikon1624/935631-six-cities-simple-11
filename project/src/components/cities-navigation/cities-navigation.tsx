import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/index';

export const CitiesNavigation: React.FC = () => {
  const cityList = useAppSelector((state) => state.cities);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          { cityList.map((city, i) => (
            <li className="locations__item" key={city.title}>
              <NavLink
                className={({ isActive }) => isActive
                  ? 'locations__item-link tabs__item tabs__item--active'
                  : 'locations__item-link tabs__item' }
                to={ i === 0 ? '/' : city.title.toLowerCase()}
                end
              >
                <span>{ city.title }</span>
              </NavLink>
            </li>
          )) }
        </ul>
      </section>
    </div>
  );
};
