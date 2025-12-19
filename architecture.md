# Архитектура проекта
## Обзор
Система состоит из трех независимых проектов в монорепозитории:
### frontend - клиентское SPA интернет-магазина
```
project/frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg  
│   ├── pages/         
│   │   ├── Basket/
│   │   ├── Card/
│   │   ├── Contacts/
│   │   ├── Home/
│   │   ├── Input/
│   │   ├── MediumCardPage/
│   │   └── ProductCardPage/
│   ├── App.css  
│   ├── App.test.tsx
│   ├── App.tsx  
│   ├── index.css     
│   ├── main.tsx     
│   └── setupTests.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── jest.config.ts
├── package.json
├── vite.config.js
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.ts
└── tsconfig.json
```

### ui-library - библиотека UI-компонентов
```
project/ui-library/
├── src/
│   ├── components/
│   │   ├── AboutLink/
│   │   ├── Basket/
│   │   ├── Card/
│   │   ├── Contacts/
│   │   ├── Input/
│   │   ├── MediumCard/
│   │   └── AboutLink/
│   ├── index.ts
│   └── setupTests.ts     
├── package.json
├── .gitignore
├── eslint.config.js
├── jest.config.js
├── vite.config.js
└── tsconfig.json
```

## Технологический стек
### Runtime зависимости
- react ^19.2.0 - UI библиотека
- react-dom ^19.2.0 - Рендеринг React
- react-router-dom ^6.0.0 - Маршрутизация
- @my-app/ui-library * - Локальные UI-компоненты

#### Dev зависимости
- typescript ~5.9.3 - Статическая типизация
- vite ^7.1.11 - Сборщик и dev-сервер
- eslint ^9.36.0 - Линтинг кода
- jest ^30.2.0 - Тестирование

## Компоненты
- AboutLink - Кнопка "О нас"
- Basket - Корзина покупок
- Card - Категория товаров
- Contacts - Контактная информация
- Input - Форма авторизации
- MediumCardPage - Каталог (карточки товаров)
- ProductCardPage - Карточка товара

## Структура роутинга приложений
### Клиентское приложение
```
Главная страница
├── О нас
├── Категории товаров
│   ├── Каталог 1
│   │   └── Карточка товара
│   ├── Каталог 2
│   │   └── Карточка товара
│   ├── Каталог 3
│   │   └── Карточка товара
│   └── Каталог 4
│   │   └── Карточка товара
├── Авторизация/Вход
├── Корзина покупок
└── Контактная информация
```