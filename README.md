# Avito Ads — Frontend

Веб-приложение для управления объявлениями: просмотр списка, детали, редактирование с
AI-подсказками (генерация описания, оценка рыночной цены).

### Требования

- **Node.js** ≥ 18
- **npm** ≥ 9
- **Backend API** запущен на `http://localhost:8080`
- **Ollama** (для AI-функций)

### Быстрый старт

Проект состоит из двух частей: backend и frontend.
Сначала нужно запустить backend, затем frontend.

1. Запуск backend
```bash
# 1. Перейдите в папку backend:
cd backend

# 2. Установите зависимости:
npm install

# 3. Создайте .env на основе примера:
cp .env.example .env

# 4. Запустите сервер:
npm start
```

Backend будет доступен по адресу:
(`http://localhost:8080`).

2. Запуск frontend
```bash
# 1. Откройте второй терминал и перейдите в папку frontend:
cd frontend

# 2. Установите зависимости:
npm install

# 3. Создайте .env на основе примера:
cp .env.example .env

# 4. Запустите frontend:
npm run dev
```

Frontend будет доступен по адресу, который покажет Vite в терминале
(`http://localhost:3000`).


## Настройка LLM (AI-функции)

AI-функции на странице редактирования (кнопки «Узнать рыночную цену» и «Придумать/Улучшить
описание») работают через 2 режима **ollama** или **gigachat**.
Выбор режима задаётся через переменную: VITE_LLM_PROVIDER

### Как работают режимы

Режим ollama
Frontend сам отправляет запросы напрямую в Ollama.

### Установка Ollama

Установите [Ollama](https://ollama.com/)

```bash
# Загрузите модель
ollama pull llama3

# Запустить сервер (работает на localhost:11434)
ollama serve
```

Ollama будет доступна по адресу:
(`http://localhost:11434`).

## Режим `gigachat`

Frontend не ходит напрямую в GigaChat.

В этом режиме:

- frontend формирует `prompt`
- frontend отправляет `prompt` в backend
- backend отправляет запрос в GigaChat
- backend возвращает текстовый ответ
- frontend показывает результат в UI

## Важно про GigaChat

В текущей реализации backend не хранит `access_token` в `.env` и не требует его ручного обновления.

Для авторизации используется `GIGACHAT_AUTH_KEY`, который хранится в `backend/.env`.
На его основе backend автоматически получает `access_token` через OAuth API GigaChat, кэширует его в памяти и обновляет при истечении срока действия.

Если AI-запросы через `gigachat` начинают падать с ошибкой авторизации, нужно проверить:

1. что в `backend/.env` задан корректный `GIGACHAT_AUTH_KEY`
2. что backend имеет доступ к GigaChat OAuth/API endpoint
3. что backend был перезапущен после изменения `.env`

Ручное обновление `access_token` не требуется.


### Переменные окружения Frontend
Файл frontend/.env

```env
VITE_API_URL=http://localhost:8080      # Backend API
VITE_OLLAMA_URL=http://localhost:11434  # Ollama
VITE_LLM_PROVIDER=gigachat              # Llm Provider
```


### Переменные окружения Backend
Файл Backend/.env

```env
GIGACHAT_AUTH_KEY=very_secret_key                                    # GigaChat Authorization key
GIGACHAT_MODEL=GigaChat-2                                            # GigaChat Model
```


## Запуск через Docker Compose

Приложение можно запустить локально через `docker compose`.

В этом режиме запускаются два сервиса

- `backend`
- `frontend`

### Что нужно для запуска

Убедитесь, что у вас:

- установлен **Docker Desktop**
- запущен **Docker daemon**
- создан файл `backend/.env`

### Структура проекта

В корне проекта должен лежать файл:

```text
docker-compose.yml
```
Также должны быть:
```text
backend/Dockerfile
frontend/Dockerfile
frontend/nginx.conf
Переменные окружения Backend
```
# Запуск проекта

## 1. Создайте файл `backend/.env`

Перед запуском создайте файл `backend/.env` со следующим содержимым:

```env
GIGACHAT_AUTH_KEY=very_secret_key
GIGACHAT_MODEL=GigaChat-2
```

## Переменные сборки frontend

Для `frontend` значения `VITE_*` передаются через `build.args` в `docker-compose.yml`.

Пример:

```yaml
frontend:
  build:
    context: ./frontend
    args:
      VITE_API_URL: http://localhost:8080
      VITE_OLLAMA_URL: http://localhost:11434
      VITE_LLM_PROVIDER: ollama
```

Эти переменные используются на этапе сборки frontend-приложения через Vite.

Если вы изменили значения `build.args`, frontend нужно пересобрать:

```bash
docker compose down
docker compose up --build
```

## 2. Запуск

Из корня проекта выполните:

```bash
docker compose up --build
```
## Запуск в фоне

```bash
docker compose up --build -d
```
## Остановка

```bash
docker compose down
```
## После запуска приложение будет доступно по адресам

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8080

## Как это работает

- `backend` запускается в контейнере Node.js на порту `8080`
- `frontend` собирается через Vite и раздаётся через Nginx на порту `3000`
- переменные `VITE_*` для `frontend` передаются через `build.args` в `docker-compose.yml`
- `backend` читает переменные окружения из `backend/.env`
- 
## Важно

- Для режима `gigachat` нужен валидный `GIGACHAT_AUTH_KEY`
- Backend автоматически получает и обновляет `access_token` через OAuth API GigaChat
- Ручное обновление `access_token` не требуется
- После изменения переменных в `backend/.env` нужно перезапустить backend
- Поскольку GigaChat является внешним сервисом, при rate limit или сетевых сбоях AI-запросы могут временно завершаться ошибкой

```bash
docker compose down
docker compose up --build
```


### Скрипты

| Команда              | Описание                     |
| -------------------- | ---------------------------- |
| `npm run dev`        | Dev-сервер (Vite)            |
| `npm run build`      | Продакшн-сборка (tsc + Vite) |
| `npm run preview`    | Просмотр собранной версии    |
| `npm run lint`       | Проверка ESLint              |
| `npm run lint:fix`   | Автоисправление ESLint       |
| `npm run format`     | Проверка Prettier            |
| `npm run format:fix` | Автоисправление Prettier     |
| `npm run typecheck`  | Проверка типов TypeScript    |

## Безопасность

- `GIGACHAT_AUTH_KEY` хранится только на backend
- frontend не знает токен и не обращается в GigaChat напрямую
- в режиме `gigachat` браузер общается только с backend API
- в режиме `ollama` frontend работает напрямую с локальным Ollama без токенов

## Архитектура

### Feature-Sliced Design (FSD)

Проект следует архитектуре [Feature-Sliced Design](https://feature-sliced.design/):

```
src/
├── app/           — инициализация, провайдеры, роутинг, глобальные стили
├── pages/         — страницы (AdsListPage, AdDetailsPage, AdEditPage)
├── widgets/       — крупные UI-блоки (AdvertisementsToolbar, PageHeader)
├── features/      — пользовательские действия и бизнес-сценарии
│   ├── AdvertisementEditForm/   — форма редактирования
│   ├── AiPriceSuggestion/       — AI: оценка рыночной цены
│   ├── AiDescriptionSuggestion/ — AI: генерация/улучшение описания
│   ├── AdvertisementFilters/    — фильтры списка
│   ├── AdvertisementSort/       — сортировка
│   ├── AdvertisementSearch/     — поиск
│   └── ...
├── entities/      — бизнес-сущности (Advertisement: типы, API, UI карточек)
└── shared/        — UI-кит, утилиты, API-клиенты, конфигурация
```

Импорты строго сверху вниз: `pages → widgets → features → entities → shared`.

### Стек технологий

| Область             | Технология                                 |
| ------------------- |--------------------------------------------|
| UI-фреймворк        | React 19                                   |
| Сборка              | Vite 7                                     |
| Типизация           | TypeScript 5.9                             |
| Стилизация          | Tailwind CSS 4, CVA, clsx + tailwind-merge |
| Формы               | React Hook Form 7 + Zod 4 (zodResolver)    |
| Серверное состояние | TanStack Query 5 (useQuery, useMutation)   |
| Роутинг             | React Router 7                             |
| UI-примитивы        | ShadCn                                     |
| Уведомления         | react-hot-toast                            |
| AI-интеграция       | Ollama REST API (localhost)                |
| Линтинг             | ESLint 9, Prettier, Husky + lint-staged    |

### Шаги интеграции

1. Создать `shared/api/openaiApi.ts` с функцией `generateOpenAIResponse`
2. Создать `shared/api/llmApi.ts` — фасад-переключатель
3. Заменить импорт `generateOllamaResponse` → `generateLlmResponse` в двух фичах
4. Добавить переменные в `.env.example`
5. Обновить README

Фичи (`AiPriceSuggestion`, `AiDescriptionSuggestion`) и промпты **не меняются** — они
работают с абстракцией `generateLlmResponse(prompt)`.
