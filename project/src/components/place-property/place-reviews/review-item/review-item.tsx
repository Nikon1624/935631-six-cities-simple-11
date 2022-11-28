import React from 'react';
import { MAX_RATING_VALUE } from '../../../../const';
import { Comment } from '../../../../types/offer-types';

type ReviewItemProps = {
  review: Comment;
};

export const ReviewItem: React.FC<ReviewItemProps> = ({ review: { user, rating, comment, date } }) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">
        { user.name }
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{ width: `${(100 / MAX_RATING_VALUE) * rating}%` }} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        { comment }
      </p>
      <time className="reviews__time" dateTime="2019-04-24">{ date }</time>
    </div>
  </li>
);
