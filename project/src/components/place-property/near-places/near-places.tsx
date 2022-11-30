import React from 'react';
import { Map } from '../../../components/map/map';
import { useAppSelector } from '../../../hooks/index';
import { useActiveItem } from '../../../hooks/use-active-item';
import { ApartamentCard } from '../../apartament-card/apartament-card';
import { getCity, getActiveOfferNearPlaces, getNearPlacePoints } from '../../../store/data-slice/selectors';
import { Point } from '../../../types/offer-types';

export const NearPlaces: React.FC = () => {
  const [activePoint, changeActivePoint] = useActiveItem<Point | null>(null);
  const city = useAppSelector(getCity);
  const nearPlaceList = useAppSelector(getActiveOfferNearPlaces);
  const nearPlacePoints = useAppSelector(getNearPlacePoints);

  const handleMouseEnter = (point: Point) => {
    changeActivePoint(point);
  };

  const handleMouseLeave = () => {
    changeActivePoint(null);
  };

  if (!nearPlaceList || !city || !nearPlacePoints) {
    return null;
  }

  return (
    <>
      <section className="property__map map">
        <Map city={city} points={nearPlacePoints} selectedPoint={activePoint} />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            { nearPlaceList.map((nearPlace) => (
              <ApartamentCard
                key={nearPlace.id}
                { ...nearPlace }
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            )) }
          </div>
        </section>
      </div>
    </>
  );
};
