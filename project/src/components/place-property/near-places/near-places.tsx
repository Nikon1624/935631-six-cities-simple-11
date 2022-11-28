import React from 'react';
import { ApartamentCard } from '../../apartament-card/apartament-card';
import { Point, Offer } from '../../../types/offer-types';

type NearPlacesProps = {
  nearPlaceList: Offer[];
  onMouseEnter: (point: Point) => void;
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
