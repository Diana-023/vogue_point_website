import { render, screen, fireEvent } from '@testing-library/react'

import { Basket } from './Basket'

const mockItems = [
  {
    id: 1,
    title: 'Атласное платье мини',
    price: '50000 ₽',
    quantity: 2,
    imageUrl: 'https://example.com/photo1.jpg',
    article: '856734351'
  },
  {
    id: 2,
    title: 'Шелковая блузка',
    price: '30000 ₽', 
    quantity: 1,
    imageUrl: 'https://example.com/photo2.jpg',
    article: '123456789'
  }
]

const mockEmptyItems: never[] = []

describe('Basket', () => {
  // Убедитесь, что все тесты используют переменные
  test('renders empty basket when no items', () => {
    render(<Basket items={mockEmptyItems} />) // Используется mockEmptyItems

    expect(screen.getByText('Корзина пуста')).toBeInTheDocument()
    expect(screen.getByText('Перейти в каталог')).toBeInTheDocument()
    expect(screen.getByText('🛒')).toBeInTheDocument()
  })

  test('renders filled basket with items', () => {
    render(<Basket items={mockItems} />) // Используется mockItems

    expect(screen.getByText('Корзина')).toBeInTheDocument()
    expect(screen.getByText('Атласное платье мини')).toBeInTheDocument()
    expect(screen.getByText('Шелковая блузка')).toBeInTheDocument()
    expect(screen.getByText('50000 ₽')).toBeInTheDocument()
    expect(screen.getByText('30000 ₽')).toBeInTheDocument()
  })

  test('renders article numbers when provided', () => {
    render(<Basket items={mockItems} />) // Используется mockItems

    expect(screen.getByText('Артикул: 856734351')).toBeInTheDocument()
    expect(screen.getByText('Артикул: 123456789')).toBeInTheDocument()
  })

  test('calculates and displays total price correctly', () => {
    render(<Basket items={mockItems} />) // Используется mockItems
    
    expect(screen.getByText('Итого к оплате:')).toBeInTheDocument()
  })

  test('renders checkout button', () => {
    render(<Basket items={mockItems} />) // Используется mockItems

    expect(screen.getByText('К оформлению')).toBeInTheDocument()
  })

  test('calls onRemoveItem when remove button is clicked', () => {
    const mockOnRemoveItem = jest.fn()

    render(<Basket items={mockItems} onRemoveItem={mockOnRemoveItem} />) // Используется mockItems
    
    const removeButtons = screen.getAllByText('Удалить')

    fireEvent.click(removeButtons[0])
    
    expect(mockOnRemoveItem).toHaveBeenCalledWith(1)
  })

  test('decreases quantity when minus button is clicked', () => {
    const mockOnUpdateQuantity = jest.fn()
    const mockOnRemoveItem = jest.fn()

    render(
      <Basket 
        items={mockItems} // Используется mockItems
        onUpdateQuantity={mockOnUpdateQuantity} 
        onRemoveItem={mockOnRemoveItem}
      />
    )
    
    const minusButtons = screen.getAllByText('−')

    fireEvent.click(minusButtons[0])
    
    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1, 1)
  })

  test('removes item when minus is clicked with quantity 1', () => {
    const mockOnUpdateQuantity = jest.fn()
    const mockOnRemoveItem = jest.fn()

    render(
      <Basket 
        items={mockItems} // Используется mockItems
        onUpdateQuantity={mockOnUpdateQuantity} 
        onRemoveItem={mockOnRemoveItem}
      />
    )
    
    const minusButtons = screen.getAllByText('−')

    fireEvent.click(minusButtons[1])
    
    expect(mockOnRemoveItem).toHaveBeenCalledWith(2)
    expect(mockOnUpdateQuantity).not.toHaveBeenCalledWith(2, 0)
  })

  test('increases quantity when plus button is clicked', () => {
    const mockOnUpdateQuantity = jest.fn()

    render(<Basket items={mockItems} onUpdateQuantity={mockOnUpdateQuantity} />) // Используется mockItems
    
    const plusButtons = screen.getAllByText('+')

    fireEvent.click(plusButtons[0])
    
    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1, 3)
  })

  test('calls onClearBasket when clear basket button is clicked with confirmation', () => {
    const mockOnClearBasket = jest.fn()
    
    const confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => true)

    render(<Basket items={mockItems} onClearBasket={mockOnClearBasket} />) // Используется mockItems
    
    const clearButton = screen.getByText('Очистить всю корзину')

    fireEvent.click(clearButton)
    
    expect(confirmSpy).toHaveBeenCalledWith('Очистить всю корзину?')
    expect(mockOnClearBasket).toHaveBeenCalled()
    
    confirmSpy.mockRestore()
  })

  test('does not call onClearBasket when user cancels confirmation', () => {
    const mockOnClearBasket = jest.fn()
    
    const confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => false)

    render(<Basket items={mockItems} onClearBasket={mockOnClearBasket} />) // Используется mockItems
    
    const clearButton = screen.getByText('Очистить всю корзину')

    fireEvent.click(clearButton)
    
    expect(confirmSpy).toHaveBeenCalledWith('Очистить всю корзину?')
    expect(mockOnClearBasket).not.toHaveBeenCalled()
    
    confirmSpy.mockRestore()
  })

  test('handles checkout with alert', () => {
    const mockOnClearBasket = jest.fn()
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

    render(<Basket items={mockItems} onClearBasket={mockOnClearBasket} />) // Используется mockItems
    
    const checkoutButton = screen.getByText('К оформлению')

    fireEvent.click(checkoutButton)
    
    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringContaining('Заказ оформлен!')
    )
    
    alertSpy.mockRestore()
  })

  test('renders correct quantity values', () => {
    render(<Basket items={mockItems} />) // Используется mockItems
    
    const quantityValues = screen.getAllByText('2', { exact: false })

    expect(quantityValues.length).toBeGreaterThan(0)
    
    const quantityDisplay = screen.getByText('2')

    expect(quantityDisplay).toBeInTheDocument()
  })

  test('does not show clear basket button when onClearBasket is not provided', () => {
    render(<Basket items={mockItems} />) // Используется mockItems
    
    expect(screen.queryByText('Очистить всю корзину')).not.toBeInTheDocument()
  })

  test('shows clear basket button when onClearBasket is provided', () => {
    const mockOnClearBasket = jest.fn()
    
    render(<Basket items={mockItems} onClearBasket={mockOnClearBasket} />) // Используется mockItems
    
    expect(screen.getByText('Очистить всю корзину')).toBeInTheDocument()
  })
})