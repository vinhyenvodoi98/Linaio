import { useState, useEffect, createContext } from 'react';
import { lightTheme, darkTheme } from 'components/Themes/themes';
import { ThemeProvider } from 'styled-components';

export const ThemeContext = createContext({
  theme: null,
  themeToggler: null,
  mountedComponent: null,
});

export const AppThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const [mountedComponent, setMountedComponent] = useState(false);
  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme ? setTheme(localTheme) : setMode('light');
    setMountedComponent(true);
  }, []);
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, themeToggler, mountedComponent }}>
      <ThemeProvider theme={themeMode}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
