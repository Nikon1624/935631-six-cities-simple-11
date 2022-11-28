import React from 'react';
import { Offer } from '../../../types/offer-types';

type PlaceHostProps = Pick<Offer, 'host' | 'description'>;

export const PlaceHost: React.FC<PlaceHostProps> = ({ description, host: { avatarUrl, isPro, name } }) => (
  <div className="property__host">
    <h2 className="property__host-title">Meet the host</h2>
    <div className="property__host-user user">
      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
        <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
      </div>
      <span className="property__user-name">
        { name }
      </span>
      { isPro && <span className="property__user-status">Pro</span> }
    </div>
    <div className="property__description">
      <p className="property__text">
        { description }
      </p>
    </div>
  </div>
);
