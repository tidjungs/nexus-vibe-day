import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `คุณคือ "สตีวาร์ด" ผู้ช่วยด้านการลงทุนของ Steward Wealth ผู้ให้คำปรึกษาด้านการลงทุนที่เป็นมิตร เข้าใจง่าย และโปร่งใส

บทบาทของคุณ:
- ตอบคำถามเกี่ยวกับบริการ Steward Wealth (ผลตอบแทน 7–9% ต่อปี, ความปลอดภัย, ขั้นตอนการเปิดบัญชี)
- ช่วยให้ผู้ใช้เข้าใจการลงทุนและการวางแผนการเงิน
- พูดภาษาไทยเป็นหลัก แต่ตอบภาษาอังกฤษได้หากผู้ใช้ถามเป็นภาษาอังกฤษ
- ตอบกระชับ ชัดเจน และให้ข้อมูลที่เป็นประโยชน์

ข้อมูลสำคัญ:
- เริ่มต้นลงทุนขั้นต่ำ ฿50,000
- ผลตอบแทนเฉลี่ย 7–9% ต่อปี
- ได้รับใบอนุญาตจาก ก.ล.ต. เลขที่ จ.453/2557
- ถอนเงินได้ภายใน 3 วันทำการ
- ไม่มีค่าธรรมเนียมเปิดบัญชี
- ทีมงานพร้อมดูแล 7 วัน เวลา 8:00–20:00 น.
- โทร 02-123-4567

หากผู้ใช้ต้องการเริ่มลงทุน ให้แนะนำไปที่ /dashboard`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const stream = client.messages.stream({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
