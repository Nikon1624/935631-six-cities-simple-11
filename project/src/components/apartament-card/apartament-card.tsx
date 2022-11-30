import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Point, Offer } from '../../types/offer-types';

export type ApartamentCardProps = {
  onMouseEnter: (point: Point) => void;
  onMouseLeave: () => void;
} & (Offer);

export const ApartamentCard: React.FC<ApartamentCardProps> = ({
  id,
  type,
  title,
  city,
  price,
  description,
  images,
  bedrooms,
  goods,
  host,
  isPremium,
  location,
  maxAdults,
  previewImage,
  rating,
  onMouseEnter,
  onMouseLeave,
}) => {
  const handleMouseEnter = () => {
    onMouseEnter({ ...location, id });
  };

  const handleMouseLeave = () => {
    onMouseLeave();
  };

  return (
    <article className="cities__card place-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      { isPremium && <div className="place-card__mark"><span>Premium</span></div> }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{ price }</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{ description }</Link>
        </h2>
        <p className="place-card__type">{ type }</p>
      </div>
    </article>
  );
};
