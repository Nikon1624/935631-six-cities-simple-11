import React from 'react';
import { ApartamentCard } from '../apartament-card/apartament-card';
import { ApartamentCardType } from '../../types/card-types';
import { PointType } from '../../types/city-types';

type ApartamentListProps = {
  apartamentList: ApartamentCardType[];
  onMouseEnter: (point: PointType) => void;
  onMouseLeave: () => void;
};

export const ApartamentList: React.FC<ApartamentListProps> = ({ apartamentList, onMouseEnter, onMouseLeave }) => (
  <div className="cities__places-list places__list tabs__content">
    {
      apartamentList.map((apartamentData) => (
        <ApartamentCard
          key={apartamentData.id}
          { ...apartamentData }
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))
    }
  </div>
);
