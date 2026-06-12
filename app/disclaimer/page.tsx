import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer | P2P Merchant Support",
  description:
    "Юридичне застереження щодо незалежного консультаційного сервісу супроводу P2P-мерчанта."
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      description="Це юридичне застереження визначає межі відповідальності сервісу та роль бірж у процесі розгляду заявки."
    >
      <LegalSection title="Незалежний статус">
        <p>
          Сервіс є незалежним консультаційним сервісом. Ми не є офіційними
          представниками Bybit, OKX, WEEX, MEXC або CryptoBot, якщо окремо не
          зазначено інше.
        </p>
      </LegalSection>

      <LegalSection title="Рішення приймає біржа">
        <p>
          Фінальне рішення щодо надання статусу P2P-мерчанта приймає відповідна
          біржа. Ми не гарантуємо схвалення заявки.
        </p>
      </LegalSection>

      <LegalSection title="Не фінансова порада">
        <p>
          Ми не надаємо фінансових, інвестиційних або юридичних порад. Інформація
          на сайті має консультаційний характер і не є рекомендацією щодо
          інвестицій або торгових операцій.
        </p>
      </LegalSection>

      <LegalSection title="Дотримання правил">
        <p>
          Ми не допомагаємо обходити перевірки, правила платформ, KYC/AML або
          вимоги законодавства. Користувач самостійно відповідає за достовірність
          наданих даних і дотримання правил платформи.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
