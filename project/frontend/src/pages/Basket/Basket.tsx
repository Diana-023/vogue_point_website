import { Basket as BasketComponent } from '@my-app/ui-library'

import { useBasket } from '../../contexts/BasketContext'

const Basket = () => {
  const { items, removeFromBasket, updateQuantity, clearBasket} = useBasket()

  // Преобразуем данные для компонента Basket
  const basketItems = items.map(item => ({
    id: `${item.id}-${item.size}`,
    title: `${item.title} (Размер: ${item.size})`,
    price: item.price,
    quantity: item.quantity,
    imageUrl: item.imageUrl,
    article: item.article,
  }))

  const handleRemoveItem = (id: string | number) => {
    const idString = id.toString()
    const [productId, size] = idString.split('-')

    removeFromBasket(parseInt(productId), size)
  }

  const handleUpdateQuantity = (id: string | number, quantity: number) => {
    const idString = id.toString()
    const [productId, size] = idString.split('-')

    updateQuantity(parseInt(productId), size, quantity)
  }

  return (
    <div className="basket-page">
      {/* Убрал onGoToCatalog из пропсов */}
      <BasketComponent 
        items={basketItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onClearBasket={clearBasket}
      />

      {/* Футер */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-text">VOGUEPOINT</span>
          </div>
          <div className="footer-info">
            <p>© 2026 VoguePoint. Все права защищены.</p>
            <p>Казань, Россия</p>
            <p>voguepoint@brand.com</p>
          </div>
          <div className="footer-social">
            {/* Используем тег <a> для внешних ссылок */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              Instagram
            </a>
            {' • '}
            <a 
              href="https://t.me/your_username" // Замените на свой Telegram
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              Telegram
            </a>
            {' • '}
            <a 
              href="https://wa.me/79001234567" // Замените на номер в международном формате
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Basket