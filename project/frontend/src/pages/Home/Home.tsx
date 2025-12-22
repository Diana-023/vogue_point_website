import { useEffect } from 'react'

import { Card } from '@my-app/ui-library'
import { useLocation, useNavigate } from 'react-router-dom' // Объединенный импорт

import shoesImage from '../../assets/босоножки.jpg'
import topImage from '../../assets/корс.jpg'
import dressImage from '../../assets/п3.jpg'
import brandImage from '../../assets/фото.jpg'
import brandImage2 from '../../assets/фото.jpg'
import bottomImage from '../../assets/юбка.jpg'

const Home = () => {
  const location = useLocation()
  const navigate = useNavigate() // хук для навигации

  useEffect(() => {
    // Проверяем, есть ли якорь в URL при загрузке страницы
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '')
      const element = document.getElementById(hash)
      
      if (element) {
        // Небольшая задержка для полной загрузки DOM
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }, 300)
      }
    }
  }, [location])

  // Функция для обработки клика по стрелке карточки
  const handleCardClick = (category: string) => {
    navigate(`/catalog?category=${category}`)
  }

  return (
    <div className="home-page">
      {/* Первая секция - главный баннер */}
      <section className="brand-section first-section">
        <div className="brand-background">
          <img 
            src={brandImage} 
            alt="Фон бренда" 
            className="background-image"
          />
        </div>
        
        <div className="brand-text-left-bottom">
          <div className="text-container">
            <h2 className="brand-subtitle">СОЗДАНО С ЛЮБОВЬЮ</h2>
            <h1 className="brand-main-title">
              VOGUE<br />POINT
            </h1>
          </div>
        </div>
      </section>

      {/* Вторая секция - при прокрутке вниз */}
      <section className="brand-section second-section" id="about-section">
        <div className="brand-background">
          <img 
            src={brandImage2} 
            alt="История бренда" 
            className="background-image"
          />
        </div>
        
        <div className="brand-text-right-top">
          <div className="text-container">
            <h2 className="brand-subtitle">ИДЕЯ. ОБРАЗ. ВОПЛОЩЕНИЕ.</h2>
            <h1 className="brand-main-title">
              2026<br />ШЬЕМ ВОЗДУШНЫЕ МИРЫ
            </h1>
            <p className="brand-description">
              Мы не просто ателье. Мы — архитекторы эфемерного.
В наших руках ткань становится не просто материалом, а страницей, на которую мы записываем ваши истории, мечты и характер. Каждый шов — это предложение, каждый силуэт — глава, а готовый образ — законченный роман, написанный специально для вас.

Дизайнеры-рассказчики. Они слушают не только ваши слова, но и паузы между ними. Они ловят тень идеи в вашем взгляде, ритм в походке, мелодию в жестах. Их задача — перевести язык вашей души на язык кроя, драпировки и линии. Они не создают одежду — они расшифровывают вас.

Ткань — наш язык. Шёлк, который шепчет. Бархат, который хранит тайны. Шифон, что поёт на ветру. Твид, который рассуждает. Каждый материал имеет свой тембр, свой характер. Мы находим тот единственный, чей голос созвучен вашему внутреннему «я».

Ваш уникальный силуэт — наша единственная коллекция.
Мы не верим в конвейер и сезонные тренды. Мы верим в вечное — в индивидуальность. У нас нет «коллекций» в обычном смысле. Наша коллекция — это вы. Каждый проект начинается и заканчивается одним человеком. Это одежда-зеркало, которое отражает не тело, а суть.
            </p>
          </div>
        </div>
      </section>
        
      {/* Третья секция - с карточками */}
      <section className="brand-section cards-section" id="cards-section">
        <div className="cards-section__wrapper">
          <div className="cards-container">
            <Card 
              title="верх"
              children={null}
              className="home-card"
              category="верх"
              description="Верхние ноты вашего образа. База для самовыражения."
              onArrowClick={() => handleCardClick('верх')}
              imageUrl={topImage}
              imageAlt="Верхняя одежда"
            />
            
            <Card 
              title="низ"
              children={null}
              className="home-card"
              category="низ"
              description="База, которая сочетается с любым верхом, превращая простую комбинацию в продуманный лук."
              onArrowClick={() => handleCardClick('низ')}
              imageUrl={bottomImage}
              imageAlt="Юбки и брюки"
            />
            
            <Card 
              title="платья"
              children={null}
              className="home-card"
              category="платья"
              description="Готовые истории в одном флаконе. Каждое платье это законченный образ, настроение и обещание прекрасного момента."
              onArrowClick={() => handleCardClick('платья')}
              imageUrl={dressImage}
              imageAlt="Платья"
            />
            
            <Card 
              title="обувь"
              children={null}
              className="home-card"
              category="обувь"
              description="Финальный аккорд. То, на чем держится и завершается любой образ."
              onArrowClick={() => handleCardClick('обувь')}
              imageUrl={shoesImage}
              imageAlt="Обувь"
            />
          </div>
        </div>
      </section>

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

export default Home