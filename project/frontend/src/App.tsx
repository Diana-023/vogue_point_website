import { AboutLink } from '@my-app/ui-library'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { BasketProvider } from './contexts/BasketProvider'
import Basket from './pages/Basket/Basket'
import CardPage from './pages/Card/CardPage'
import Contacts from './pages/Contacts/Contacts'
import Home from './pages/Home/Home'
import InputPage from './pages/Input/InputPage'
import MediumCardPage from './pages/MediumCardPage/MediumCardPage'
import ProductCardPage from './pages/ProductCardPage/ProductCardPage'

import './App.css'
import '@my-app/ui-library/style.css'

function App() {
  return (
    <BasketProvider>
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/">VoguePoint</Link></li>
            <li><AboutLink /></li>
            <li><Link to="/input">Log in</Link></li>
            <li><Link to="/basket">Bag</Link></li>
            <li><Link to="/contacts">Contacts</Link></li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/product/:id" element={<InputPage />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="/catalog" element={<MediumCardPage />} />
          <Route path="/product-detail/:id" element={<ProductCardPage />} />
          <Route path="/product-detail" element={<ProductCardPage />} />
        </Routes>
      </BrowserRouter>
    </BasketProvider>
  )
}

export default App