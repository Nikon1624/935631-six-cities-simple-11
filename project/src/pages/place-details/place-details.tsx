import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { NotFound } from '../not-found/not-found';
import { ImageGallery } from '../../components/image-gallery/image-gallery';
import { PlaceDescription } from '../../components/place-property/place-description/place-description';
import { PlaceHost } from '../../components/place-property/place-host/place-host';
import { ReviewList } from '../../components/place-property/place-reviews/review-list';
import { FeedbackForm } from '../../components/feedback-form/feedback-form';
import { Loader } from '../../components/loader/loader';
import { getActiveOffer, getActiveOfferComments, getLoadingStatus } from '../../store/data-slice/selectors';
import { getAuthStatus } from '../../store/user-slice/selectors';
import { fetchOneOfferAction } from '../../store/api-actions';
import { NearPlaces } from '../../components/place-property/near-places/near-places';
import { AuthStatus } from '../../const';

export const PlaceDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const loadingStatus = useAppSelector(getLoadingStatus);
  const offer = useAppSelector(getActiveOffer);
  const comments = useAppSelector(getActiveOfferComments);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneOfferAction(id));
    }
  }, [dispatch, id]);

  if (loadingStatus) {
    return <Loader />;
  }

  if (!offer || !comments) {
    return <NotFound />;
  }

  return (
    <section className="property">
      <ImageGallery images={offer.images} />
      <div className="property__container container">
        <div className="property__wrapper">
          <PlaceDescription offerDetails={offer} />
          <PlaceHost host={offer.host} description={offer.description} />
          <section className="property__reviews reviews">
            <ReviewList reviews={comments} />
            { authStatus === AuthStatus.Auth && <FeedbackForm hotelId={id as string} /> }
          </section>
        </div>
      </div>
      <NearPlaces />
    </section>
  );
};
