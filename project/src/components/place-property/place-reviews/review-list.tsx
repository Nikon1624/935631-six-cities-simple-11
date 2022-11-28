import React from 'react';
import { ReviewItem } from './review-item/review-item';
import { Comment } from '../../../types/offer-types';

type ReviewListProps = {
  reviews: Comment[];
};

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => (
  <>
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
    <ul className="reviews__list">
      { reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      )) }
    </ul>
  </>
);
