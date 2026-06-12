# P2P Merchant Support Landing

Односторінковий український landing page для заявки на консультаційний супровід відкриття P2P-мерчанта на Bybit, OKX, WEEX, MEXC та CryptoBot.

## Стек

- Next.js 16.2.7 App Router, TypeScript, React 19
- Tailwind CSS 3.4, Framer Motion, Lucide React
- Next.js API route для заявок
- Zod validation, honeypot, rate limiting, sanitization
- CRM webhook/API, Telegram notification, email via SMTP або Resend
- GA4, Meta Pixel, TikTok Pixel, UTM capture

## Routes

- `/` — landing page
- `/api/lead` — API route прийому заявки
- `/privacy` — політика конфіденційності
- `/terms` — умови використання
- `/disclaimer` — юридичний disclaimer
- `/robots.txt`
- `/sitemap.xml`

## Локальний запуск

```bash
npm install
cp .env.example .env.local
npm run dev
```

Сайт буде доступний на `http://localhost:3000`.

Корисні перевірки:

```bash
npm run typecheck
npm run lint
npm run build
```

## Env-змінні

```bash
NEXT_PUBLIC_SITE_URL=https://example.com

CRM_WEBHOOK_URL=
CRM_API_KEY=

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

EMAIL_FROM=
EMAIL_TO=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
RESEND_API_KEY=

NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
```

## CRM webhook

Вкажіть `CRM_WEBHOOK_URL` у `.env.local` або в environment variables на Vercel/VPS. Якщо CRM потребує bearer token, додайте `CRM_API_KEY`.

Payload заявки:

```json
{
  "name": "Ім'я",
  "contact": "@telegram або телефон",
  "email": "optional@example.com",
  "exchange": "Bybit",
  "experience": "Новачок",
  "selectedPlan": "OKX",
  "message": "Коментар",
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "campaign",
  "utmContent": "creative",
  "utmTerm": "keyword",
  "referrer": "https://...",
  "pageUrl": "https://...",
  "createdAt": "ISO date",
  "consent": true
}
```

Якщо CRM webhook тимчасово недоступний, користувач усе одно бачить нормальний success message, а повні дані заявки відправляються адміністратору через Telegram/email, якщо ці канали налаштовані.

## Telegram та email

Telegram:

1. Створіть бота через BotFather.
2. Додайте `TELEGRAM_BOT_TOKEN`.
3. Додайте `TELEGRAM_CHAT_ID` для чату або групи.

Email через SMTP:

1. Заповніть `EMAIL_FROM`, `EMAIL_TO`, `SMTP_HOST`, `SMTP_PORT`.
2. Якщо SMTP потребує авторизації, додайте `SMTP_USER` і `SMTP_PASSWORD`.

Email через Resend:

1. Заповніть `EMAIL_FROM`, `EMAIL_TO`.
2. Додайте `RESEND_API_KEY`.

Якщо одночасно задані Resend і SMTP, буде використано Resend.

## Аналітика й реклама

Підключення через env:

- `NEXT_PUBLIC_GA_ID` — Google Analytics 4
- `NEXT_PUBLIC_META_PIXEL_ID` — Meta Pixel
- `NEXT_PUBLIC_TIKTOK_PIXEL_ID` — TikTok Pixel, опціонально

Події:

- `view_hero`
- `click_cta`
- `open_form`
- `submit_lead`
- `lead_success`
- `tariff_click`

UTM-мітки з URL зберігаються в `localStorage` і передаються разом із заявкою.

## Контент і ціни

Основний контент, біржі, FAQ і ціни по біржах винесені в `lib/content.ts`.

Перед production замініть:

- `NEXT_PUBLIC_SITE_URL`
- реальний `CRM_WEBHOOK_URL`
- Telegram/email credentials
- GA/Meta/TikTok IDs
- ціни по біржах у `pricingPlans`
- юридичні контактні дані, якщо потрібні у політиці
- `public/og-image.svg`, якщо потрібен брендований OG-банер

## Deployment

### Vercel

1. Імпортуйте репозиторій у Vercel.
2. Додайте env-змінні з `.env.example`.
3. Build command: `npm run build`.
4. Output: Next.js default.

### VPS

```bash
npm install
npm run build
npm run start
```

Перед VPS-запуском налаштуйте reverse proxy, HTTPS і production env.

## Security notes

- Усі дані валідовуються на сервері через Zod.
- Honeypot поле відсікає простих ботів.
- Rate limit: 5 заявок на 10 хвилин з одного IP.
- Inputs очищуються від control chars і HTML brackets.
- Секрети не зберігаються в коді.
- API не показує користувачу технічні помилки CRM.
- Логи не містять payload заявки; у dev/prod логуються тільки статуси інтеграцій.

## Audit note

`npm audit` для стабільного `next@16.2.7` показує 2 moderate warnings через `postcss@8.4.31`, який Next пінить транзитивно. `npm audit fix --force` пропонує перехід на `next@16.3.0-preview.0`, тому для production тут залишено стабільний Next 16.2.7. Після виходу наступного стабільного Next потрібно оновити Next і повторити `npm audit`.

## Юридичний статус

Сервіс є незалежним консультаційним сервісом. Він не є офіційним представником Bybit, OKX, WEEX, MEXC або CryptoBot, не надає фінансових, інвестиційних або юридичних порад, не гарантує схвалення заявки та не допомагає обходити правила платформ, KYC/AML або вимоги законодавства.
