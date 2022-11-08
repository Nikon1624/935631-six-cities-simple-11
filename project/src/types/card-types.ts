import { PointType } from './city-types';

export type ApartamentCardType = {
  mark?: string;
  id: number;
  imgUrl: string;
  price: number;
  ratingPercent: number;
  description: string;
  coordinates: PointType;
  type: string;
  nearPlaces: NearPlaceType[];
};

export type NearPlaceType = Omit<ApartamentCardType, 'nearPlaces'>;
