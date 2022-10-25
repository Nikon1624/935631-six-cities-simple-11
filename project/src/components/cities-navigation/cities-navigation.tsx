import React from 'react';

export const CitiesNavigation: React.FC = () => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        <li className="locations__item">
          <a className="locations__item-link tabs__item" href="/some">
            <span>Paris</span>
          </a>
        </li>
        <li className="locations__item">
          <a className="locations__item-link tabs__item" href="/some">
            <span>Cologne</span>
          </a>
        </li>
        <li className="locations__item">
          <a className="locations__item-link tabs__item" href="/some">
            <span>Brussels</span>
          </a>
        </li>
        <li className="locations__item">
          <a className="locations__item-link tabs__item tabs__item--active" href="/some">
            <span>Amsterdam</span>
          </a>
        </li>
        <li className="locations__item">
          <a className="locations__item-link tabs__item" href="/some">
            <span>Hamburg</span>
          </a>
        </li>
        <li className="locations__item">
          <a className="locations__item-link tabs__item" href="/some">
            <span>Dusseldorf</span>
          </a>
        </li>
      </ul>
    </section>
  </div>
);
