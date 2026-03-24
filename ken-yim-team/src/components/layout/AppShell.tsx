import { useCallback, useRef, type ReactNode } from 'react';
import { useSpacebarGimmick } from '../../hooks/useSpacebarGimmick';
import Sidebar from './Sidebar';

interface AppShellProps {
  readonly children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const mainRef = useRef<HTMLElement>(null);

  const triggerShake = useCallback(() => {
    const el = mainRef.current;
    if (!el) return;
    el.classList.remove('shake');
    el.getBoundingClientRect(); // force reflow to restart animation
    el.classList.add('shake');
  }, []);

  const handleRegenerate = useCallback(() => {
    // Brief intense shake to signal data refresh
    const el = mainRef.current;
    if (!el) return;
    el.classList.remove('shake');
    void el.offsetWidth;
    el.style.setProperty('--shake-intensity', '1.5');
    el.classList.add('shake');
    setTimeout(() => el.style.removeProperty('--shake-intensity'), 600);
  }, []);

  useSpacebarGimmick(triggerShake, handleRegenerate);

  return (
    <div className="flex h-screen bg-[var(--color-bg-app)] overflow-hidden">
      <Sidebar />
      <main ref={mainRef} className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
