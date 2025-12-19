import { render, screen, fireEvent } from '@testing-library/react'

import { ProductCard } from './ProductCard'

const mockProduct = {
  id: 1,
  imageUrl: 'https://example.com/product.jpg',
  title: 'Атласное платье мини',
  description: '856734351',
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
  test('renders product with all information', () => {
    render(<ProductCard {...mockProduct} />)

    expect(screen.getByText('Атласное платье мини')).toBeInTheDocument()
    expect(screen.getByText('856734351')).toBeInTheDocument()
    expect(screen.getByText('50000 ₽')).toBeInTheDocument()
    expect(screen.getByText('рассрочка')).toBeInTheDocument()
    expect(screen.getByText('другие оттенки:')).toBeInTheDocument()
    expect(screen.getByAltText('Фото платья')).toBeInTheDocument()
  })

  test('renders product without optional fields', () => {
    render(<ProductCard {...mockProductWithoutOptional} />)

    expect(screen.getByText('Простое платье')).toBeInTheDocument()
    expect(screen.getByText('30000 ₽')).toBeInTheDocument()
    expect(screen.queryByText('856734351')).not.toBeInTheDocument()
    expect(screen.queryByText('другие оттенки:')).not.toBeInTheDocument()
  })

  test('renders type images when provided', () => {
    render(<ProductCard {...mockProduct} />)

    const typeImages = screen.getAllByAltText(/Вариант/)

    expect(typeImages).toHaveLength(2)
    expect(typeImages[0]).toHaveAttribute('src', 'https://example.com/color1.jpg')
    expect(typeImages[1]).toHaveAttribute('src', 'https://example.com/color2.jpg')
  })

  test('renders size buttons', () => {
    render(<ProductCard {...mockProduct} />)

    expect(screen.getByText('размеры:')).toBeInTheDocument()
    expect(screen.getByText('XS')).toBeInTheDocument()
    expect(screen.getByText('S')).toBeInTheDocument()
    expect(screen.getByText('M')).toBeInTheDocument()
    expect(screen.getByText('L')).toBeInTheDocument()
  })

  test('handles size selection', () => {
    const consoleSpy = jest.spyOn(console, 'log')

    render(<ProductCard {...mockProduct} />)

    const sizeButton = screen.getByText('M')

    fireEvent.click(sizeButton)

    expect(consoleSpy).toHaveBeenCalledWith('Выбран размер: M')
    consoleSpy.mockRestore()
  })

  test('toggles favorite state', () => {
    render(<ProductCard {...mockProduct} />)

    const heartButton = screen.getByRole('button', { name: /🤍/ })

    fireEvent.click(heartButton)

    expect(screen.getByText('❤️')).toBeInTheDocument()

    fireEvent.click(screen.getByText('❤️'))
    expect(screen.getByText('🤍')).toBeInTheDocument()
  })

  test('toggles cart state', () => {
    render(<ProductCard {...mockProduct} />)

    const cartButton = screen.getByText('в корзину')

    fireEvent.click(cartButton)

    expect(screen.getByText('в корзине')).toBeInTheDocument()

    fireEvent.click(screen.getByText('в корзине'))
    expect(screen.getByText('в корзину')).toBeInTheDocument()
  })

  test('handles installment button click', () => {
    const consoleSpy = jest.spyOn(console, 'log')

    render(<ProductCard {...mockProduct}/>)

    const installmentButton = screen.getByText('рассрочка')

    fireEvent.click(installmentButton)

    expect(consoleSpy).toHaveBeenCalledWith('Рассрочка')
    consoleSpy.mockRestore()
  })

  test('handles info tabs click', () => {
    const consoleSpy = jest.spyOn(console, 'log')

    render(<ProductCard {...mockProduct}/>)

    const descriptionTab = screen.getByText('описание')
    const careTab = screen.getByText('уход')

    fireEvent.click(descriptionTab)
    expect(consoleSpy).toHaveBeenCalledWith('Показать описание')

    fireEvent.click(careTab)
    expect(consoleSpy).toHaveBeenCalledWith('Показать уход')

    consoleSpy.mockRestore()
  })

  test('handles image error', () => {
    render(<ProductCard {...mockProduct} />)

    const mainImage = screen.getByAltText('Фото платья') as HTMLImageElement

    fireEvent.error(mainImage)

    expect(mainImage.src).toContain('data:image/svg+xml;base64')
  })
  test('handles type images error', () => {
    render(<ProductCard {...mockProduct} />)

    const typeImages = screen.getAllByAltText(/Вариант/) as HTMLImageElement[]

    fireEvent.error(typeImages[0])

    expect(typeImages[0].src).toContain('data:image/svg+xml;base64')
  })

  test('applies textPosition class', () => {
    const { container } = render(<ProductCard {...mockProduct} textPosition="right" />)

    expect(container.firstChild).toHaveClass('text-right')
  })

  test('applies custom className', () => {
    const { container } = render(<ProductCard {...mockProduct} className="custom-class" />)

    expect(container.firstChild).toHaveClass('custom-class')
  })

  test('uses title as alt text when alt not provided', () => {
    render(<ProductCard {...mockProductWithoutOptional} />)

    expect(screen.getByAltText('Простое платье')).toBeInTheDocument()
  })
})