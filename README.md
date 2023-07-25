# Проект "Асинхронная обработка HTTP запросов с Node.js и RabbitMQ"

Привет! Это проект для решения тестового задания на должность "Разработчик NodeJS".

## Требования

- Node.js (установите с официального сайта: https://nodejs.org/)
- RabbitMQ (установите с официального сайта: https://www.rabbitmq.com/)

## Установка

1. Клонируйте репозиторий:

```bash
git clone https://github.com/your-username/async-http-processing.git
```

2. Перейдите в папку проекта:

```bash
cd async-http-processing
```

3. Установите зависимости:

```bash
npm install
```

4. Запустите микросервис М1 для обработки HTTP запросов:

```bash
node index.js
```

5. Запустите микросервис М2 для обработки заданий из RabbitMQ:

```bash
node worker.js
```

Готово! Теперь проект запущен и готов обрабатывать HTTP запросы асинхронно.

## Использование

Отправьте POST запрос на адрес http://localhost:3000/process с JSON данными, которые нужно обработать. Пример данных:

```json
{
  "message": "Привет, мир!"
}
```

Production API - https://async-http-processor.onrender.com/
