import React from 'react'
import './Card.css'

export interface CardProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  onArrowClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  className = '',
  onArrowClick,
}) => {
  const handleArrowClick = () => {
    if (onArrowClick) {
      onArrowClick()
    }
  }

  return (
    <div className={`card ${className}`}>
      <div className="card__header">
        <h3 className="card__title">вещь гардероба</h3>
      </div>
      
      <div className="card__image">
        <div className="image-placeholder">[ФОТО]</div>
      </div>
      
      <div className="card__content">
        <div className="card__text">
          <p>ТЕКСТ ТЕКСТ ТЕКСТ</p>
          <p>ТЕКСТ ТЕКСТ ТЕКСТ</p>
          <p>ТЕКСТ ТЕКСТ ТЕКСТ</p>
          <p>ТЕКСТ ТЕКСТ</p>
        </div>
      </div>
      
      <div className="card__arrow" onClick={handleArrowClick}>
        <span className="arrow-icon">⟶</span>
      </div>
    </div>
  )
}