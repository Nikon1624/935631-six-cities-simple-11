import React from 'react';

type ImageGalleryProps = {
  images: string[];
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => (
  <div className="property__gallery-container container">
    <div className="property__gallery">
      { images.map((imageUrl, i) => (
        <div className="property__image-wrapper" key={`${i}-${imageUrl}`}>
          <img className="property__image" src={imageUrl} alt="studio" />
        </div>
      )) }
    </div>
  </div>
);
