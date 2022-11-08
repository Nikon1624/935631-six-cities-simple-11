import React from 'react';
import { ApartamentCard } from '../../apartament-card/apartament-card';
import { NearPlaceType } from '../../../types/card-types';
import { PointType } from '../../../types/city-types';

type NearPlacesProps = {
  nearPlaceList: NearPlaceType[];
  onMouseEnter: (point: PointType) => void;
  onMouseLeave: () => void;
};

export const NearPlaces: React.FC<NearPlacesProps> = ({ nearPlaceList, onMouseEnter, onMouseLeave }) => (
  <div className="container">
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        { nearPlaceList.map((nearPlace) => (
          <ApartamentCard
            key={nearPlace.id}
            { ...nearPlace }
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        )) }
      </div>
    </section>
  </div>
);
