import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    document.body.classList.remove('custom-cursor-active');
  }, []);

  return null;
}
