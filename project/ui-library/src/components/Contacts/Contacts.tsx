import React from 'react'
import './Contacts.css'

export interface ContactsProps {
  className?: string;
}

export const Contacts: React.FC<ContactsProps> = ({
  className = ''
}) => {
  return (
    <div className={`contacts-container ${className}`}>
      <div className="contacts-content">
        <h1>КОНТАКТНЫЕ ДАННЫЕ</h1>
        
        <div className="contacts-section">
          <h2>телефон</h2>
          <p>+7 (999) 123-45-67</p>
          <p>+7 (800) 555-35-35</p>
        </div>
        
        <div className="contacts-section">
          <h2>почта</h2>
          <p>voguepoint@brand.com</p>
          <p>info@voguepoint.com</p>
        </div>
        
        <div className="contacts-section">
          <h2>адрес</h2>
          <p>ул. Пушкина, д. 10</p>
          <p>Казань, Россия</p>
        </div>
      </div>
    </div>
  )
}