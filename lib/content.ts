export const siteConfig = {
  name: "P2P Merchant Support",
  title: "Відкриття P2P-мерчанта | Супровід Bybit, OKX, WEEX, MEXC, CryptoBot",
  description:
    "Готуємо акаунт, документи й заявку на P2P-мерчанта для Bybit, OKX, WEEX, MEXC та CryptoBot. Аудит, чеклист правок і супровід до рішення платформи.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
};

export const navItems = [
  { href: "#service", label: "Послуга" },
  { href: "#exchanges", label: "Біржі" },
  { href: "#audience", label: "Для кого" },
  { href: "#process", label: "Як це працює" },
  { href: "#pricing", label: "Ціни" },
  { href: "#testimonials", label: "Відгуки" },
  { href: "#faq", label: "FAQ" }
] as const;

export const trustBadges = [
  "Аудит акаунта",
  "Чеклист правок",
  "Супровід заявки",
  "Підтримка після рішення"
] as const;

export const benefits = [
  {
    title: "Аудит перед подачею",
    description: "Знаходимо слабкі місця профілю до заявки."
  },
  {
    title: "Чеклист правок",
    description:
      "Даємо конкретний список: що підготувати, виправити й перевірити."
  },
  {
    title: "Документи без хаосу",
    description: "Перевіряємо дані на повноту й відповідність вимогам платформи."
  },
  {
    title: "Супровід подачі",
    description: "Пояснюємо кроки й допомагаємо з комунікацією."
  },
  {
    title: "Старт після рішення",
    description: "Налаштування, ліміти, безпека та перші операційні кроки."
  }
] as const;

export const exchangeCards = [
  {
    name: "Bybit",
    description: "популярна платформа з активним P2P-ринком.",
    logoSrc: "/logos/bybit.svg",
    accentFrom: "#f7a600",
    accentTo: "#15182a"
  },
  {
    name: "OKX",
    description: "одна з найбільших бірж із розвиненою P2P-екосистемою.",
    logoSrc: "/logos/okx.svg",
    accentFrom: "#ffffff",
    accentTo: "#111827"
  },
  {
    name: "WEEX",
    description: "зручна платформа для швидкого старту в P2P.",
    logoSrc: "/logos/weex.png",
    accentFrom: "#f6c300",
    accentTo: "#111111"
  },
  {
    name: "MEXC",
    description: "біржа з гнучкими умовами для трейдерів і мерчантів.",
    logoSrc: "/logos/mexc.png",
    accentFrom: "#1972e2",
    accentTo: "#2cc8ff"
  },
  {
    name: "CryptoBot",
    description: "криптосервіс у Telegram із P2P-можливостями для зручного старту.",
    logoSrc: "/logos/cryptobot.jpg",
    accentFrom: "#29c7ff",
    accentTo: "#ffffff"
  }
] as const;

export const audienceItems = [
  {
    title: "Трейдерів",
    description: "Хочете мерчант-статус і не хочете вчитись на типових помилках."
  },
  {
    title: "Підприємців",
    description: "Запускаєте криптонапрям і потрібен зрозумілий шлях подачі."
  },
  {
    title: "Команд",
    description:
      "Потрібен порядок у документах, ролях і комунікації з платформою."
  },
  {
    title: "Новачків",
    description: "Не знаєте, з якої біржі почати і що підготувати."
  }
] as const;

export const processSteps = [
  "Залишаєте заявку.",
  "Оцінюємо акаунт і цільову біржу.",
  "Даємо чеклист правок і документів.",
  "Готуємо профіль та супроводжуємо подачу.",
  "Після рішення біржі даємо стартові рекомендації."
] as const;

export const pricingPlans = [
  {
    id: "OKX",
    name: "OKX",
    description: "Супровід підготовки профілю та заявки для P2P-напрямку OKX.",
    price: "400$",
    featured: false,
    features: [
      "Аудит OKX-профілю",
      "Чеклист правок",
      "Підготовка заявки",
      "Супровід до рішення"
    ]
  },
  {
    id: "Bybit",
    name: "Bybit",
    description: "Розширений супровід для подачі заявки на P2P-мерчанта Bybit.",
    price: "600$",
    featured: true,
    features: [
      "Глибокий аудит акаунта",
      "Підготовка профілю",
      "Супровід комунікації",
      "Післярішеневий чеклист"
    ]
  },
  {
    id: "MEXC / WEEX",
    name: "MEXC / WEEX",
    description: "Підготовка та супровід заявки для швидкого старту на MEXC або WEEX.",
    price: "150$",
    featured: false,
    features: [
      "Оцінка акаунта",
      "Перевірка даних",
      "Пояснення вимог",
      "Супровід заявки"
    ]
  },
  {
    id: "CryptoBot",
    name: "CryptoBot",
    description: "Консультація та супровід підготовки для P2P-можливостей CryptoBot.",
    price: "250$",
    featured: false,
    features: [
      "Оцінка вимог",
      "Підготовка профілю",
      "Перевірка даних",
      "План наступних кроків"
    ]
  }
] as const;

export const testimonials = [
  {
    name: "Трейдер",
    handle: "@p2p_start_ua",
    platform: "Bybit",
    tag: "аудит акаунта",
    quote:
      "До консультації не розумів, що саме заважає подачі. Отримав короткий чеклист правок і порядок дій без зайвих пояснень."
  },
  {
    name: "Команда",
    handle: "@crypto_ops_team",
    platform: "OKX",
    tag: "структура процесу",
    quote:
      "Найцінніше — розклали процес по кроках: профіль, документи, комунікація. Стало ясно, хто що готує і в якій послідовності."
  },
  {
    name: "Підприємець",
    handle: "@merchant_launch",
    platform: "MEXC / WEEX",
    tag: "підготовка даних",
    quote:
      "Допомогли прибрати хаос у документах і не подавати заявку навмання. Після аудиту було зрозуміло, що ще потрібно доробити."
  },
  {
    name: "Новачок",
    handle: "@first_p2p_case",
    platform: "CryptoBot",
    tag: "перший старт",
    quote:
      "Пояснили різницю між платформами й підказали, з чого почати. Без тиску, без обіцянок, просто конкретний план."
  },
  {
    name: "P2P-оператор",
    handle: "@desk_manager",
    platform: "Bybit",
    tag: "супровід заявки",
    quote:
      "Сподобалося, що не продавали магію. Перевірили профіль, показали ризикові місця і супроводили подачу по правилах платформи."
  }
] as const;

export const faqItems = [
  {
    question: "Чи гарантуєте ви відкриття P2P-мерчанта?",
    answer:
      "Ні. Рішення приймає біржа. Ми готуємо профіль, документи й заявку, щоб знизити ризик типових помилок."
  },
  {
    question: "З якими біржами ви працюєте?",
    answer: "Bybit, OKX, WEEX, MEXC та CryptoBot."
  },
  {
    question: "Чи допомагаєте ви з документами?",
    answer:
      "Так. Перевіряємо повноту даних і пояснюємо, що потрібно для подачі за правилами платформи."
  },
  {
    question: "Чи можна подати заявку новачку?",
    answer:
      "Так, якщо акаунт і дані можна підготувати під вимоги конкретної платформи."
  },
  {
    question: "Скільки часу займає процес?",
    answer:
      "Залежить від біржі, стану акаунта, документів і швидкості перевірки з боку платформи."
  },
  {
    question: "Чи є ви офіційним партнером бірж?",
    answer:
      "Ні, якщо окремо не зазначено інше. Ми є незалежним консультаційним сервісом."
  }
] as const;

export const exchangeOptions = [
  "Bybit",
  "OKX",
  "WEEX",
  "MEXC",
  "CryptoBot",
  "Не знаю / потрібна консультація"
] as const;

export const experienceOptions = [
  "Новачок",
  "Є досвід",
  "Активно працюю",
  "Команда/бізнес"
] as const;

export const planOptions = pricingPlans.map((plan) => plan.id) as [
  "OKX",
  "Bybit",
  "MEXC / WEEX",
  "CryptoBot"
];
