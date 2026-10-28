import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('vg_portfolio_theme');
      if (savedTheme) return savedTheme;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    if (theme === 'cream') {
      root.classList.remove('dark');
      root.classList.add('cream');
      document.body.style.backgroundColor = '#FAF7F2';
      document.body.style.color = '#111827';
    } else {
      root.classList.remove('cream');
      root.classList.add('dark');
      document.body.style.backgroundColor = '#050505';
      document.body.style.color = '#FFFFFF';
    }

    localStorage.setItem('vg_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'cream' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isCream: theme === 'cream' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
