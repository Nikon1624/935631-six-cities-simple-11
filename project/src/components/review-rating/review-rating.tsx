import React from 'react';
import { RatingStar } from './rating-star/rating-star';
import { RatingStarType } from '../../types/rating-star-types';

type ReviewRatingProps = {
  ratingStars: RatingStarType[];
  value: number;
  onChange: (id: number) => void;
};

export const ReviewRating: React.FC<ReviewRatingProps> = ({ ratingStars, value, onChange }) => (
  <div className="reviews__rating-form form__rating">
    { ratingStars.map(({ id, title }) => <RatingStar id={id} title={title} value={value} key={id} onChange={onChange} />) }
  </div>
);
