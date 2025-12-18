import React from 'react'
import './AboutLink.css'

export interface AboutLinkProps {
  aboutSectionId?: string
  className?: string
  children?: React.ReactNode
}

export const AboutLink: React.FC<AboutLinkProps> = ({
  aboutSectionId = 'about-section',
  className = '',
  children = 'About us'
}) => {
  const handleClick = () => {
    // Если мы уже на главной странице
    if (window.location.pathname === '/') {
      // Прокручиваем к секции
      const aboutSection = document.getElementById(aboutSectionId)
      
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Если не на главной - переходим на главную с якорем
      window.location.href = `/#${aboutSectionId}`
    }
  }
  
  return (
    <button 
      onClick={handleClick}
      className={`about-link ${className}`}
      aria-label="Перейти к разделу 'About us'"
    >
      {children}
    </button>
  )
}