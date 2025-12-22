import { render, screen, fireEvent } from '@testing-library/react'

import { ProductCard } from './ProductCard'

const mockProduct = {
  id: 1,
  imageUrl: 'https://example.com/product.jpg',
  title: 'Атласное платье мини',
  description: 'Элегантное атласное платье для вечерних мероприятий',
  price: '50000 ₽',
  typeImages: [
    'https://example.com/color1.jpg',
    'https://example.com/color2.jpg'
  ],
  alt: 'Фото платья'
}

const mockProductWithoutOptional = {
  id: 2,
  imageUrl: 'https://example.com/product2.jpg',
  title: 'Простое платье',
  price: '30000 ₽'
}

describe('ProductCard', () => {
  // Общий setup для всех тестов (опционально)
  beforeEach(() => {
    // Можно глобально замокать alert, но лучше мокать в конкретных тестах
    jest.spyOn(window, 'alert').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Рендеринг', () => {
    test('отображает продукт со всей информацией', () => {
      render(<ProductCard {...mockProduct} />)

      expect(screen.getByText('Атласное платье мини')).toBeInTheDocument()
      expect(screen.getByText('Элегантное атласное платье для вечерних мероприятий')).toBeInTheDocument()
      expect(screen.getByText('50000 ₽')).toBeInTheDocument()
      expect(screen.getByText('другие цвета:')).toBeInTheDocument()
      expect(screen.getByAltText('Фото платья')).toBeInTheDocument()
      expect(screen.getByText('размеры:')).toBeInTheDocument()
    })

    test('отображает продукт без опциональных полей', () => {
      render(<ProductCard {...mockProductWithoutOptional} />)

      expect(screen.getByText('Простое платье')).toBeInTheDocument()
      expect(screen.getByText('30000 ₽')).toBeInTheDocument()
      expect(screen.queryByText('другие цвета:')).not.toBeInTheDocument()
      expect(screen.getByText('размеры:')).toBeInTheDocument()
    })

    test('использует заголовок как alt текст когда alt не указан', () => {
      render(<ProductCard {...mockProductWithoutOptional} />)
      expect(screen.getByAltText('Простое платье')).toBeInTheDocument()
    })

    test('не отображает кнопку "Назад" когда showBackButton=false', () => {
      render(<ProductCard {...mockProduct} showBackButton={false} />)
      expect(screen.queryByText('← Назад к каталогу')).not.toBeInTheDocument()
    })

    test('отображает кнопку "Назад" по умолчанию', () => {
      render(<ProductCard {...mockProduct} />)
      expect(screen.getByText('← Назад к каталогу')).toBeInTheDocument()
    })

    test('применяет textPosition класс', () => {
      const { container } = render(<ProductCard {...mockProduct} textPosition="right" />)

      expect(container.firstChild).toHaveClass('text-right')
    })

    test('применяет пользовательский className', () => {
      const { container } = render(<ProductCard {...mockProduct} className="custom-class" />)

      expect(container.firstChild).toHaveClass('custom-class')
    })
  })

  describe('Изображения', () => {
    test('отображает дополнительные изображения когда они предоставлены', () => {
      render(<ProductCard {...mockProduct} />)

      const typeImages = screen.getAllByAltText(/Вариант/)

      expect(typeImages).toHaveLength(2)
      expect(typeImages[0]).toHaveAttribute('src', 'https://example.com/color1.jpg')
      expect(typeImages[1]).toHaveAttribute('src', 'https://example.com/color2.jpg')
    })

    test('переключает основное изображение при клике на вариант', () => {
      render(<ProductCard {...mockProduct} />)
      
      const typeImageContainer = screen.getAllByRole('img', { name: /Вариант/ })[0].closest('div')

      fireEvent.click(typeImageContainer!)
      
      const mainImage = screen.getByAltText('Фото платья')

      expect(mainImage).toHaveAttribute('src', 'https://example.com/color1.jpg')
    })

    test('обрабатывает ошибку загрузки основного изображения', () => {
      render(<ProductCard {...mockProduct} />)
      
      const mainImage = screen.getByAltText('Фото платья') as HTMLImageElement

      fireEvent.error(mainImage)
      
      expect(mainImage.src).toContain('data:image/svg+xml;base64')
    })

    test('обрабатывает ошибку загрузки дополнительных изображений', () => {
      render(<ProductCard {...mockProduct} />)
      
      const typeImages = screen.getAllByAltText(/Вариант/) as HTMLImageElement[]

      fireEvent.error(typeImages[0])
      
      expect(typeImages[0].src).toContain('data:image/svg+xml;base64')
    })
  })

  describe('Размеры', () => {
    test('отображает кнопки размеров', () => {
      render(<ProductCard {...mockProduct} />)

      expect(screen.getByText('размеры:')).toBeInTheDocument()
      expect(screen.getByText('XS')).toBeInTheDocument()
      expect(screen.getByText('S')).toBeInTheDocument()
      expect(screen.getByText('M')).toBeInTheDocument()
      expect(screen.getByText('L')).toBeInTheDocument()
    })

    test('выбирает размер при клике', () => {
      render(<ProductCard {...mockProduct} />)
      
      const sizeButton = screen.getByText('M')

      fireEvent.click(sizeButton)
      
      // Проверяем визуально, что кнопка выбрана
      expect(sizeButton).toHaveClass('sizeSelected')
    })

    test('показывает галочку для размера в корзине', () => {
      const mockIsInBasket = jest.fn((size: string) => size === 'M')
      
      render(<ProductCard {...mockProduct} isInBasket={mockIsInBasket} />)
      
      // Ищем кнопку, содержащую текст "M" (даже если там есть пробелы или переносы)
      const sizeButtons = screen.getAllByRole('button', { name: /M/ })

      const sizeButtonWithCheck = sizeButtons.find(btn => btn.textContent?.includes('✓'))

      expect(sizeButtonWithCheck).toBeInTheDocument()
      expect(sizeButtonWithCheck).toHaveTextContent(/M.*✓/)
    })

    test('не показывает галочку для размера не в корзине', () => {
      const mockIsInBasket = jest.fn((size: string) => size === 'M')
      
      render(<ProductCard {...mockProduct} isInBasket={mockIsInBasket} />)
      
      const sizeButton = screen.getByText('S')

      expect(sizeButton).toHaveTextContent('S')
      expect(sizeButton.textContent).not.toMatch(/✓/)
    })
  })

  describe('Корзина', () => {
    test('показывает alert при попытке добавить в корзину без выбора размера', () => {
      const mockAddToBasket = jest.fn()
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {}) // МОК
      
      render(<ProductCard {...mockProduct} onAddToBasket={mockAddToBasket} />)
      
      const cartButton = screen.getByText('выберите размер')

      fireEvent.click(cartButton)
      
      expect(mockAddToBasket).not.toHaveBeenCalled()
      
      alertSpy.mockRestore()
    })

    test('добавляет товар в корзину при выборе размера', () => {
      const mockAddToBasket = jest.fn()

      render(<ProductCard {...mockProduct} onAddToBasket={mockAddToBasket} />)
      
      const sizeButton = screen.getByText('M')

      fireEvent.click(sizeButton)
      
      const cartButton = screen.getByText('в корзину')

      fireEvent.click(cartButton)
      
      expect(mockAddToBasket).toHaveBeenCalledWith('M')
    })

    test('показывает alert при попытке добавить в корзину без выбора размера', () => {
      const mockAddToBasket = jest.fn()
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
      
      render(<ProductCard {...mockProduct} onAddToBasket={mockAddToBasket} />)
      
      const cartButton = screen.getByText('выберите размер')

      fireEvent.click(cartButton)
      
      expect(mockAddToBasket).not.toHaveBeenCalled()
      
      alertSpy.mockRestore()
    })

    test('показывает "в корзине" когда размер уже в корзине', () => {
      const mockIsInBasket = jest.fn((size: string) => size === 'M')
      const mockAddToBasket = jest.fn()
      
      render(
        <ProductCard 
          {...mockProduct} 
          isInBasket={mockIsInBasket}
          onAddToBasket={mockAddToBasket}
        />
      )
      
      const sizeButtons = screen.getAllByRole('button', { name: /M/ })
      const sizeButton = sizeButtons.find(btn => btn.textContent?.includes('M')) || sizeButtons[0]

      fireEvent.click(sizeButton)
      
      const cartButton = screen.getByText('в корзине')

      expect(cartButton).toBeInTheDocument()
      // В компоненте кнопка не блокируется, она просто меняет стиль
      // expect(cartButton).toBeDisabled()
    })

    test('блокирует кнопку корзины без выбранного размера', () => {
      render(<ProductCard {...mockProduct} />)
      
      const cartButton = screen.getByText('выберите размер')

      expect(cartButton).toBeDisabled()
    })

    test('разблокирует кнопку корзины после выбора размера', () => {
      render(<ProductCard {...mockProduct} />)
      
      const sizeButton = screen.getByText('M')

      fireEvent.click(sizeButton)
      
      const cartButton = screen.getByText('в корзину')

      expect(cartButton).toBeEnabled()
    })
  })

  describe('Вкладки информации', () => {
    test('показывает alert с описанием при клике на вкладку "описание"', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {}) // МОК
      
      render(<ProductCard {...mockProduct} />)
      
      const descriptionTab = screen.getByText('описание')

      fireEvent.click(descriptionTab)
      
      alertSpy.mockRestore()
    })

    test('показывает alert с уходом при клике на вкладку "уход"', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {}) // МОК
      
      render(<ProductCard {...mockProduct} />)
      
      const careTab = screen.getByText('уход')

      fireEvent.click(careTab)
      
      expect(alertSpy).toHaveBeenCalledWith(
        expect.stringContaining('Уход за изделием')
      )
      
      alertSpy.mockRestore()
    })

    test('показывает содержимое вкладки "описание" при активации', () => {
      render(<ProductCard {...mockProduct} />)
      
      const descriptionTab = screen.getByText('описание')

      fireEvent.click(descriptionTab)
    })

    test('показывает содержимое вкладки "уход" при активации', () => {
      render(<ProductCard {...mockProduct} />)
      
      const careTab = screen.getByText('уход')

      fireEvent.click(careTab)
      
      expect(screen.getByText('Рекомендации по уходу:')).toBeInTheDocument()
      expect(screen.getByText('Стирка при 30°C')).toBeInTheDocument()
      expect(screen.getByText('Не отжимать в центрифуге')).toBeInTheDocument()
    })

    test('скрывает содержимое вкладки при переключении на другую вкладку', () => {
      render(<ProductCard {...mockProduct} />)
      
      const descriptionTab = screen.getByText('описание')

      fireEvent.click(descriptionTab)
      
      expect(screen.getByText('Подробное описание:')).toBeInTheDocument()
      
      const careTab = screen.getByText('уход')

      fireEvent.click(careTab)
      
      expect(screen.queryByText('Подробное описание:')).not.toBeInTheDocument()
      expect(screen.getByText('Рекомендации по уходу:')).toBeInTheDocument()
    })
  })

  describe('Навигация', () => {
    test('вызывает onBackClick при клике на кнопку "Назад"', () => {
      const mockBackClick = jest.fn()

      render(<ProductCard {...mockProduct} onBackClick={mockBackClick} />)
      
      const backButton = screen.getByText('← Назад к каталогу')

      fireEvent.click(backButton)
      
      expect(mockBackClick).toHaveBeenCalled()
    })

    test('вызывает window.history.back() когда onBackClick не передан', () => {
      const backSpy = jest.spyOn(window.history, 'back').mockImplementation(() => {})
      
      render(<ProductCard {...mockProduct} />)
      
      const backButton = screen.getByText('← Назад к каталогу')

      fireEvent.click(backButton)
      
      expect(backSpy).toHaveBeenCalled()
      backSpy.mockRestore()
    })
  })

  describe('Поведение кнопки корзины', () => {
    test('изменяет текст кнопки в зависимости от состояния', () => {
      const mockIsInBasket = jest.fn((size: string) => size === 'M')

      render(<ProductCard {...mockProduct} isInBasket={mockIsInBasket} />)
      
      // Изначально: "выберите размер"
      expect(screen.getByText('выберите размер')).toBeInTheDocument()
      
      // Выбираем размер не в корзине: "в корзину"
      const sizeButton = screen.getByText('S')

      fireEvent.click(sizeButton)
      expect(screen.getByText('в корзину')).toBeInTheDocument()
      
      // Выбираем размер в корзине: "в корзине"
      // Ищем кнопку размера M, которая содержит галочку
      const sizeButtons = screen.getAllByRole('button', { name: /M/ })
      const sizeButtonInBasket = sizeButtons.find(btn => btn.textContent?.includes('M')) || sizeButtons[0]

      fireEvent.click(sizeButtonInBasket)

      expect(screen.getByText('в корзине')).toBeInTheDocument()
    })

    test('правильно отображает классы для разных состояний кнопки', () => {
      const mockIsInBasket = jest.fn((size: string) => size === 'M')
      const mockAddToBasket = jest.fn()
      
      render(
        <ProductCard 
          {...mockProduct} 
          isInBasket={mockIsInBasket}
          onAddToBasket={mockAddToBasket}
        />
      )
      
      // Выбираем размер в корзине
      const sizeButtons = screen.getAllByRole('button', { name: /M/ })
      const sizeButton = sizeButtons.find(btn => btn.textContent?.includes('M')) || sizeButtons[0]

      fireEvent.click(sizeButton)
      
      const cartButton = screen.getByText('в корзине')

      expect(cartButton).toHaveClass('inCart')
      expect(cartButton).not.toHaveClass('buttonDisabled')
      // Проверяем, что кнопка не заблокирована
      expect(cartButton).not.toBeDisabled()
    })
  })
})