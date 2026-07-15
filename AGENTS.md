# Инструкции для AI-агента

## Общая информация
Проект — одностраничное React-приложение, созданное с помощью `react-scripts`.

Стек:
- React 18
- React Router DOM 7
- styled-components
- react-scripts
- jsconfig с `baseUrl: "src"`, поэтому импорт из `src` работает через абсолютные пути, например `components/Header/Header`.

## Запуск и сборка
Используйте стандартные скрипты из `package.json`:
- `npm start` — локально
- `npm run build` — сборка
- `npm test` — тесты
- `npm run lint:js` — линтинг JS/JSX файлов в `src`

## Важные файлы и архитектура
- `src/App.jsx` — главный компонент приложения
- `src/components/Routes/Routes.jsx` — маршрутизация и `PrivateRoute`
- `src/components/Auth/Auth.jsx` — провайдер аутентификации и контекст
- `src/components/Layout/Layout.jsx` — общий макет страниц
- `src/components/Login/Login.jsx` — страница входа
- `src/components/ManufacturersList/ManufacturersList.jsx` — защищённый список производителей
- `src/components/CheckList/Checlist.jsx` — защищённый чек-лист

## Особенности и принципы
- Роуты защищаются через `PrivateRoute`, который использует `AuthContext`.
- Логика маршрутизатора учитывает `basename` для путей с `/test`.
- Стили оформлены отдельными файлами `*.styled.js` рядом с компонентами.
- Основной стиль форматирования задаётся в `.prettierrc.json`.

## Рекомендации для изменений
- Не меняйте `baseUrl` в `jsconfig.json` без необходимости, иначе могут сломаться абсолютные импорты.
- Для новых компонентов следуйте текущей структуре: компонент + стили рядом.
- Проверяйте страницу `/login`, если добавляете новые защищённые маршруты.

## Что здесь не описано
В репозитории нет отдельной документации, README пустой, поэтому всё важное состояние найдено в коде.
