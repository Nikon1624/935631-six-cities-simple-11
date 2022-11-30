import React from 'react';
import { ApartamentCard } from '../apartament-card/apartament-card';
import { Offer, Point } from '../../types/offer-types';

type ApartamentListProps = {
  apartamentList: Offer[];
  onMouseEnter: (point: Point) => void;
  onMouseLeave: () => void;
};

const ApartamentListBase: React.FC<ApartamentListProps> = ({ apartamentList, onMouseEnter, onMouseLeave }) => (
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

export const ApartamentList = React.memo(ApartamentListBase);
