import { createContext, useContext} from 'react'
import type { ReactNode } from 'react'

export interface BasketItem {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  quantity: number;
  size: string;
  article?: string;
}

interface BasketContextType {
  items: BasketItem[];
  addToBasket: (item: Omit<BasketItem, 'quantity' | 'size'>, size: string) => void;
  removeFromBasket: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  getTotalPrice: () => number;
  clearBasket: () => void;
}

export const BasketContext = createContext<BasketContextType | undefined>(undefined)

export interface BasketProviderProps {
  children: ReactNode;
}

export const useBasket = () => {
  const context = useContext(BasketContext)
  
  if (!context) {
    throw new Error('useBasket must be used within BasketProvider')
  }

  return context
}