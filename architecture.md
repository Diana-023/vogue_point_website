# Архитектура проекта
## Обзор
Система состоит из трех независимых проектов в монорепозитории:
### frontend - клиентское SPA интернет-магазина
```
vogue_point/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
|   |   ├── react.svg
│   │   ├── 1.0.jpg
│   │   ├── 2.0.jpg
│   │   └── 2.1.jpg
│   ├── components/     
│   ├── pages/         
│   │   ├── Home/
│   │   ├── Catalog/
│   │   ├── Product/
│   │   └── Cart/
│   ├── App.css  
│   ├── App.test.tsx
│   ├── App.tsx  
│   ├── index.css        
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── jest.config.ts
├── package.json
├── vite.config.js
├── tsconfig.node.json
├── tsconfig.ts
└── tsconfig.json
```
### admin-panel - административная панель
```
admin-panel/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/     
│   ├── pages/         
│   │   ├── Login/
│   │   ├── Dashboard/
│   │   ├── ProductsManagement/
│   │   ├── OrdersManagement/
│   │   └── Inventory/
│   ├── App.css  
│   ├── App.test.tsx
│   ├── App.tsx  
│   ├── index.css        
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── jest.config.ts
├── package.json
├── vite.config.js
├── tsconfig.node.json
├── tsconfig.ts
└── tsconfig.json
```
### ui-library - библиотека UI-компонентов
```
ui-library/
├── src/
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── Card.module.css
│   │   └── Card.test.tsx
│   ├── ProductCard/
│   │   ├── ProductCard.tsx
│   │   ├── ProductCard.module.css
│   │   └── ProductCard.test.tsx
│   ├── Basket/
│   │   ├── Basket.tsx
│   │   ├── Basket.module.css
│   │   └── Basket.test.tsx
│   └── index.ts      
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
- Home - Главная страница
- Input - Авторизация/регистрация
- Card - Каталог товаров
- Basket - Корзина товаров
- ProductCard - Карточка товара
- Order - Оформление заказа

## Структура роутинга приложений
### Клиентское приложение
```
Главная страница
├── Каталог товаров
│   ├── Категория 1
│   ├── Категория 2
│   └── ...
├── Карточка товара
└── Корзина покупок
```
### Административная панель
```
Страница входа
├── Дашборд
├── Управление товарами
│   ├── Добавление товара
│   ├── Редактирование товара
│   └── Управление складом
├── Управление заказами
└── Аналитика продаж
```