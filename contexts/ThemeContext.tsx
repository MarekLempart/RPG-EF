// contexts/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import { lightTheme, darkTheme } from "@/styles/theme";
import { ThemeType } from "@/styles/theme.types";

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme, // wartość domyślna
  toggleTheme: () => {}, // funkcja domyślna nic nie robiąca
});

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Pobieramy aktualny motyw systemowy
  const systemColorScheme = useSystemColorScheme();
  // Ustawiamy początkowy motyw w zależności od systemu
  const [theme, setTheme] = useState<ThemeType>(
    systemColorScheme === "dark" ? darkTheme : lightTheme
  );

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };
  // Zmiana motywu systemowego automatycznie aktualizowała motyw aplikacji,
  useEffect(() => {
    setTheme(systemColorScheme === "dark" ? darkTheme : lightTheme);
  }, [systemColorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;