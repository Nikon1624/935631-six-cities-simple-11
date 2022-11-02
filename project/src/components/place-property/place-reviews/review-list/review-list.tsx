import { ReviewItem } from './review-item/review-item';

export const ReviewList = () => (
  <>
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
    <ul className="reviews__list">
      <ReviewItem />
    </ul>
  </>
);
