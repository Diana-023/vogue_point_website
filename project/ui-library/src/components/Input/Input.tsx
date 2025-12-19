import React, { useState } from 'react'
import './Input.css'

export interface InputProps {
  onSubmit?: (formData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    subscribe: boolean;
  }) => void;
  className?: string;
  title?: string;
}

export const Input: React.FC<InputProps> = ({ 
  onSubmit,
  className = '',
  title = 'Я ХОЧУ ПОЛУЧАТЬ ИНФОРМАЦИЮ О НОВИНКАХ И ЭКСКЛЮЗИВНЫХ ПРЕДЛОЖЕНИЯХ!'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    subscribe: true
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Данные формы:', formData)
    
    if (onSubmit) {
      onSubmit(formData)
    }
    
    // Можно оставить alert или убрать его
    alert('Данные отправлены!')
  }

  return (
    <div className={`input-container ${className}`}>
      <div className="input-wrapper">
        {/* Заголовок */}
        <div className="input-header">
          <h1 className="input-title">{title}</h1>
        </div>

        {/* Форма */}
        <form className="input" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Введите ваше имя"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="example@mail.ru"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="+7 (999) 999-99-99"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Введите пароль"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label htmlFor="subscribe" className="checkbox-label">
              Я согласна на обработку персональных данных
            </label>
          </div>

          <button type="submit" className="submit-btn">
            ОТПРАВИТЬ
          </button>
        </form>
      </div>
    </div>
  )
}