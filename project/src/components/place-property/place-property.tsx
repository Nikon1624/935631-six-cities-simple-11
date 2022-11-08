import React, { useCallback } from 'react';
import { useActiveOnMouseEvents } from '../../hooks/useActiveOnMouseEvents';
import { ImageGallery } from '../image-gallery/image-gallery';
import { PlaceDescription } from './place-description/place-description';
import { PlaceHost } from './place-host/place-host';
import { PlaceReviews } from './place-reviews/place-reviews';
import { NearPlaces } from './near-places/near-places';
import { Map } from '../map/map';
import { CityType, PointsType, PointType } from '../../types/city-types';
import { ApartamentCardType } from '../../types/card-types';

type PlacePropertyProps = {
  city: CityType;
  placeData: ApartamentCardType;
};

export const PlaceProperty: React.FC<PlacePropertyProps> = ({ city, placeData }) => {
  const [active, onMouseEnter, onMouseLeave] = useActiveOnMouseEvents<PointType>(null);
  const nearPlacesCoordinates = placeData.nearPlaces.reduce<PointsType>((acc, place) => [...acc, place.coordinates], []);

  const handleMouseEnter = useCallback((point: PointType) => {
    onMouseEnter(point);
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    onMouseLeave();
  }, [onMouseLeave]);

  return (
    <>
      <section className="property">
        <ImageGallery />
        <div className="property__container container">
          <div className="property__wrapper">
            <PlaceDescription />
            <PlaceHost />
            <PlaceReviews />
          </div>
        </div>
        <section className="property__map map">
          <Map city={city} points={nearPlacesCoordinates} selectedPoint={active} />
        </section>
      </section>
      <NearPlaces nearPlaceList={placeData.nearPlaces} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
    </>
  );
};
