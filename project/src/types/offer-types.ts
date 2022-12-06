export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Point = {
  id: number;
} & Omit<Location, 'zoom'>;

export type City = {
  location: Location;
  name: string;
};

type OfferHost = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
};

export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: OfferHost;
  id: number;
  images: string[];
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};
