import React, { useCallback } from 'react';
import { useActiveOnMouseEvents } from '../../hooks/useActiveOnMouseEvents';
import { ApartamentList } from '../../components/apartament-list/apartament-list';
import { Map } from '../../components/map/map';
import { ApartamentCardType } from '../../types/card-types';
import { CityType, PointType, PointsType } from '../../types/city-types';

type MainProps = {
  availablePlaceCount: number;
  apartamentList: ApartamentCardType[];
  city: CityType;
};

export const Main: React.FC<MainProps> = ({ availablePlaceCount, apartamentList, city }) => {
  const [active, onMouseEnter, onMouseLeave] = useActiveOnMouseEvents<PointType>(null);

  const handleMouseEnter = useCallback((point: PointType) => {
    onMouseEnter(point);
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    onMouseLeave();
  }, [onMouseLeave]);

  const placePoints = apartamentList.reduce<PointsType>((acc, appartament) => ([...acc, appartament.coordinates]), []);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{ availablePlaceCount } places to stay in Amsterdam</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select" />
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
          <ApartamentList apartamentList={apartamentList} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map city={city} points={placePoints} selectedPoint={active} />
          </section>
        </div>
      </div>
    </div>
  );
};
