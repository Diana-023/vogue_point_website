import React from 'react'

import { ProductCard } from '@my-app/ui-library'
import { useParams, useNavigate } from 'react-router-dom'

import { useBasket } from '../../contexts/BasketContext'
import { allProducts } from '../../data/products'

const ProductCardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { items, addToBasket } = useBasket()
  
  // Находим товар по ID
  const product = allProducts.find(p => p.id.toString() === id) || allProducts[0]
  
  const handleBackClick = () => {
    navigate(-1)
  }

  // Обработчик добавления в корзину
  const handleAddToBasket = (size: string) => {
    // Подготавливаем данные товара для корзины
    const basketItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      article: `ART${product.id.toString().padStart(6, '0')}`
    }
    
    addToBasket(basketItem, size)
    alert(`Товар "${product.title}" (размер: ${size}) добавлен в корзину!`)
  }

  // Проверка, добавлен ли товар с определенным размером
  const checkIfInBasket = (size: string) => {
    return items.some(item => item.id === product.id && item.size === size)
  }

  return (
    <div className="product-page-container">
      <div className="product-card-wrapper">
        <ProductCard
          key={product.id}
          id={product.id}
          imageUrl={product.imageUrl}
          title={product.title}
          description={product.description}
          price={product.price}
          typeImages={product.typeImages}
          textPosition={product.textPosition}
          alt={product.title}
          className="productCard fullPageCard"
          showBackButton={true}
          onBackClick={handleBackClick}
          onAddToBasket={handleAddToBasket}
          isInBasket={checkIfInBasket}
        />
      </div>
    </div>
  )
}

export default ProductCardPage