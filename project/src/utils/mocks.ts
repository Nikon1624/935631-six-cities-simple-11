import { address, lorem, name, internet, image, datatype } from 'faker';
import { City, Offer, Comment } from '../types/offer-types';
import { UserData } from '../types/user-data';

export const getRandomCity = (): City => ({
  name: address.cityName(),
  location: {
    zoom: 10,
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
  },
});

export const getRandomCities = (): City[] => (
  new Array(10).fill(null).map(() => getRandomCity())
);

export const getRandomOffer = (): Offer => ({
  city: getRandomCity(),
  id: datatype.number(),
  location: {
    zoom: 10,
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
  },
  title: lorem.text(10),
  type: 'type',
  price: datatype.number(),
  bedrooms: datatype.number(),
  description: lorem.paragraph(10),
  goods: new Array(10).fill(null).map(() => lorem.text()),
  host: {
    id: datatype.number(),
    name: name.firstName(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
  },
  images: new Array(10).fill(null).map((_, i) => `${i}-${image.image()}`),
  isPremium: datatype.boolean(),
  maxAdults: datatype.number(),
  previewImage: image.image(),
  rating: datatype.number(),
});

export const getRandomOffers = (): Offer[] => (
  new Array(10).fill(null).map(() => getRandomOffer())
);

export const getRandomComment = (): Comment => (
  {
    comment: lorem.text(80),
    date: '22-12-22',
    id: datatype.number(),
    rating: datatype.number(),
    user: {
      avatarUrl: internet.avatar(),
      id: datatype.number(),
      isPro: datatype.boolean(),
      name: name.firstName(),
    }
  }
);

export const getRandomComments = (): Comment[] => (
  new Array(5).fill(null).map(() => getRandomComment())
);

export const getRandomUser = (): UserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.uuid(),
});
