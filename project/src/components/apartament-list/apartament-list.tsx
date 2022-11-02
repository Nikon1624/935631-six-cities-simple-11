import React, { useState, useCallback } from 'react';
import { ApartamentCard } from '../apartament-card/apartament-card';
import { ApartamentCardType } from '../../types/card-types';

type ApartamentListProps = {
  apartamentList: ApartamentCardType[];
};

export const ApartamentList: React.FC<ApartamentListProps> = ({ apartamentList }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleMouseEnter = useCallback((id: number) => {
    setActiveCard(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveCard(null);
  }, []);

  return (
    <div className="cities__places-list places__list tabs__content">
      { activeCard }
      {
        apartamentList.map((apartamentData) => (
          <ApartamentCard
            key={apartamentData.id}
            { ...apartamentData }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))
      }
    </div>
  );
};
