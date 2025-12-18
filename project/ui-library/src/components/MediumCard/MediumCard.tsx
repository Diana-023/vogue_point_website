import React, { useState } from 'react'
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
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite)
    console.log(`Товар "${title}" ${isFavorite ? 'удален из' : 'добавлен в'} избранное`)
  }

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
        
        <button 
          className={`medium-card__favorite-btn ${isFavorite ? 'medium-card__favorite-btn--active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <span className="heart-icon">{isFavorite ? '♥' : '♡'}</span>
        </button>
      </div>
    </div>
  )
}