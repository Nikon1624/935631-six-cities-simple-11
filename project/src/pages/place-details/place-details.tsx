import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/index';
import { PlaceProperty } from '../../components/place-property/place-property';
import { ApartamentCardType } from '../../types/card-types';

export const PlaceDetails: React.FC = () => {
  const city = useAppSelector((state) => state.activeCity);
  const apartamentList = useAppSelector((state) => state.offers);
  const { id } = useParams();
  const currentPlace = apartamentList.find((apartament) => apartament.id === Number(id));

  return (
    <PlaceProperty key={id} city={city} placeData={currentPlace as ApartamentCardType} />
  );
};
