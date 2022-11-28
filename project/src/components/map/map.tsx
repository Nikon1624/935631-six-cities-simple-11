import React, { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import { useMap } from '../../hooks/use-map';
import { City, Point } from '../../types/offer-types';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  points: Point[];
  selectedPoint: Point | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export const Map: React.FC<MapProps> = ({ city, points, selectedPoint }) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map && city) {
      map.flyTo([city.location.latitude, city.location.longitude], city.location.zoom);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            selectedPoint && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint, city]);

  return (
    <div ref={mapRef} style={{ height: '100%' }} />
  );
};
