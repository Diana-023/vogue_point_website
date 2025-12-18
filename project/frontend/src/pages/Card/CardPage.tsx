import { Card } from '@my-app/ui-library'
import { useNavigate } from 'react-router-dom'

const CardPage = () => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate('/catalog') // Переход в каталог
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
        {/* Карточка 1 */}
        <div style={{ flex: '1 0 200px' }}>
          <Card 
            title="Платье вечернее"
            children={null}
            onArrowClick={handleCardClick} // Передаем функцию
          />
        </div>
        
        {/* Карточка 2 */}
        <div style={{ flex: '1 0 200px' }}>
          <Card 
            title="Костюм деловой"
            children={null}
            onArrowClick={handleCardClick} // Передаем функцию
          />
        </div>
        
        {/* Карточка 3 */}
        <div style={{ flex: '1 0 200px' }}>
          <Card 
            title="Блузка шелковая"
            children={null}
            onArrowClick={handleCardClick} // Передаем функцию
          />
        </div>
        
        {/* Карточка 4 */}
        <div style={{ flex: '1 0 200px' }}>
          <Card 
            title="Юбка миди"
            children={null}
            onArrowClick={handleCardClick} // Передаем функцию
          />
        </div>
      </div>
    </div>
  )
}

export default CardPage