import React from 'react'
import './Card.css'

export interface CardProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  onArrowClick?: () => void;
  category?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  className = '',
  onArrowClick,
  category,
  description,
  children,
  imageUrl,
  imageAlt = 'Изображение товара'
}) => {
  const handleArrowClick = () => {
    if (onArrowClick) {
      onArrowClick()
    }
  }

  const displayContent = () => {
    if (children) {
      return children
    }
    
    if (description) {
      return description.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))
    }
    
    return 'ТЕКСТ ТЕКСТ ТЕКСТ\nТЕКСТ ТЕКСТ ТЕКСТ\nТЕКСТ ТЕКСТ ТЕКСТ\nТЕКСТ ТЕКСТ'.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ))
  }

  return (
    <div className={`card ${className}`}>
      <div className="card__header">
        <h3 className="card__title">
          {title || category || 'вещь гардероба'}
        </h3>
      </div>
      
      <div className="card__image">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="card__image-real"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              borderRadius: '4px'
            }}
          />
        ) : (
          <div className="image-placeholder">[ФОТО]</div>
        )}
      </div>
      
      <div className="card__content">
        <div className="card__text">
          {displayContent()}
        </div>
      </div>
      
      <div className="card__arrow" onClick={handleArrowClick}>
        <span className="arrow-icon">⟶</span>
      </div>
    </div>
  )
}