import React from 'react';
import { RatingStarType } from '../../../types/rating-star-types';

type RatingStarProps = {
  value: number;
  onChange: (id: number) => void;
} & RatingStarType;

export const RatingStar: React.FC<RatingStarProps> = ({ id, title, value, onChange }) => {
  const handleChange = () => {
    onChange(id);
  };

  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={id} id={`${id}-stars`} type="radio" checked={value === id} onChange={handleChange} />
      <label htmlFor={`${id}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
};
