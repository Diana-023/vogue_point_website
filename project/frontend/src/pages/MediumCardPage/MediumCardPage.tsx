import React from 'react'

import { MediumCard } from '@my-app/ui-library'
import { useNavigate } from 'react-router-dom'

const MediumCardPage: React.FC = () => {
  const navigate = useNavigate()
  const products = [
    {
      id: 1,
      imageUrl: 'ссылка на фото',
      title: 'Вечернее платье',
      price: '12 999 ₽'
    },
    {
      id: 2,
      imageUrl: 'ссылка на фото',
      title: 'Деловой костюм',
      price: '9 499 ₽'
    },
    {
      id: 3,
      imageUrl: 'ссылка на фото',
      title: 'Шелковая блузка',
      price: '6 299 ₽'
    },
    {
      id: 4,
      imageUrl: 'ссылка на фото',
      title: 'Юбка миди',
      price: '4 599 ₽'
    },
    {
      id: 5,
      imageUrl: 'ссылка на фото',
      title: 'Брюки классические',
      price: '7 899 ₽'
    },
    {
      id: 6,
      imageUrl: 'ссылка на фото',
      title: 'Пиджак шерстяной',
      price: '11 299 ₽'
    },
    {
      id: 7,
      imageUrl: 'ссылка на фото',
      title: 'Топ шелковый',
      price: '3 999 ₽'
    },
    {
      id: 8,
      imageUrl: 'ссылка на фото',
      title: 'Кардиган кашемировый',
      price: '8 499 ₽'
    },
    {
      id: 9,
      imageUrl: 'ссылка на фото',
      title: 'Блуза офисная',
      price: '5 299 ₽'
    }
  ]

  return (
    <div className="medium-card-page">
      <div className="cards-grid">
        {products.map(product => (
          <div 
            key={product.id}
            className="catalog-card-wrapper"
            onClick={() => navigate(`/product-detail/${product.id}`)}
          >
            <MediumCard
              imageUrl={product.imageUrl}
              title={product.title}
              price={product.price}
              className="catalog-card"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MediumCardPage