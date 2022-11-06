import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { ReviewRating } from '../review-rating/review-rating';
import { RatingStarType } from '../../types/rating-star-types';

type FormData = {
  reviewRating: number;
  reviewText: string;
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

export const FeedbackForm = () => {
  const [formData, setFormData] = useState<FormData>({
    reviewRating: -1,
    reviewText: '',
  });

  const MIN_MESSAGE_LENGTH = 50;
  const submitDisabled = formData.reviewText.length < MIN_MESSAGE_LENGTH || formData.reviewRating === -1;

  const handleRatingChange = useCallback((id: number) => {
    setFormData({ ...formData, reviewRating: id });
  }, []);

  const handleReviewTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const message = evt.target.value;
    setFormData({ ...formData, reviewText: message });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form className="reviews__form form" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewRating ratingStars={ratingStars} value={formData.reviewRating} onChange={handleRatingChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.reviewText}
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
