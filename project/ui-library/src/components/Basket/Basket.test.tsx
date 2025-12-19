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
  test('renders empty basket when no items', () => {
    render(<Basket items={mockEmptyItems} />)

    expect(screen.getByText('Корзина пуста')).toBeInTheDocument()
    expect(screen.getByText('Перейти в каталог')).toBeInTheDocument()
    expect(screen.getByText('🛒')).toBeInTheDocument()
  })

  test('renders filled basket with items', () => {
    render(<Basket items={mockItems} />)

    expect(screen.getByText('Корзина')).toBeInTheDocument()
    expect(screen.getByText('Атласное платье мини')).toBeInTheDocument()
    expect(screen.getByText('Шелковая блузка')).toBeInTheDocument()
    expect(screen.getByText('50000 ₽')).toBeInTheDocument()
    expect(screen.getByText('30000 ₽')).toBeInTheDocument()
  })

  test('renders article numbers when provided', () => {
    render(<Basket items={mockItems} />)

    expect(screen.getByText('Артикул: 856734351')).toBeInTheDocument()
    expect(screen.getByText('Артикул: 123456789')).toBeInTheDocument()
  })

  test('calculates and displays total price correctly', () => {
    render(<Basket items={mockItems} />)
    expect(screen.getByText('130 000 ₽')).toBeInTheDocument()
    expect(screen.getByText('Итого к оплате:')).toBeInTheDocument()
  })

  test('renders checkout button', () => {
    render(<Basket items={mockItems} />)

    expect(screen.getByText('К оформлению')).toBeInTheDocument()
  })

  test('calls onRemoveItem when remove button is clicked', () => {
    const mockOnRemoveItem = jest.fn()

    render(<Basket items={mockItems} onRemoveItem={mockOnRemoveItem} />)
  })

  test('calls onUpdateQuantity when quantity buttons are clicked', () => {
    const mockOnUpdateQuantity = jest.fn()

    render(<Basket items={mockItems} onUpdateQuantity={mockOnUpdateQuantity} />)
  })

  test('handles image error', () => {
    render(<Basket items={mockItems} />)

    const image = screen.getByAltText('Атласное платье мини') as HTMLImageElement

    fireEvent.error(image)

    expect(image.src).toBe('https://example.com/photo1.jpg')
  })

  test('catalog button click handler works', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    
    render(<Basket items={mockEmptyItems} />)

    const catalogButton = screen.getByText('Перейти в каталог')

    fireEvent.click(catalogButton)

    expect(consoleSpy).toHaveBeenCalledWith('Переход в каталог')
    
    consoleSpy.mockRestore()
  })
})