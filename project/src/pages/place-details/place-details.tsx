import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { NotFound } from '../not-found/not-found';
import { ImageGallery } from '../../components/image-gallery/image-gallery';
import { PlaceDescription } from '../../components/place-property/place-description/place-description';
import { PlaceHost } from '../../components/place-property/place-host/place-host';
import { ReviewList } from '../../components/place-property/place-reviews/review-list';
import { FeedbackForm } from '../../components/feedback-form/feedback-form';
import { Map } from '../../components/map/map';
import { Loader } from '../../components/loader/loader';
import { getActiveOffer, getActiveOfferComments, getLoadingStatus, getCity, getNearPlacePoints, getActiveOfferNearPlaces } from '../../store/selectors';
import { fetchOneOfferAction } from '../../store/api-actions';
import { NearPlaces } from '../../components/place-property/near-places/near-places';
import { useActiveItem } from '../../hooks/use-active-item';
import { Point } from '../../types/offer-types';

export const PlaceDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const city = useAppSelector(getCity);
  const loadingStatus = useAppSelector(getLoadingStatus);
  const offer = useAppSelector(getActiveOffer);
  const nearPlaces = useAppSelector(getActiveOfferNearPlaces);
  const nearPlacePoints = useAppSelector(getNearPlacePoints);
  const comments = useAppSelector(getActiveOfferComments);

  const [activePoint, changeActivePoint] = useActiveItem<Point | null>(offer ? { ...offer.location, id: offer.id } : null);

  const onMouseEnter = useCallback((point: Point) => {
    changeActivePoint(point);
  }, [changeActivePoint]);

  const onMouseLeave = useCallback(() => {
    changeActivePoint(offer ? { ...offer.location, id: offer.id } : null);
  }, [changeActivePoint, offer]);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneOfferAction(id));
    }
  }, [dispatch, id]);

  if (loadingStatus) {
    return <Loader />;
  }

  if (!offer || !comments || !city || !nearPlaces) {
    return <NotFound />;
  }

  return (
    <>
      <section className="property">
        <ImageGallery images={offer.images} />
        <div className="property__container container">
          <div className="property__wrapper">
            <PlaceDescription offerDetails={offer} />
            <PlaceHost host={offer.host} description={offer.description} />
            <section className="property__reviews reviews">
              <ReviewList reviews={comments} />
              <FeedbackForm />
            </section>
          </div>
        </div>
        <section className="property__map map">
          <Map city={city} points={[{ ...offer.location, id: offer.id }, ...nearPlacePoints]} selectedPoint={activePoint} />
        </section>
      </section>
      <NearPlaces nearPlaceList={nearPlaces} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
    </>
  );
};
