import { useEffect, useRef } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';

const RAPID_COUNT = 5;      // presses needed within the window
const RAPID_WINDOW_MS = 2000; // rolling time window in ms

/**
 * Listens for spacebar presses anywhere on the page.
 * - Single press  → calls onShake()
 * - 5+ presses within 2s → calls onRegenerate() and resets the counter
 *
 * Focus on inputs/buttons/textareas is ignored so normal UI still works.
 */
export function useSpacebarGimmick(
  onShake: () => void,
  onRegenerate: () => void,
) {
  const regenerateData = usePortfolioStore((s) => s.regenerateData);
  const timestamps = useRef<number[]>([]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code !== 'Space') return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'SELECT') return;
      e.preventDefault();

      const now = Date.now();
      timestamps.current.push(now);
      timestamps.current = timestamps.current.filter((t) => now - t < RAPID_WINDOW_MS);

      onShake();

      if (timestamps.current.length >= RAPID_COUNT) {
        timestamps.current = [];
        onRegenerate();
        regenerateData();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onShake, onRegenerate, regenerateData]);
}
