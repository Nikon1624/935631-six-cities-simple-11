import { ReviewList } from '../place-reviews/review-list/review-list';
import { FeedbackForm } from '../../feedback-form/feedback-form';

export const PlaceReviews = () => (
  <section className="property__reviews reviews">
    <ReviewList />
    <FeedbackForm />
  </section>
);
