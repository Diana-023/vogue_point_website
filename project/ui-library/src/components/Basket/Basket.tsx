import React from 'react'

import styles from './Basket.module.css'

export interface BasketProps {
  items: Array<{
    id: string | number;
    title: string;
    price: string;
    quantity: number;
    imageUrl: string;
    article?: string;
  }>;
  onRemoveItem?: (id: string | number) => void;
  onUpdateQuantity?: (id: string | number, quantity: number) => void;
  onClearBasket?: () => void;
}

// Компонент для пустой корзины
const EmptyBasket: React.FC = () => {
  const handleGoToCatalog = () => {
    // ID третьей секции на главной странице
    const sectionId = 'cards-section'
    
    // Если мы на главной странице
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId)

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        // Обновляем URL с якорем
        window.history.pushState(null, '', `/#${sectionId}`)
      }
    } else {
      // Если не на главной, переходим на главную с якорем
      window.location.href = `/#${sectionId}`
    }
  }

  return (
    <div className={styles.emptyBasketCard}>
      <div className={styles.emptyBasketIcon}>🛒</div>
      <h3 className={styles.emptyBasketTitle}>Корзина пуста</h3>
      <button 
        className={styles.catalogButton}
        onClick={handleGoToCatalog}
      >
        Перейти в каталог
      </button>
    </div>
  )
}

// Компонент для заполненной корзины
const FilledBasket: React.FC<BasketProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearBasket,
}) => {
  // Вычисляем общую стоимость
  const total = items.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/\D/g, ''))
    
    return sum + (price * item.quantity)
  }, 0)

  // Форматируем сумму с пробелами
  const formattedTotal = total.toLocaleString('ru-RU') + ' ₽'

  const handleCheckout = () => {
    alert(`Заказ оформлен!\n\nТоваров: ${items.length}\nОбщая сумма: ${formattedTotal}\n\nСпасибо за покупку!`)
    
    // Если есть функция очистки корзины, можно автоматически очистить
    if (onClearBasket) {
      onClearBasket()
    }
  }

  const handleDecrease = (id: string | number, currentQuantity: number) => {
    if (onUpdateQuantity && currentQuantity > 1) {
      onUpdateQuantity(id, currentQuantity - 1)
    } else if (onRemoveItem && currentQuantity === 1) {
      onRemoveItem(id)
    }
  }

  const handleIncrease = (id: string | number, currentQuantity: number) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(id, currentQuantity + 1)
    }
  }

  const handleRemove = (id: string | number) => {
    if (onRemoveItem) {
      onRemoveItem(id)
    }
  }

  return (
    <div className={styles.filledBasket}>
      {/* Заголовок */}
      <h2 className={styles.basketTitle}>Корзина</h2>
      
      {/* Список товаров */}
      <div className={styles.basketItems}>
        <div className={styles.divider}></div>

        {items.map(item => (
          <div key={item.id}>
            {/* Товар */}
            <div className={styles.basketItem}>
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className={styles.basketImage}
              />
              <div className={styles.itemDetails}>
                <h3>{item.title}</h3>
                {item.article && (
                  <p className={styles.itemDescription}>Артикул: {item.article}</p>
                )}
              </div>
              
              {/* Блок с количеством и кнопкой удаления */}
              <div className={styles.quantityAndDelete}>
                <div className={styles.quantityControls}>
                  <button 
                    className={styles.quantityButton}
                    onClick={() => handleDecrease(item.id, item.quantity)}
                    aria-label="Уменьшить количество"
                  >
                    −
                  </button>
                  <span className={styles.quantityValue}>{item.quantity}</span>
                  <button 
                    className={styles.quantityButton}
                    onClick={() => handleIncrease(item.id, item.quantity)}
                    aria-label="Увеличить количество"
                  >
                    +
                  </button>
                </div>
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleRemove(item.id)}
                  aria-label="Удалить товар"
                >
                  Удалить
                </button>
              </div>
              
              <div className={styles.itemPrice}>
                {item.price}
              </div>
            </div>
            
            {/* Полосочка после каждого товара */}
            <div className={styles.divider}></div>
          </div>
        ))}
      </div>
      
      {/* Кнопка очистки корзины */}
      {onClearBasket && (
        <div className={styles.clearBasketWrapper}>
          <button
            className={styles.clearBasketButton}
            onClick={() => {
              if (window.confirm('Очистить всю корзину?')) {
                onClearBasket()
              }
            }}
          >
            Очистить всю корзину
          </button>
        </div>
      )}
      
      {/* Кнопка оформления */}
      <div className={styles.checkoutSection}>
        <div className={styles.totalPrice}>
          Итого к оплате: <span className={styles.totalAmount}>{formattedTotal}</span>
        </div>
        <button 
          className={styles.checkoutButton}
          onClick={handleCheckout}
        >
          К оформлению
        </button>
      </div>
    </div>
  )
}

// Основной компонент Basket
export const Basket: React.FC<BasketProps> = (props) => {
  // Если корзина пустая - показываем EmptyBasket, иначе - FilledBasket
  return props.items.length === 0 ? <EmptyBasket /> : <FilledBasket {...props} />
}