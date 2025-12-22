import { Card } from '@my-app/ui-library'
import { useNavigate } from 'react-router-dom'

const CardPage = () => {
  const navigate = useNavigate()

  const handleCardClick = (category: string) => {
    navigate(`/catalog?category=${category}`)
  }

  return (
    <div style={{ 
      padding: '40px',
      backgroundColor: '#f3eeff',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        {/* Карточка 1 - Верх */}
        <div style={{ flex: '1 0 200px' }}>
          <Card 
            title="Верх"
            children={null}
            category="верх"
            description="Верхние ноты вашего образа. \nБаза для самовыражения."
            onArrowClick={() => handleCardClick('верх')}
            imageAlt="Верхняя одежда"
          />
        </div>
        
        {/* Карточка 2 - Низ */}
        <div style={{ flex: '1 0 200px' }}>
          <Card 
            title="Низ"
            children={null}
            category="низ"
            description="База, которая сочетается с любым верхом, \nпревращая простую комбинацию в продуманный лук."
            onArrowClick={() => handleCardClick('низ')}
            imageAlt="Верхняя одежда"
          />
        </div>
        
        {/* Карточка 3 - Платья */}
        <div style={{ flex: '1 0 200px' }}>
          <Card 
            title="Платья"
            children={null}
            category="платья"
            description="Готовые истории в одном флаконе. Каждое платье \nэто законченный образ, настроение и обещание прекрасного момента."
            onArrowClick={() => handleCardClick('платья')}
            imageAlt="Верхняя одежда"
          />
        </div>
        
        {/* Карточка 4 - Обувь */}
        <div style={{ flex: '1 0 200px' }}>
          <Card 
            title="Туфли"
            children={null}
            category="обувь"
            description="Финальный аккорд. \nТо, на чем держится и завершается любой образ. "
            onArrowClick={() => handleCardClick('обувь')}
            imageAlt="Верхняя одежда"
          />
        </div>
      </div>
    </div>
  )
}

export default CardPage