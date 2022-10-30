import React from 'react';
import { ApartamentCard } from '../../components/apartament-card/apartament-card';
import { ApartamentCardType } from '../../types/CardTypes';

const apartamentList: ApartamentCardType[] = [
  {
    mark: 'Premium',
    id: 1,
    imgUrl: '/img/apartment-01.jpg',
    type: 'Apartment',
    description: 'Beautiful &amp; luxurious apartment at great location',
    price: 120,
    ratingPercent: 80,
  },
  {
    id: 2,
    imgUrl: '/img/room.jpg',
    type: 'Private room',
    description: 'Wood and stone place',
    price: 80,
    ratingPercent: 80,
  },
  {
    id: 3,
    imgUrl: '/img/apartment-02.jpg',
    type: 'Apartment',
    description: 'Canal View Prinsengracht',
    price: 132,
    ratingPercent: 80,
  },
  {
    mark: 'Premium',
    id: 4,
    imgUrl: '/img/apartment-03.jpg',
    type: 'Apartment',
    description: 'Nice, cozy, warm big bed apartment',
    price: 180,
    ratingPercent: 100,
  },
  {
    id: 5,
    imgUrl: '/img/room.jpg',
    type: 'Private room',
    description: 'Wood and stone place',
    price: 80,
    ratingPercent: 80,
  },
];

type MainProps = {
  availablePlaceCount: number;
};

export const Main: React.FC<MainProps> = ({ availablePlaceCount }) => (
  <div className="cities">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{ availablePlaceCount } places to stay in Amsterdam</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select" />
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {
            apartamentList.map((apartamentData) => <ApartamentCard { ...apartamentData } key={apartamentData.id} />)
          }
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map" />
      </div>
    </div>
  </div>
);
