import { useState, useEffect } from 'react';

/**
 * Hook to match media queries in real time
 * @param {string} query - CSS media query (e.g., '(max-width: 768px)')
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener('change', listener);
    setMatches(media.matches);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
