"use client";

import { useState } from "react";

const faqs = [
  {
    question: "เงินต้นของฉันจะหายไปได้ไหม?",
    answer:
      "กองทุนของเรากระจายการลงทุนในสินทรัพย์หลากหลายประเภททั่วโลก ในช่วง 10 ปีที่ผ่านมา ผลตอบแทนเฉลี่ยต่อปีอยู่ที่ 7.8% แม้ในช่วงวิกฤตตลาด กองทุนยังฟื้นตัวได้ภายใน 12–18 เดือน เรามีทีมบริหารความเสี่ยงตลอด 24 ชั่วโมง",
  },
  {
    question: "ฉันจะถอนเงินได้เมื่อไหร่?",
    answer:
      "คุณสามารถถอนเงินได้ทุกเวลาโดยไม่มีค่าปรับ เงินจะเข้าบัญชีธนาคารของคุณภายใน 3 วันทำการ ไม่มีการล็อคเงินขั้นต่ำ",
  },
  {
    question: "ต้องรู้เรื่องการลงทุนไหมถึงจะเริ่มได้?",
    answer:
      "ไม่จำเป็นเลย ทีมผู้เชี่ยวชาญของเราจะจัดการทุกอย่างให้ คุณเพียงแค่บอกเป้าหมายและระยะเวลาที่ต้องการ เราจะเลือกแผนที่เหมาะสมที่สุดให้คุณโดยไม่มีค่าใช้จ่ายเพิ่มเติม",
  },
  {
    question: "เงินขั้นต่ำในการเริ่มต้นคือเท่าไหร่?",
    answer:
      "เริ่มต้นได้ตั้งแต่ ฿50,000 บาท เพื่อให้ได้ประโยชน์จากการกระจายความเสี่ยงอย่างเต็มที่ ไม่มีค่าธรรมเนียมเปิดบัญชี",
  },
  {
    question: "มีค่าธรรมเนียมอะไรบ้าง?",
    answer:
      "เราเก็บค่าบริหารจัดการเพียง 0.5% ต่อปี (เช่น เงิน ฿1,000,000 เสียค่าธรรมเนียมเพียง ฿5,000 ต่อปี) ไม่มีค่าธรรมเนียมซ่อนเร้น ไม่มีค่าซื้อ ค่าขาย หรือค่าสับเปลี่ยน",
  },
];

export function SaleFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-surface-container-lowest px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-3 text-center font-headline text-3xl font-bold text-on-surface md:text-4xl">
          คำถามที่พบบ่อย
        </h2>
        <p className="mb-12 text-center text-xl text-on-surface-variant">
          เรามีคำตอบสำหรับทุกข้อสงสัยของคุณ
        </p>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-outline-variant bg-white"
            >
              <button
                className="flex w-full items-center justify-between px-8 py-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="pr-4 text-xl font-semibold text-on-surface">
                  {faq.question}
                </span>
                <span
                  className="material-symbols-outlined shrink-0 text-primary transition-transform duration-200"
                  style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  expand_more
                </span>
              </button>
              {open === i && (
                <div className="border-t border-outline-variant px-8 py-6">
                  <p className="text-lg leading-relaxed text-on-surface-variant">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
