import React from 'react';

export type ApartamentCardProps = {
  mark?: string;
  url: string;
  imgUrl: string;
  price: number;
  ratingPercent: number;
  description: string;
  type: string;
};

export const ApartamentCard: React.FC<ApartamentCardProps> = ({
  mark,
  url,
  imgUrl,
  price,
  ratingPercent,
  description,
  type,
}) => (
  <article className="cities__card place-card">
    { mark && <div className="place-card__mark"><span>{ mark }</span></div> }
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href={url}>
        <img className="place-card__image" src={`${process.env.PUBLIC_URL}${imgUrl}`} width="260" height="200" alt="Place" />
      </a>
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
          <span style={{ width: `${ratingPercent}%` }} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href={url}>{ description }</a>
      </h2>
      <p className="place-card__type">{ type }</p>
    </div>
  </article>
);
