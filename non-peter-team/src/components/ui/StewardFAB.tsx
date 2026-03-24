'use client';

export function StewardFAB() {
  return (
    <div className="fixed bottom-10 right-10 z-50 group">
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-4 w-64 bg-surface-container-lowest p-4 rounded-lg shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all border border-surface-container pointer-events-none">
        <div className="flex gap-3 items-center">
          <div className="w-2 h-2 rounded-full bg-secondary animate-ping shrink-0" />
          <p className="text-sm font-semibold">Steward is analyzing the market...</p>
        </div>
        <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
          Tech sectors are showing strong momentum. Click me for a quick report!
        </p>
      </div>

      {/* FAB button */}
      <button className="w-16 h-16 rounded-full bg-primary text-on-primary shadow-2xl flex items-center justify-center overflow-hidden hover:scale-110 transition-transform active:scale-95">
        <span className="material-symbols-outlined text-on-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          support_agent
        </span>
      </button>
    </div>
  );
}
