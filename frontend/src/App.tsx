import './App.css'
import '@my-app/ui-library/style.css'
import { Card, ProductCard, Basket } from '@my-app/ui-library'
import photo1 from './assets/1.0.jpg'
import photo2 from './assets/2.0.jpg'
import photo3 from './assets/2.1.jpg'
import photo4 from './assets/2.2.jpg'

function App() {

  const demoProduct = {
      id: 1,
      imageUrl: photo1,
      title: 'Лунное сияние',
      description: 'Артикул: 856734351',
      price: '49990 ₽',
      typeImages: [photo2, photo3],
      textPosition: 'left' as const
    }

  // Данные для ПУСТОЙ корзины
  const emptyBasketItems: Array<{
    id: string | number;
    title: string;
    price: string;
    quantity: number;
    imageUrl: string;
  }> = [];

  // Данные для ЗАПОЛНЕННОЙ корзины
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
    <div className="app">
      <header className="app-header">
        <h1>Laba 5</h1>
        <p>Разработка компонента карточки товара с описанием и ценой и списком корзины</p>
      </header>

      <main className="app-main">

        {/* Секция ProductCard */}
        <section className="section">
          <h2>ProductCard Компонент</h2>

          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <ProductCard {...demoProduct} />
          </div>
        </section>

      {/* Секция ПУСТОЙ корзины */}
        <section className="section">
          <h2>Пустая корзина</h2>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Basket items={emptyBasketItems} />
          </div>
        </section>

        {/* Секция ЗАПОЛНЕННОЙ корзины */}
        <section className="section">
          <h2>Заполненная корзина</h2>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Basket items={filledBasketItems} />
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <Card>
          <div className="footer-content">
            <p>UI Library v1.0.0 - Демонстрационное приложение</p>
            <p>React + TypeScript + Vite + Jest</p>
          </div>
        </Card>
      </footer>
    </div>
  )
}

export default App