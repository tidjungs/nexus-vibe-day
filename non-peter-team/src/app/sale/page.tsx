import Image from "next/image";
import { SaleFAQ } from "@/components/ui/SaleFAQ";
import { SupportChat } from "@/components/ui/SupportChat";

export const metadata = {
  title: "Steward Wealth | เริ่มต้นลงทุนเพื่ออนาคต",
  description:
    "ให้เงินทำงานแทนคุณ ปลอดภัย โปร่งใส ผลตอบแทน 7–9% ต่อปี ดีกว่าดอกเบี้ยธนาคาร 5 เท่า",
};

const benefits = [
  {
    icon: "shield",
    highlight: "คุ้มครองเงินลงทุน",
    title: "ปลอดภัย มั่นคง",
    description:
      "ภายใต้การกำกับดูแลของ ก.ล.ต. กระจายความเสี่ยงในหลักทรัพย์หลายประเภท ไม่ฝากไข่ไว้ในตะกร้าใบเดียว",
  },
  {
    icon: "trending_up",
    highlight: "เฉลี่ย 7–9% ต่อปี",
    title: "ผลตอบแทนสูงกว่า 5 เท่า",
    description:
      "ผลตอบแทนเฉลี่ย 7–9% ต่อปี เทียบกับดอกเบี้ยเงินฝากที่ 1.5% ทำให้เงินออมเติบโตได้จริงและชนะเงินเฟ้อ",
  },
  {
    icon: "support_agent",
    highlight: "ไม่ต้องมีความรู้ด้านการเงิน",
    title: "ดูแลโดยผู้เชี่ยวชาญ",
    description:
      "ทีมนักวิเคราะห์การเงินมืออาชีพดูแลพอร์ตให้คุณตลอด คุณไม่ต้องรู้เรื่องการลงทุนเลยก็ได้",
  },
];

const steps = [
  {
    number: "1",
    title: "เปิดบัญชีออนไลน์",
    description:
      "กรอกข้อมูลส่วนตัวและยืนยันตัวตนผ่านบัตรประชาชน ใช้เวลาเพียง 5 นาที ทำได้ที่บ้านผ่านมือถือหรือคอมพิวเตอร์",
  },
  {
    number: "2",
    title: "เลือกแผนที่เหมาะกับคุณ",
    description:
      "ที่ปรึกษาการเงินส่วนตัวจะแนะนำแผนลงทุนที่เหมาะกับเป้าหมายและระดับความเสี่ยงที่คุณรับได้",
  },
  {
    number: "3",
    title: "รับผลตอบแทนทุกเดือน",
    description:
      "ติดตามพอร์ตผ่านแอปได้ตลอดเวลา และถอนเงินได้ทุกเมื่อที่ต้องการภายใน 3 วันทำการ",
  },
];

const testimonials = [
  {
    name: "คุณสมชาย วรรณภิรมย์",
    age: "62 ปี",
    role: "อดีตข้าราชการ",
    avatar: "/testimonials/avatar-1.png",
    quote:
      "ตอนแรกกังวลมาก กลัวสูญเงิน แต่พอลองใช้ครบ 1 ปี ได้ผลตอบแทน 8.2% โดยที่แทบไม่ต้องทำอะไรเลย ตอนนี้แนะนำให้เพื่อนๆ ทุกคน",
    returnValue: "+8.2%",
  },
  {
    name: "คุณนภาพร กมลรัตน์",
    age: "58 ปี",
    role: "แม่บ้านและนักลงทุน",
    avatar: "/testimonials/avatar-2.png",
    quote:
      "ลูกสาวแนะนำให้ลองใช้ ตอนแรกไม่เชื่อ แต่ตอนนี้ได้ดอกเบี้ยมากกว่าธนาคารเกือบ 5 เท่า โทรถามทีมงานได้ตลอด พูดกันรู้เรื่อง",
    returnValue: "+7.8%",
  },
  {
    name: "คุณวิชัย มงคลศิริ",
    age: "65 ปี",
    role: "อดีตเจ้าของธุรกิจ",
    avatar: "/testimonials/avatar-3.png",
    quote:
      "เอาเงินเกษียณมาลงทุน ตอนนี้มีรายได้ passive ทุกเดือน ชีวิตหลังเกษียณสบายขึ้นมาก ไม่ต้องกังวลเรื่องเงินอีกแล้ว",
    returnValue: "+9.1%",
  },
];

const comparison = [
  {
    label: "ผลตอบแทนเฉลี่ย",
    steward: "7–9% / ปี",
    bank: "1.5% / ปี",
    gold: "3–5% / ปี",
    highlight: true,
  },
  { label: "กำกับโดย ก.ล.ต.", steward: "✓", bank: "✓", gold: "✗", highlight: false },
  { label: "กระจายความเสี่ยง", steward: "✓", bank: "✗", gold: "✗", highlight: false },
  { label: "ถอนได้ทุกเวลา", steward: "✓", bank: "บางประเภท", gold: "✗", highlight: false },
  { label: "บริหารโดยผู้เชี่ยวชาญ", steward: "✓", bank: "✗", gold: "✗", highlight: false },
  { label: "เริ่มต้นขั้นต่ำ", steward: "฿50,000", bank: "฿1", gold: "฿10,000+", highlight: false },
];

export default function SalePage() {
  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      {/* ─── Sticky Navbar ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">account_balance</span>
            <span className="font-headline text-xl font-bold text-primary">Steward Wealth</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:021234567"
              className="hidden items-center gap-1 text-lg text-on-surface-variant sm:flex"
            >
              <span className="material-symbols-outlined text-base text-primary">phone</span>
              02-123-4567
            </a>
            <a
              href="/dashboard"
              className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-on-primary shadow-sm hover:bg-primary-dim"
            >
              เริ่มต้นเลย
            </a>
          </div>
        </div>
      </header>

      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-gradient-to-br from-primary-container/30 via-surface to-secondary-container/20 px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary-container px-4 py-2 text-sm font-semibold text-on-secondary-container">
            <span className="material-symbols-outlined text-base">verified</span>
            ได้รับใบอนุญาตจาก ก.ล.ต. · ปลอดภัยระดับธนาคาร
          </div>
          <h1 className="font-headline text-4xl font-bold leading-tight tracking-tight text-on-surface md:text-6xl">
            เงินที่สะสมมาทั้งชีวิต
            <br />
            <span className="text-primary">ควรได้รับมากกว่านี้</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-on-surface-variant md:text-2xl">
            ดอกเบี้ยธนาคาร 1.5% ไม่สามารถชนะเงินเฟ้อได้ Steward ช่วยให้คุณได้ผลตอบแทน
            <strong className="text-secondary"> 7–9% ต่อปี</strong> อย่างปลอดภัยและโปร่งใส
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/register"
              className="w-full rounded-full bg-primary px-10 py-5 text-xl font-bold text-on-primary shadow-lg hover:bg-primary-dim sm:w-auto"
            >
              เริ่มต้นลงทุนวันนี้
            </a>
            <a
              href="tel:021234567"
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary px-10 py-5 text-xl font-semibold text-primary hover:bg-primary-container/30 sm:w-auto"
            >
              <span className="material-symbols-outlined">phone</span>
              โทรปรึกษาฟรี
            </a>
          </div>
          <p className="mt-4 text-base text-on-surface-variant">
            ไม่มีค่าธรรมเนียมเปิดบัญชี · ถอนเงินได้ทุกเมื่อ · ทีมงานพร้อมดูแล 7 วัน
          </p>
        </div>
      </section>

      {/* ─── Trust Bar ────────────────────────────────────────────── */}
      <section className="border-y border-outline-variant bg-white px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { icon: "gpp_good", value: "ก.ล.ต.", label: "ได้รับใบอนุญาตอย่างถูกต้อง" },
              { icon: "lock", value: "256-bit", label: "การเข้ารหัสระดับธนาคาร" },
              { icon: "people", value: "50,000+", label: "นักลงทุนไว้วางใจ" },
              { icon: "account_balance_wallet", value: "฿10B+", label: "มูลค่าสินทรัพย์ที่บริหาร" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                <span className="material-symbols-outlined text-4xl text-primary">{item.icon}</span>
                <p className="font-headline text-2xl font-bold text-on-surface">{item.value}</p>
                <p className="text-sm text-on-surface-variant">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Problem Section ──────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-center font-headline text-3xl font-bold text-on-surface md:text-4xl">
            เงินออมของคุณกำลังถูกเงินเฟ้อกัดกิน
          </h2>
          <p className="mb-12 text-center text-xl text-on-surface-variant">
            หากคุณฝากเงิน ฿1,000,000 ในธนาคาร นี่คือสิ่งที่เกิดขึ้นในแต่ละปี
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                label: "ดอกเบี้ยเงินฝากธนาคาร",
                value: "+1.5% / ปี",
                sub: "+฿15,000 รับดอกเบี้ย",
                valueClass: "text-on-surface-variant",
                border: "border-outline-variant",
              },
              {
                label: "อัตราเงินเฟ้อ",
                value: "−3.5% / ปี",
                sub: "−฿35,000 กำลังซื้อหายไป",
                valueClass: "text-error",
                border: "border-error",
              },
              {
                label: "ผลลัพธ์ที่แท้จริง",
                value: "−2% / ปี",
                sub: "มูลค่าเงินลดลงทุกปี",
                valueClass: "text-error",
                border: "border-error",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl border-2 ${item.border} bg-white p-8 text-center`}
              >
                <p className="mb-3 text-base font-semibold text-on-surface-variant">{item.label}</p>
                <p className={`font-headline text-4xl font-bold font-mono tabular-nums ${item.valueClass}`}>
                  {item.value}
                </p>
                <p className={`mt-2 text-lg ${item.valueClass}`}>{item.sub}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xl text-on-surface-variant">
            กับ Steward คุณจะได้รับ{" "}
            <strong className="font-mono text-2xl text-secondary">+7–9% ต่อปี</strong> แทน ทำให้เงิน
            ฿1,000,000 กลายเป็น{" "}
            <strong className="text-secondary">฿1,967,151 ใน 10 ปี</strong>
          </p>
        </div>
      </section>

      {/* ─── Benefits ─────────────────────────────────────────────── */}
      <section className="bg-surface-container-low px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center font-headline text-3xl font-bold text-on-surface md:text-4xl">
            ทำไมต้องเลือก Steward?
          </h2>
          <p className="mb-12 text-center text-xl text-on-surface-variant">
            ออกแบบมาสำหรับผู้ที่ต้องการความมั่นคงและผลตอบแทนที่แท้จริง
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl bg-white p-8 shadow-sm">
                <span className="material-symbols-outlined mb-4 block text-5xl text-primary">
                  {benefit.icon}
                </span>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-secondary">
                  {benefit.highlight}
                </p>
                <h3 className="mb-3 font-headline text-2xl font-bold text-on-surface">
                  {benefit.title}
                </h3>
                <p className="text-lg leading-relaxed text-on-surface-variant">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Comparison Table ─────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-center font-headline text-3xl font-bold text-on-surface md:text-4xl">
            เปรียบเทียบผลตอบแทน
          </h2>
          <p className="mb-12 text-center text-xl text-on-surface-variant">ตัวเลขพูดแทนทุกอย่าง</p>
          <div className="overflow-hidden rounded-2xl border border-outline-variant">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-primary text-on-primary">
                  <th className="px-6 py-5 text-left text-lg font-semibold">รายละเอียด</th>
                  <th className="px-6 py-5 text-center text-lg font-semibold">Steward</th>
                  <th className="px-6 py-5 text-center text-lg font-semibold">ธนาคาร</th>
                  <th className="px-6 py-5 text-center text-lg font-semibold">ทอง</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {comparison.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-surface"}>
                    <td className="px-6 py-5 text-lg font-medium text-on-surface">{row.label}</td>
                    <td
                      className={`px-6 py-5 text-center font-mono text-lg font-bold tabular-nums ${
                        row.highlight ? "text-secondary" : "text-on-surface"
                      }`}
                    >
                      {row.steward}
                    </td>
                    <td className="px-6 py-5 text-center font-mono text-lg tabular-nums text-on-surface-variant">
                      {row.bank}
                    </td>
                    <td className="px-6 py-5 text-center font-mono text-lg tabular-nums text-on-surface-variant">
                      {row.gold}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────────── */}
      <section className="bg-primary px-6 py-20 text-on-primary">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-center font-headline text-3xl font-bold md:text-4xl">
            เริ่มต้นง่ายใน 3 ขั้นตอน
          </h2>
          <p className="mb-16 text-center text-xl opacity-80">
            ไม่ซับซ้อน ไม่ต้องมีความรู้พิเศษ ทำได้ที่บ้าน
          </p>
          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 font-headline text-4xl font-bold">
                  {step.number}
                </div>
                <h3 className="mb-3 font-headline text-2xl font-bold">{step.title}</h3>
                <p className="text-lg leading-relaxed opacity-80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center font-headline text-3xl font-bold text-on-surface md:text-4xl">
            นักลงทุนเหมือนคุณพูดว่าอย่างไร
          </h2>
          <p className="mb-12 text-center text-xl text-on-surface-variant">
            คนจริง ผลตอบแทนจริง ไม่ใช่แค่โฆษณา
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-outline-variant bg-white p-8"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold text-on-surface">{t.name}</p>
                      <p className="text-base text-on-surface-variant">
                        {t.age} · {t.role}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-secondary-container px-3 py-1 font-mono text-lg font-bold tabular-nums text-secondary">
                    {t.returnValue}
                  </span>
                </div>
                <p className="text-lg leading-relaxed text-on-surface-variant">
                  <span className="font-headline text-3xl leading-none text-primary">&ldquo;</span>
                  {t.quote}
                </p>
                <p className="mt-4 text-base text-amber-500">★★★★★</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────── */}
      <SaleFAQ />

      {/* ─── Final CTA ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary to-primary-dim px-6 py-24 text-on-primary">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-4xl font-bold md:text-5xl">
            พร้อมให้เงินทำงานแทนคุณแล้วหรือยัง?
          </h2>
          <p className="mt-6 text-xl leading-relaxed opacity-90">
            เริ่มต้นวันนี้ด้วยเงิน ฿50,000 ในอีก 10 ปีข้างหน้า
            <br />
            คุณจะมี <strong>฿98,358</strong> จากกองทุนเดียว
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/register"
              className="w-full rounded-full bg-white px-10 py-5 text-xl font-bold text-primary hover:bg-white/90 sm:w-auto"
            >
              เริ่มต้นลงทุนวันนี้
            </a>
            <a
              href="tel:021234567"
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-white px-10 py-5 text-xl font-semibold hover:bg-white/10 sm:w-auto"
            >
              <span className="material-symbols-outlined">phone</span>
              02-123-4567
            </a>
          </div>
          <p className="mt-6 text-base opacity-70">
            บริการฟรี ไม่มีภาระผูกพัน · ทีมงานพร้อมดูแลทุกวัน 8:00–20:00 น.
          </p>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-outline-variant bg-white px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_balance</span>
              <span className="font-headline text-xl font-bold text-primary">Steward Wealth</span>
            </div>
            <p className="max-w-xl text-base text-on-surface-variant">
              บริษัทหลักทรัพย์จัดการกองทุน สตีวาร์ด จำกัด ได้รับใบอนุญาตจากสำนักงาน ก.ล.ต.
              เลขที่ จ.453/2557
            </p>
            <p className="text-sm text-on-surface-variant">
              การลงทุนมีความเสี่ยง ผลตอบแทนในอดีตไม่ได้รับประกันผลตอบแทนในอนาคต
            </p>
            <div className="flex gap-6 text-sm text-on-surface-variant">
              <a href="#" className="hover:text-primary">นโยบายความเป็นส่วนตัว</a>
              <a href="#" className="hover:text-primary">ข้อกำหนดการใช้งาน</a>
              <a href="#" className="hover:text-primary">ติดต่อเรา</a>
            </div>
            <p className="text-sm text-on-surface-variant">© 2025 Steward Financial. Stay Energetic!</p>
          </div>
        </div>
      </footer>

      <SupportChat />
    </div>
  );
}
