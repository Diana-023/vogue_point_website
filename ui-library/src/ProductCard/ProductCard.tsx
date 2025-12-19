import React, { useState } from 'react';

import styles from './ProductCard.module.css'

export interface ProductCardProps {
  // Основные данные
  id: string | number;
  imageUrl: string;
  title: string;
  description?: string;  // необязательный
  price: string;
  typeImages?: string[];  // Массив URL маленьких фото вместо текста
  
  // Настройки отображения
  textPosition?: 'left' | 'right';  // положение текста
  buttonText?: string;              // текст кнопки
  onButtonClick?: () => void;       // обработчик клика
  
  // Дополнительные параметры
  alt?: string;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  description,
  price,
  typeImages,  // Массив фото вместо текста
  textPosition = 'left',    // значение по умолчанию
  alt,
  className = ''
}) => {

  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleCartClick = () => {
    setIsInCart(!isInCart); // Обработчик для корзины
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size); // Устанавливаем выбранный размер
    console.log(`Выбран размер: ${size}`);
  };
  
  // Обработчик ошибок загрузки изображения
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhGOUZBIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2R1Y3QgSW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=='
  }

  // Определяем классы в зависимости от позиции текста
  const cardClass = `${styles.productCard} ${styles[`text-${textPosition}`]} ${className}`.trim()

  return (
    <div className={cardClass}>
      {/* Фоновая картинка */}
      <img
        src={imageUrl}
        alt={alt || title}
        className={styles.productImage}
        onError={handleImageError}
      />
      
      {/* Контент карточки */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        
        {description && (
          <p className={styles.description}>{description}</p>
        )}
        
        <div className={styles.priceContainer}>
          <div className={styles.price}>{price}</div>
          <button 
            className={styles.installmentButton}
            onClick={() => console.log('Рассрочка')}
          >
            рассрочка
          </button>
        </div>
        
      {/* Заменяем текст на маленькие фото */}
        {typeImages && typeImages.length > 0 && (
          <div className={styles.typeImages}>
            <p className={styles.typeLabel}>другие оттенки:</p>
            <div className={styles.imagesContainer}>
              {typeImages.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Вариант ${index + 1}`}
                  className={styles.typeImage}
                  onError={handleImageError}
                />
              ))}
            </div>
          </div>
        )}

        <div className={styles.divider}></div>

        <div className={styles.sizes}>
          <p className={styles.sizesLabel}>размеры:</p>
          <div className={styles.sizeButtons}>
            {['XS', 'S', 'M', 'L'].map((size) => (
              <button
                key={size}
                className={`${styles.sizeButton} ${selectedSize === size ? styles.sizeSelected : ''}`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.buttonsContainer}>
          <button 
            className={`${styles.button} ${isInCart ? styles.inCart : ''}`}
            onClick={handleCartClick} 
          >
            {isInCart ? 'в корзине' : 'в корзину'}
          </button>
          
          <button 
            className={styles.heartButton}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        <div className={styles.infoTabs}>
          <button 
            className={styles.infoTab}
            onClick={() => console.log('Показать описание')}
          >
            описание
          </button>
          <button 
            className={styles.infoTab}
            onClick={() => console.log('Показать уход')}
          >
            уход
          </button>
        </div>
      </div>
    </div>
  )
}