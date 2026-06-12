export const siteConfig = {
  name: "P2P Merchant Support",
  title: "Відкриття P2P-мерчанта | Супровід Bybit, OKX, WEEX, MEXC, CryptoBot",
  description:
    "Допомагаємо пройти процес відкриття P2P-мерчанта на Bybit, OKX, WEEX, MEXC та CryptoBot: аналіз акаунта, підготовка документів, супровід заявки та підтримка після відкриття.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
};

export const navItems = [
  { href: "#service", label: "Послуга" },
  { href: "#exchanges", label: "Біржі" },
  { href: "#audience", label: "Для кого" },
  { href: "#process", label: "Як це працює" },
  { href: "#pricing", label: "Ціни" },
  { href: "#faq", label: "FAQ" }
] as const;

export const trustBadges = [
  "Без зайвої бюрократії",
  "Підготовка профілю",
  "Супровід заявки",
  "Підтримка після відкриття"
] as const;

export const benefits = [
  {
    title: "Аналіз акаунта",
    description: "Перевіряємо готовність вашого профілю до подачі заявки."
  },
  {
    title: "Покроковий супровід",
    description:
      "Пояснюємо вимоги біржі та допомагаємо уникнути типових помилок."
  },
  {
    title: "Підготовка документів",
    description: "Допомагаємо з оформленням і перевіркою необхідних даних."
  },
  {
    title: "Подача заявки",
    description: "Супроводжуємо процес подачі та комунікації з біржею."
  },
  {
    title: "Підтримка після відкриття",
    description: "Даємо рекомендації щодо налаштувань, лімітів і безпеки."
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
    description: "Для тих, хто хоче працювати через P2P і правильно підготувати акаунт."
  },
  {
    title: "Підприємців",
    description: "Для запуску власного криптосервісу з прозорим процесом подачі."
  },
  {
    title: "Команд",
    description:
      "Для операцій з криптовалютою, де важлива стабільність, порядок і безпека."
  },
  {
    title: "Новачків",
    description: "Для тих, хто хоче пройти процес без типових помилок і втрати часу."
  }
] as const;

export const processSteps = [
  "Ви залишаєте заявку на сайті.",
  "Ми зв'язуємося та уточнюємо деталі.",
  "Проводимо перевірку акаунта та документів.",
  "Супроводжуємо подачу заявки на біржу.",
  "Після схвалення біржею ви отримуєте статус P2P-мерчанта та рекомендації для старту."
] as const;

export const pricingPlans = [
  {
    id: "OKX",
    name: "OKX",
    description: "Супровід підготовки профілю та заявки для P2P-напрямку OKX.",
    price: "400$",
    featured: false,
    features: [
      "Аудит готовності акаунта OKX",
      "Перевірка вимог платформи",
      "Підготовка профілю та даних",
      "Супровід подачі заявки"
    ]
  },
  {
    id: "Bybit",
    name: "Bybit",
    description: "Розширений супровід для подачі заявки на P2P-мерчанта Bybit.",
    price: "600$",
    featured: true,
    features: [
      "Аналіз акаунта та документів",
      "Підготовка профілю до подачі",
      "Супровід комунікації з біржею",
      "Рекомендації після фінального рішення"
    ]
  },
  {
    id: "MEXC / WEEX",
    name: "MEXC / WEEX",
    description: "Підготовка та супровід заявки для швидкого старту на MEXC або WEEX.",
    price: "150$",
    featured: false,
    features: [
      "Оцінка акаунта під MEXC або WEEX",
      "Перевірка документів і даних",
      "Пояснення вимог платформи",
      "Супровід заявки до фінального рішення"
    ]
  },
  {
    id: "CryptoBot",
    name: "CryptoBot",
    description: "Консультація та супровід підготовки для P2P-можливостей CryptoBot.",
    price: "250$",
    featured: false,
    features: [
      "Оцінка стартових вимог",
      "Підготовка профілю",
      "Перевірка даних перед подачею",
      "Пояснення процесу та наступних кроків"
    ]
  }
] as const;

export const faqItems = [
  {
    question: "Чи гарантуєте ви відкриття P2P-мерчанта?",
    answer:
      "Ні, фінальне рішення приймає біржа. Ми допомагаємо підготувати профіль, документи та пройти процес без типових помилок."
  },
  {
    question: "З якими біржами ви працюєте?",
    answer: "Bybit, OKX, WEEX, MEXC та CryptoBot."
  },
  {
    question: "Чи допомагаєте ви з документами?",
    answer:
      "Так, ми перевіряємо правильність підготовки даних і пояснюємо, що потрібно для подачі заявки відповідно до правил платформи."
  },
  {
    question: "Чи можна подати заявку новачку?",
    answer:
      "Так, але вимоги залежать від конкретної біржі та стану акаунта."
  },
  {
    question: "Скільки часу займає процес?",
    answer:
      "Це залежить від біржі, готовності акаунта, документів і швидкості перевірки з боку платформи."
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
