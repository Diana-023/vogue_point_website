import React from 'react'

import { MediumCard } from '@my-app/ui-library'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { useBasket } from '../../contexts/BasketContext'
import { allProducts } from '../../data/products'

const MediumCardPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const { items } = useBasket()
  
  const handleGoBack = () => {
    navigate('/#cards-section')
  }

  // Фильтруем товары по категории если она указана
  const filteredProducts = category 
    ? allProducts.filter(product => product.category === category)
    : allProducts

  // Проверяем, какие товары и в каких размерах уже в корзине
  const getProductInBasketInfo = (productId: number) => {
    const productInBasket = items.filter(item => item.id === productId)

    if (productInBasket.length > 0) {
      const sizes = productInBasket.map(item => item.size).join(', ')
      const totalQuantity = productInBasket.reduce((sum, item) => sum + item.quantity, 0)

      return { inBasket: true, sizes, totalQuantity }
    }

    return { inBasket: false, sizes: '', totalQuantity: 0 }
  }

  return (
    <div className="medium-card-page">
      <div className="medium-card-page__header">
        <button className="back-button" onClick={handleGoBack}>
          <span className="back-button__icon">←</span>
          Назад
        </button>
      </div>
      
      {/* Показываем сколько товаров в корзине */}
      <div className="basket-info" style={{
        padding: '0 40px 10px 40px',
        color: '#551c84',
        fontSize: '14px'
      }}>
        В корзине: {items.length} товар(ов)
      </div>
      
      <div className="cards-grid">
        {filteredProducts.map(product => {
          const basketInfo = getProductInBasketInfo(product.id)
          
          return (
            <div 
              key={product.id}
              className="catalog-card-wrapper"
              onClick={() => navigate(`/product-detail/${product.id}`)}
              style={{ position: 'relative' }}
            >
              {/* Индикация если товар уже в корзине */}
              {basketInfo.inBasket && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: '#a469e4',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  zIndex: 10
                }}>
                  ✓ В корзине
                </div>
              )}
              
              <MediumCard
                imageUrl={product.imageUrl}
                title={product.title}
                price={product.price}
                className="catalog-card"
              />
              
              {/* Дополнительная информация о размерах в корзине */}
              {basketInfo.inBasket && (
                <div style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  color: '#666',
                  textAlign: 'center'
                }}>
                  Размеры в корзине: {basketInfo.sizes} 
                  {basketInfo.totalQuantity > 1 && ` (${basketInfo.totalQuantity} шт.)`}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MediumCardPage