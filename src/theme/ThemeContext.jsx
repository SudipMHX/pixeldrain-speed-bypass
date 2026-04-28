import { createContext, useContext } from "react";

const ThemeContext = createContext({ theme: "black" });

// Always dark — no toggle needed
export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={{ theme: "black", toggleTheme: () => {} }}>
    {children}
  </ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
