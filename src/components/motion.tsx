import { useEffect, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';

/** Counts up from 0 to `to` once, for "aha" numbers (21/30, 1/7…). */
export function CountUp({ to, duration = 1.1 }: { to: number; duration?: number }) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (reduce) {
      setV(to);
      return;
    }
    const c = animate(0, to, { duration, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [to, duration, reduce]);
  return <>{v}</>;
}

/** Lets a saved memory "fly" to the Me button: chips call memSaved(), the button listens. */
export const memSaved = () => window.dispatchEvent(new CustomEvent('sl-mem-saved'));
export function useMemPulse() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const on = () => setN((x) => x + 1);
    window.addEventListener('sl-mem-saved', on);
    return () => window.removeEventListener('sl-mem-saved', on);
  }, []);
  return n;
}
