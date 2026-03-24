import { useNavigate } from 'react-router-dom'
import { TrendingUp, Shield, BarChart2, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'
import { funds } from '@/data/funds'
import { NAVBadge } from '@/components/nav/NAVBadge'

const features = [
  {
    icon: TrendingUp,
    title: 'คัดเฉพาะหุ้นคุณภาพ',
    desc: 'Jitta Score คัดเลือกบริษัทที่มีพื้นฐานแข็งแกร่ง กำไรสม่ำเสมอ และ Moat ที่ยั่งยืน ตามหลักการลงทุนของ Warren Buffett',
  },
  {
    icon: Shield,
    title: 'บริหารความเสี่ยงอย่างมืออาชีพ',
    desc: 'กระจายการลงทุนในตลาดหุ้นและตราสารหนี้ทั่วโลก ภายใต้การกำกับดูแลของ ก.ล.ต. ไทย ปลอดภัย โปร่งใส',
  },
  {
    icon: BarChart2,
    title: 'ผลตอบแทนชัดเจน ไม่มีซ่อน',
    desc: 'ติดตาม NAV แบบ Real-time อัปเดตทุกวัน ดูประวัติผลตอบแทนย้อนหลังได้ครบ ค่าธรรมเนียมเดียว 0.5% ต่อปี',
  },
  {
    icon: Zap,
    title: 'เริ่มต้นเพียง ฿1,000',
    desc: 'ลงทุนได้ทุกคน ไม่ต้องมีเงินก้อนใหญ่ เริ่มจาก ฿1,000 กับ Omni Fund แล้วค่อยๆ สร้างพอร์ตที่แข็งแกร่งขึ้นเรื่อยๆ',
  },
]

const highlights = [
  'อนุมัติโดย ก.ล.ต. ไทย',
  'คัดหุ้นด้วย Jitta Score + AI',
  'เปิดบัญชีออนไลน์ 100%',
  'ไม่มีกำหนดระยะเวลาล็อก',
]

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-brand-border bg-white/90 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center">
            <span className="text-white font-black text-sm">J</span>
          </div>
          <div>
            <span className="text-brand-text font-bold text-sm">Jitta</span>
            <span className="text-brand-muted text-sm"> Wealth</span>
          </div>
        </div>
        <Button variant="primary" size="sm" onClick={() => navigate(ROUTES.DASHBOARD)}>
          เข้าสู่ระบบ <ArrowRight size={14} />
        </Button>
      </header>

      {/* Hero */}
      <section className="px-6 py-20 md:py-32 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
          อัปเดต NAV แบบ Real-time ทุกวัน
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-text leading-tight mb-4">
          ลงทุนมีกำไร
          <br />
          <span className="text-brand-green">มั่นใจสร้างความยั่งยืน</span>
          <br />
          <span className="text-3xl md:text-5xl">เย้ๆ 🎉</span>
        </h1>

        <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Jitta Wealth คัดเลือกกองทุนคุณภาพด้วยหลักการลงทุนแบบ VI
          กระจายความเสี่ยงทั่วโลก เริ่มต้นได้ตั้งแต่ ฿1,000
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" onClick={() => navigate(ROUTES.DASHBOARD)}>
            ดู Dashboard <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate(ROUTES.FUNDS)}>
            ดูกองทุนทั้งหมด
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8">
          {highlights.map(h => (
            <div key={h} className="flex items-center gap-1.5 text-sm text-brand-muted">
              <CheckCircle2 size={14} className="text-brand-green" />
              {h}
            </div>
          ))}
        </div>
      </section>

      {/* Live NAV Strip */}
      <section className="border-y border-brand-border bg-white py-6 overflow-x-auto shadow-sm">
        <p className="text-center text-xs text-brand-muted mb-3 tracking-wide uppercase">ราคา NAV วันนี้</p>
        <div className="flex gap-4 px-6 min-w-max">
          {funds.map(f => (
            <div key={f.id} className="flex items-center gap-3 px-4 py-3 bg-brand-bg rounded-xl border border-brand-border">
              <div>
                <p className="text-brand-muted text-xs">{f.shortName}</p>
                <p className="text-brand-text font-bold tabnum">฿{f.nav.toFixed(4)}</p>
              </div>
              <NAVBadge value={f.dailyChangePercent} />
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-text text-center mb-3">
          ทำไมต้อง Jitta Wealth?
        </h2>
        <p className="text-brand-muted text-center mb-12">สร้างมาเพื่อนักลงทุนยุคใหม่ ขับเคลื่อนด้วยข้อมูล</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card hover:border-brand-green/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-brand-green" />
              </div>
              <h3 className="text-brand-text font-semibold mb-2">{title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto bg-white border border-brand-border rounded-3xl p-10 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center mx-auto mb-6">
            <TrendingUp size={28} className="text-brand-green" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-text mb-2">
            เริ่มลงทุนได้เลยวันนี้
          </h2>
          <p className="text-brand-green font-semibold mb-4">ลงทุนมีกำไร มั่นใจสร้างความยั่งยืน เย้ๆ 🎉</p>
          <p className="text-brand-muted mb-8">
            เปิดบัญชีออนไลน์ภายในไม่กี่นาที ไม่ต้องใช้เอกสาร ไม่ต้องเดินทาง
          </p>
          <Button size="lg" onClick={() => navigate(ROUTES.DASHBOARD)}>
            เริ่มต้นเลย <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-brand-border text-center text-brand-muted text-xs">
        <p>© 2026 บริษัท Jitta Wealth จำกัด · ภายใต้การกำกับดูแลของ ก.ล.ต. ไทย · ผลตอบแทนในอดีตไม่ได้การันตีผลตอบแทนในอนาคต</p>
      </footer>
    </div>
  )
}
