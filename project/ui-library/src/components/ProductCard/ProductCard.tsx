import React, { useState } from 'react'

import styles from './ProductCard.module.css'

export interface ProductCardProps {
  id: string | number;
  imageUrl: string;
  title: string;
  description?: string;
  price: string;
  typeImages?: string[];
  
  textPosition?: 'left' | 'right';
  buttonText?: string;
  onButtonClick?: () => void;
  onBackClick?: () => void;
  
  onAddToBasket?: (size: string) => void;
  isInBasket?: (size: string) => boolean;
  
  alt?: string;
  className?: string;
  showBackButton?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  description,
  price,
  typeImages = [],
  textPosition = 'left',
  onBackClick,
  onAddToBasket,
  isInBasket,
  alt,
  className = '',
  showBackButton = true
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [mainImage, setMainImage] = useState<string>(imageUrl)
  const [secondaryImages, setSecondaryImages] = useState<string[]>(typeImages)
  const [activeTab, setActiveTab] = useState<'description' | 'care' | null>(null)
  // Функция для переключения фото
  const switchImage = (newMainImage: string) => {
    const newSecondaryImages = [mainImage, ...secondaryImages.filter(img => img !== newMainImage)]

    setMainImage(newMainImage)
    setSecondaryImages(newSecondaryImages)
  }
  const handleCartClick = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер')

      return
    }
    
    if (onAddToBasket) {
      onAddToBasket(selectedSize)
    }
  }
  
  const handleSizeClick = (size: string) => {
    setSelectedSize(size)
  }
  
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick()
    } else {
      window.history.back()
    }
  }
  
  const checkIfInBasket = (size: string) => {
    return isInBasket ? isInBasket(size) : false
  }
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhGOUZBIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2R1Y3QgSW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=='
  }

  // Функции для уведомлений
  const handleDescriptionClick = () => {
    setActiveTab('description')

    const productDescription = description || 'Описание товара отсутствует'

    alert(`Описание: ${productDescription}`)
  }

  const handleCareClick = () => {
    setActiveTab('care')
    const careInstructions = `
Уход за изделием:
1. Стирка при 30°C
2. Не отжимать в центрифуге
3. Сушить в расправленном виде
4. Гладить при низкой температуре
5. Хранить в сухом месте
    `.trim()

    alert(careInstructions)
  }

  const cardClass = `${styles.productCard} ${styles[`text-${textPosition}`]} ${className}`.trim()

  return (
    <div className={cardClass}>
      {showBackButton && (
        <div className={styles.backButtonContainer}>
          <button 
            className={styles.backButton}
            onClick={handleBackClick}
          >
            ← Назад к каталогу
          </button>
        </div>
      )}
      
      {/* Основное фото */}
      <img
        src={mainImage}
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
        </div>
        
        {/* Блок с другими оттенками/фото */}
        {secondaryImages.length > 0 && (
          <div className={styles.typeImages}>
            <p className={styles.typeLabel}>другие цвета:</p>
            <div className={styles.imagesContainer}>
              {secondaryImages.map((imageUrl, index) => (
                <div 
                  key={index}
                  className={styles.typeImageWrapper}
                  onClick={() => switchImage(imageUrl)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={imageUrl}
                    alt={`Вариант ${index + 1}`}
                    className={styles.typeImage}
                    onError={handleImageError}
                  />
                </div>
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
                className={`${styles.sizeButton} 
                  ${selectedSize === size ? styles.sizeSelected : ''}
                  ${checkIfInBasket(size) ? styles.sizeInBasket : ''}`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
                {checkIfInBasket(size) && ' ✓'}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.buttonsContainer}>
          <button 
            className={`${styles.button} 
              ${selectedSize && checkIfInBasket(selectedSize) ? styles.inCart : ''}
              ${!selectedSize ? styles.buttonDisabled : ''}`}
            onClick={handleCartClick}
            disabled={!selectedSize}
          >
            {selectedSize && checkIfInBasket(selectedSize) 
              ? 'в корзине' 
              : selectedSize 
                ? 'в корзину'
                : 'выберите размер'}
          </button>
        </div>

        {/* Вкладки "описание" и "уход" */}
        <div className={styles.infoTabs}>
          <button 
            className={`${styles.infoTab} ${activeTab === 'description' ? styles.infoTabActive : ''}`}
            onClick={handleDescriptionClick}
          >
            описание
          </button>
          <button 
            className={`${styles.infoTab} ${activeTab === 'care' ? styles.infoTabActive : ''}`}
            onClick={handleCareClick}
          >
            уход
          </button>
        </div>

        {activeTab === 'description' && description && (
          <div className={styles.tabContent}>
            <h4>Подробное описание:</h4>
            <p>{description}</p>
          </div>
        )}
        
        {activeTab === 'care' && (
          <div className={styles.tabContent}>
            <h4>Рекомендации по уходу:</h4>
            <ul>
              <li>Стирка при 30°C</li>
              <li>Не отжимать в центрифуге</li>
              <li>Сушить в расправленном виде</li>
              <li>Гладить при низкой температуре</li>
              <li>Хранить в сухом месте</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}