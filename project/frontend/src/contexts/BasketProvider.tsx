import React, { useState, useEffect } from 'react'

import { type BasketProviderProps, type BasketItem, BasketContext } from './BasketContext'

export const BasketProvider: React.FC<BasketProviderProps> = ({ children }) => {
  // Загружаем из localStorage при инициализации
  const [items, setItems] = useState<BasketItem[]>(() => {
    try {
      const saved = localStorage.getItem('basket')

      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Ошибка загрузки корзины из localStorage:', error)

      return []
    }
  })

  // Сохраняем в localStorage при каждом изменении
  useEffect(() => {
    try {
      localStorage.setItem('basket', JSON.stringify(items))
    } catch (error) {
      console.error('Ошибка сохранения корзины в localStorage:', error)
    }
  }, [items])

  // Добавить товар в корзину
  const addToBasket = (item: Omit<BasketItem, 'quantity' | 'size'>, size: string) => {
    setItems(prevItems => {
      // Проверяем, есть ли уже такой товар с таким же размером
      const existingItemIndex = prevItems.findIndex(
        i => i.id === item.id && i.size === size
      )

      if (existingItemIndex !== -1) {
        // Увеличиваем количество существующего товара
        const updatedItems = prevItems.map((i, index) => index === existingItemIndex
          ? { ...i, quantity: i.quantity + 1 }
          : i
        )

        return updatedItems
      } else {
        // Добавляем новый товар с количеством 1 и размером
        const newItem: BasketItem = {
          ...item,
          quantity: 1,
          size
        }

        return [...prevItems, newItem]
      }
    })
  }

  // Удалить товар из корзины
  const removeFromBasket = (id: number, size: string) => {
    setItems(prevItems => prevItems.filter(item => !(item.id === id && item.size === size))
    )
  }

  // Обновить количество товара
  const updateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity < 1) {
      removeFromBasket(id, size)

      return
    }

    setItems(prevItems => prevItems.map(item => item.id === id && item.size === size
      ? { ...item, quantity }
      : item
    )
    )
  }

  // Рассчитать общую стоимость
  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parseInt(item.price.replace(/\D/g, '')) || 0

      return total + (price * item.quantity)
    }, 0)
  }

  // Очистить корзину
  const clearBasket = () => {
    setItems([])
  }

  return (
    <BasketContext.Provider value={{
      items,
      addToBasket,
      removeFromBasket,
      updateQuantity,
      getTotalPrice,
      clearBasket
    }}>
      {children}
    </BasketContext.Provider>
  )
}