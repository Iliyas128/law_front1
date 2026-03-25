# Law Assistant (law_front)

## Backend configuration (.env)

Vite client talks to `law_back` using variables from `.env` (copy `.env.example`).

### Example

`VITE_API_BASE_URL` должен указывать на ваш backend и включать префикс `/api`.

```bash
# e.g. for local dev
VITE_API_BASE_URL=http://localhost:8787/api
VITE_DEFAULT_LANG=ru
```

## Deploy

1. Поднимите `law_back` (он слушает на `PORT` в `.env` и по умолчанию это `8787`).
2. Задайте во фронтенде `VITE_API_BASE_URL` на реальный адрес backend.
3. Соберите фронт: `npm run build` и раздайте статику.
