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
        <h1>CONTACTS</h1>
        
        <div className="contacts-section">
          <h2>telephone</h2>
          <p>+7 (999) 123-45-67</p>
          <p>+7 (800) 555-35-35</p>
        </div>
        
        <div className="contacts-section">
          <h2>post</h2>
          <p>voguepoint@brand.com</p>
          <p>info@voguepoint.com</p>
        </div>
        
        <div className="contacts-section">
          <h2>address</h2>
          <p>15 East 57th Street</p>
          <p>New York, NY 10022, USA</p>
        </div>
      </div>
    </div>
  )
}