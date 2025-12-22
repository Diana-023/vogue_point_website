export interface Product {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  category: string;
  description?: string;
  typeImages?: string[];
  textPosition?: 'left' | 'right';
}

import пл from '../assets/1.0.jpg'
import пл1 from '../assets/2.0.jpg'
import пл2 from '../assets/2.1.jpg'
import д9 from '../assets/9.jpg'
import д91 from '../assets/91.jpg'
import д92 from '../assets/92.jpg'
import бабочки from '../assets/бабочки.jpg'
import бабочки1 from '../assets/бабочки1.jpg'
import бабочки2 from '../assets/бабочки2.jpg'
import босоножки from '../assets/босоножки.jpg'
import д from '../assets/д.jpg'
import д1 from '../assets/д1.jpg'
import д2 from '../assets/д2.jpg'
import к from '../assets/к.jpg'
import к1 from '../assets/к1.jpg'
import кабл from '../assets/кабл.jpg'
import кабл1 from '../assets/кабл1.jpg'
import корс from '../assets/корс.jpg'
import корс1 from '../assets/корс1.jpg'
import неж from '../assets/неж.jpg'
import неж1 from '../assets/неж1.jpg'
import неж2 from '../assets/неж2.jpg'
import один from '../assets/один.jpg'
import платьевечер3 from '../assets/п.jpg'
import платьевечер1 from '../assets/п1.jpg'
import платьевечер2 from '../assets/п2.jpg'
import платьевечер from '../assets/п3.jpg'
import пла from '../assets/пла.jpg'
import пла1 from '../assets/пла1.jpg'
import пла2 from '../assets/пла2.jpg'
import платье1 from '../assets/платье1.jpg'
import платье from '../assets/платье2.jpg'
import платье2 from '../assets/платье21.jpg'
import т from '../assets/т.jpg'
import т1 from '../assets/т1.jpg'
import т2 from '../assets/т2.jpg'
import т3 from '../assets/т3.jpg'
import юбка from '../assets/юбка.jpg'
import юбка1 from '../assets/юбка1.jpg'

export const allProducts: Product[] = [
  {
    id: 1,
    imageUrl: платье,
    title: '"Midnight Velvet"',
    price: '26 999 ₽',
    category: 'платья',
    description: 'Глубокое бархатное платье для роскошных вечеров. Таинственный синий переливается при свете свечей.',
    typeImages: [
      платье1,
      платье2
    ],
    textPosition: 'left' as const
  },
  {
    id: 2,
    imageUrl: платьевечер,
    title: 'Executive Aurora',
    price: '24 500 ₽',
    category: 'платья',
    description: 'Современный кремовый костюм для уверенных побед. Идеальные линии и благородный оттенок создают образ лидера.',
    typeImages: [
      платьевечер1,
      платьевечер2,
      платьевечер3
    ],
    textPosition: 'left' as const
  },
  {
    id: 3,
    imageUrl: пл,
    title: 'Luna Pastel',
    price: '29 900 ₽',
    category: 'платья',
    description: 'Блузка из натурального шелка',
    typeImages: [
      пл1,
      пл2
    ],
    textPosition: 'left' as const
  },
  {
    id: 4,
    imageUrl: пла,
    title: 'Neon Rhapsody',
    price: '27 599 ₽',
    category: 'платья',
    description: 'Дерзкое платье для смелых городских ночей. Электрический розовый и черный создают контрастный энергичный образ.',
    typeImages: [
      пла1,
      пла2
    ],
    textPosition: 'left' as const
  },
  {
    id: 5,
    imageUrl: д9,
    title: 'Light Matter',
    price: '37 899 ₽',
    category: 'платья',
    description: 'Воздушное платье из светлых полупрозрачных тканей. Эфемерный силуэт, будто сотканный из солнечного света и облаков.',
    typeImages: [
      д91,
      д92
    ],
    textPosition: 'left' as const
  },
  {
    id: 6,
    imageUrl: неж,
    title: 'Desert Bloom',
    price: '29 299 ₽',
    category: 'платья',
    description: 'Плавное платье в теплых тонах. Текстура ткани напоминает барханы и мягкие песчаные волны.',
    typeImages: [
      неж1,
      неж2
    ],
    textPosition: 'left' as const
  },
  {
    id: 7,
    imageUrl: к,
    title: 'Celestial Ribs',
    price: '31 999 ₽',
    category: 'верх',
    description: 'Корсет с астрономическим принтом на бархате. Кажется, будто на тебе застегнуто целое созвездие.',
    typeImages: [
      к1
    ],
    textPosition: 'left' as const
  },
  {
    id: 8,
    imageUrl: т,
    title: 'Liquid Metal',
    price: '18 499 ₽',
    category: 'верх',
    description: 'Корсет из переливающейся металлической ткани. Мерцает, как ртуть при свете софитов.',
    typeImages: [
      т1,
      т2,
      т3,
    ],
    textPosition: 'left' as const
  },
  {
    id: 9,
    imageUrl: корс,
    title: 'Coral Reef',
    price: '25 299 ₽',
    category: 'верх',
    description: 'Корсет из текстурированного шелка цвета морской волны. Складки ткани напоминают волны и кораллы.',
    typeImages: [
      корс1
    ],
    textPosition: 'left' as const
  },
  {
    id: 10,
    imageUrl: один,
    title: 'Cloud Embrace',
    price: '24 999 ₽',
    category: 'верх',
    description: 'Корсет из слоистого тюля и дымчатого шифона. Воздушные слои создают иллюзию тумана вокруг силуэта.',
    textPosition: 'left' as const
  },
  {
    id: 11,
    imageUrl: бабочки,
    title: 'Moon Dust Mules',
    price: '36 499 ₽',
    category: 'обувь',
    description: 'Мюли с мерцающей поверхностью, как лунная поверхность. Следы из звездной пыли.',
    typeImages: [
      бабочки1,
      бабочки2
    ],
    textPosition: 'left' as const
  },
  {
    id: 12,
    imageUrl: д,
    title: 'Crystal Rain',
    price: '25 299 ₽',
    category: 'обувь',
    description: 'Туфли с подвесками из свисающего хрусталя. Звук шагов — как перезвон капель.',
    typeImages: [
      д1,
      д2
    ],
    textPosition: 'left' as const
  },
  {
    id: 13,
    imageUrl: босоножки,
    title: 'Butterfly Ballet',
    price: '19 499 ₽',
    category: 'обувь',
    description: 'Каждый шаг — как взмах крыльев, а мерцающие кристаллы ловят свет, создавая иллюзию живого полета.',
    textPosition: 'left' as const
  },
  {
    id: 14,
    imageUrl: кабл,
    title: 'Ruby Passage',
    price: '45 299 ₽',
    category: 'обувь',
    description: 'Туфли цвета спелого граната с изящным переплетением ремешков на щиколотке. ',
    typeImages: [
      кабл1
    ],
    textPosition: 'left' as const
  },
  {
    id: 15,
    imageUrl: юбка,
    title: 'Lacquer Flame',
    price: '18 299 ₽',
    category: 'низ',
    description: 'Короткая юбка-трапеция из лакированной кожи с молнией сбоку. Яркий, почти зеркальный блеск, который притягивает взгляды.',
    typeImages: [
      юбка1
    ],
    textPosition: 'left' as const
  },
]