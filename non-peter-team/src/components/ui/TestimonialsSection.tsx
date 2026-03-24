const testimonials = [
  {
    avatar: "/testimonials/avatar-1.png",
    name: "Nattawut S.",
    role: "Private Investor",
    quote:
      "Steward gives me a real-time view of my portfolio I never had before. The clarity is unmatched.",
  },
  {
    avatar: "/testimonials/avatar-2.png",
    name: "Krit P.",
    role: "Freelance Consultant",
    quote:
      "I finally feel in control of my financial future. The insights are sharp and the interface is clean.",
  },
  {
    avatar: "/testimonials/avatar-3.png",
    name: "Pimchanok R.",
    role: "Tech Entrepreneur",
    quote:
      "As someone who tracks performance daily, Steward's analytics are exactly what I needed.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-10 text-center font-headline text-2xl font-semibold text-on-surface">
        Trusted by investors like you
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col gap-4 rounded-xl border border-outline-variant bg-white p-6"
          >
            <p className="text-sm leading-relaxed text-on-surface">
              <span className="mr-1 font-headline text-2xl leading-none text-primary">&ldquo;</span>
              {t.quote}
            </p>
            <div className="mt-auto flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-on-surface">{t.name}</p>
                <p className="text-xs text-on-surface-variant">{t.role}</p>
              </div>
              <p className="ml-auto text-sm text-primary">★★★★★</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
