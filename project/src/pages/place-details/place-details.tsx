import React from 'react';
import { useParams } from 'react-router-dom';
import { PlaceProperty } from '../../components/place-property/place-property';
import { CityType } from '../../types/city-types';
import { ApartamentCardType } from '../../types/card-types';

type PlaceDetailsProps = {
  city: CityType;
  apartamentList: ApartamentCardType[];
};

export const PlaceDetails: React.FC<PlaceDetailsProps> = ({ city, apartamentList }) => {
  const { id } = useParams();
  const currentPlace = apartamentList.find((apartament) => apartament.id === Number(id));

  return (
    <PlaceProperty key={id} city={city} placeData={currentPlace as ApartamentCardType} />
  );
};
