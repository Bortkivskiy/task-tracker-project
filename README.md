# Task Tracker App

## 📌 Опис

Цей додаток дозволяє створювати, редагувати, видаляти і переглядати задачі. Розгорнуто як Netlify Functions + MongoDB Atlas.

## ⚙️ Запуск локально

1. Клонувати проєкт
2. Створити `.env` на основі `.env.example`
3. Встановити залежності:
```
npm install
```
4. Запустити:
```
netlify dev
```

## 🌐 API

- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`