import { ApartamentCardType } from '../types/card-types';

export const apartamentList: ApartamentCardType[] = [
  {
    mark: 'Premium',
    id: 1,
    imgUrl: '/img/apartment-01.jpg',
    type: 'Apartment',
    description: 'Beautiful &amp; luxurious apartment at great location',
    coordinates: {
      lat: 52.3909553943508,
      lng: 4.85309666406198,
      id: 1,
    },
    price: 120,
    ratingPercent: 80,
  },
  {
    id: 2,
    imgUrl: '/img/room.jpg',
    type: 'Private room',
    description: 'Wood and stone place',
    coordinates: {
      lat: 52.3609553943508,
      lng: 4.85309666406198,
      id: 2,
    },
    price: 80,
    ratingPercent: 80,
  },
  {
    id: 3,
    imgUrl: '/img/apartment-02.jpg',
    type: 'Apartment',
    description: 'Canal View Prinsengracht',
    coordinates: {
      lat: 52.3909553943508,
      lng: 4.929309666406198,
      id: 3,
    },
    price: 132,
    ratingPercent: 80,
  },
  {
    mark: 'Premium',
    id: 4,
    imgUrl: '/img/apartment-03.jpg',
    type: 'Apartment',
    description: 'Nice, cozy, warm big bed apartment',
    coordinates: {
      lat: 52.3809553943508,
      lng: 4.939309666406198,
      id: 4,
    },
    price: 180,
    ratingPercent: 100,
  },
  {
    mark: 'Premium',
    id: 5,
    imgUrl: '/img/apartment-01.jpg',
    type: 'Apartment',
    description: 'Lallala',
    coordinates: {
      lat: 52.4809553943508,
      lng: 4.959309666406198,
      id: 5,
    },
    price: 200,
    ratingPercent: 100,
  },
];
