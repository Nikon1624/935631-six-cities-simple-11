import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { ReviewRating } from '../review-rating/review-rating';
import { RatingStarType } from '../../types/rating-star-types';
import { useAppDispatch } from '../../hooks/index';
import { sendCommentAction } from '../../store/api-actions';
import { FormData } from '../../types/review-form-data';

type FeedbackFormProps = {
  hotelId: string;
};

const ratingStars: RatingStarType[] = [
  {
    id: 5,
    title: 'perfect',
  },
  {
    id: 4,
    title: 'good',
  },
  {
    id: 3,
    title: 'not bad',
  },
  {
    id: 2,
    title: 'badly',
  },
  {
    id: 1,
    title: 'terribly',
  },
];

const initialFormData: FormData = {
  rating: -1,
  comment: '',
};

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ hotelId }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const MIN_MESSAGE_LENGTH = 50;
  const submitDisabled = formData.comment.length < MIN_MESSAGE_LENGTH || formData.rating === -1;

  const handleRatingChange = useCallback((id: number) => {
    setFormData({ ...formData, rating: id });
  }, [formData]);

  const handleReviewTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const message = evt.target.value;
    setFormData({ ...formData, comment: message });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const reviewData = {
      hotelId,
      formData,
    };

    dispatch(sendCommentAction(reviewData));
    setFormData(initialFormData);
  };

  return (
    <form className="reviews__form form" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewRating ratingStars={ratingStars} value={formData.rating} onChange={handleRatingChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleReviewTextChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={submitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
