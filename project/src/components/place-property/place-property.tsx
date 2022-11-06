import { ImageGallery } from '../image-gallery/image-gallery';
import { PlaceDescription } from './place-description/place-description';
import { PlaceHost } from './place-host/place-host';
import { PlaceReviews } from './place-reviews/place-reviews';

export const PlaceProperty = () => (
  <section className="property">
    <ImageGallery />
    <div className="property__container container">
      <div className="property__wrapper">
        <PlaceDescription />
        <PlaceHost />
        <PlaceReviews />
      </div>
    </div>
    <section className="property__map map" />
  </section>
);
