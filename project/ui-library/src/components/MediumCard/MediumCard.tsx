import React from 'react'
import './MediumCard.css'

export interface MediumCardProps {
  imageUrl: string;
  title: string;
  price: string;
  className?: string;
}

export const MediumCard: React.FC<MediumCardProps> = ({
  imageUrl,
  title,
  price,
  className = '',
}) => {
  return (
    <div className={`medium-card ${className}`}>
      <div className="medium-card__image">
        <img src={imageUrl} alt={title} />
      </div>
      
      <div className="medium-card__info">
        <div className="medium-card__text">
          <h4 className="medium-card__title">{title}</h4>
          <p className="medium-card__price">{price}</p>
        </div>
      </div>
    </div>
  )
}