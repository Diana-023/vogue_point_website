import React from 'react'

import { ProductCard } from '@my-app/ui-library'
import { useParams } from 'react-router-dom'

const getProductData = (id: string | undefined) => {
  const allProducts = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop',
      title: 'Вечернее платье',
      description: 'Шелковое платье с открытыми плечами',
      price: '12 999 ₽',
      typeImages: [
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=100&h=120&fit=crop',
        'https://images.unsplash.com/photo-1564591075644-0f9fc2c8c6f1?w=100&h=120&fit=crop'
      ],
      textPosition: 'right' as const
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
      title: 'Деловой костюм',
      description: 'Костюм из итальянской шерсти',
      price: '24 500 ₽',
      typeImages: [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=120&fit=crop',
        'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=100&h=120&fit=crop'
      ],
      textPosition: 'left' as const
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop',
      title: 'Шелковая блузка',
      price: '8 900 ₽',
      typeImages: [
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&h=120&fit=crop',
        'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=100&h=120&fit=crop'
      ],
      textPosition: 'right' as const
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=500&fit=crop',
      title: 'Пиджак оверсайз',
      description: 'Удлиненный пиджак свободного кроя',
      price: '15 750 ₽',
      textPosition: 'left' as const
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop',
      title: 'Юбка-карандаш',
      price: '9 300 ₽',
      typeImages: [
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&h=120&fit=crop',
        'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=100&h=120&fit=crop'
      ],
      textPosition: 'right' as const
    },
    {
      id: 6,
      imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=500&fit=crop',
      title: 'Футболка оверсайз',
      description: 'Хлопковая футболка свободного кроя',
      price: '4 500 ₽',
      textPosition: 'left' as const
    }
  ]
  
  const product = allProducts.find(p => p.id.toString() === id)
  
  return product || allProducts[0]
}

const ProductCardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const product = getProductData(id)

  return (
    <div className="product-card-page">
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
      />
    </div>
  )
}

export default ProductCardPage