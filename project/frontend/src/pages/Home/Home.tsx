import { useEffect } from 'react'

import { Card } from '@my-app/ui-library'
import { useLocation, useNavigate } from 'react-router-dom' // Объединенный импорт

import brandImage from '../../assets/фото.jpg'
import brandImage2 from '../../assets/фото.jpg'

const Home = () => {
  const location = useLocation()
  const navigate = useNavigate() // хук для навигации

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''))

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location])

  // Функция для обработки клика по стрелке карточки
  const handleCardClick = () => {
    navigate('/catalog') // Переход на страницу каталога
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
            <h2 className="brand-subtitle">ИСТОРИЯ БРЕНДА</h2>
            <h1 className="brand-main-title">
              С 2015 ГОДА<br />СОЗДАЕМ ИСТОРИЮ
            </h1>
            <p className="brand-description">
              Наша философия - сочетание традиций<br />
              и современных технологий
            </p>
          </div>
        </div>
      </section>
        
      {/* Третья секция - с карточками */}
      <section className="brand-section cards-section">
        <div className="cards-section__wrapper">
          {/* Контейнер с карточками */}
          <div className="cards-container">
            <Card 
              title="верх"
              children={null}
              className="home-card"
              onArrowClick={handleCardClick}
            />
            
            <Card 
              title="низ"
              children={null}
              className="home-card"
              onArrowClick={handleCardClick}
            />
            
            <Card 
              title="платья"
              children={null}
              className="home-card"
              onArrowClick={handleCardClick}
            />
            
            <Card 
              title="обувь"
              children={null}
              className="home-card"
              onArrowClick={handleCardClick}
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
            <span className="social-text">Instagram • Telegram • WhatsApp</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home