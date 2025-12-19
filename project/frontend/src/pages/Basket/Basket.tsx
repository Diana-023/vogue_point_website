import { Basket as BasketComponent } from '@my-app/ui-library'

import photo1 from '../../assets/1.0.jpg'
import photo4 from '../../assets/2.2.jpg'

const Basket = () => {
  const filledBasketItems = [
    {
      id: 1,
      title: 'Лунное сияние',
      price: '49990 ₽',
      quantity: 1,
      imageUrl: photo1,
      article: '856734351'
    },
    {
      id: 2,
      title: 'Розовое искушение',
      price: '54990 ₽',
      quantity: 1,
      imageUrl: photo4,
      article: '123456789'
    }
  ]

  return (
    <div className="basket-page">
      <BasketComponent items={filledBasketItems} />

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
            <span className="social-text">Instagram • Telegram • WhatsApp</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Basket