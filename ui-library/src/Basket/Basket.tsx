import React from 'react';
import styles from './Basket.module.css';

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
}

// Компонент для пустой корзины
const EmptyBasket: React.FC = () => {
  const handleGoToCatalog = () => {
    console.log('Переход в каталог');
  };
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
  );
};

// Компонент для заполненной корзины
const FilledBasket: React.FC<BasketProps> = ({
  items,
}) => {

  // Вычисляем общую стоимость
  const total = items.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/\D/g, '')); // Убираем всё кроме цифр
    return sum + (price * item.quantity);
  }, 0);

  // Форматируем сумму с пробелами
  const formattedTotal = total.toLocaleString('ru-RU') + ' ₽';

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
              <div className={styles.itemPrice}>
                {item.price}
              </div>
            </div>
            
            {/* Полосочка после каждого товара */}
            <div className={styles.divider}></div>
          </div>
        ))}
      </div>
      
      {/* Кнопка оформления */}
      <div className={styles.checkoutSection}>
        <div className={styles.totalPrice}>
          Итого к оплате: <span className={styles.totalAmount}>{formattedTotal}</span>
        </div>
        <button className={styles.checkoutButton}>
          К оформлению
        </button>
      </div>
    </div>
  );
};

// Основной компонент Basket
export const Basket: React.FC<BasketProps> = (props) => {
  // Если корзина пустая - показываем EmptyBasket, иначе - FilledBasket
  return props.items.length === 0 ? <EmptyBasket /> : <FilledBasket {...props} />;
};