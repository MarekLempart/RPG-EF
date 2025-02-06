// contexts/ThemeContext.tsx
// import React, { createContext, useState, ReactNode } from "react";
// import { lightTheme, darkTheme } from "@/styles/theme";

// export type ThemeType = typeof lightTheme;

// interface ThemeContextProps {
//     theme: ThemeType;
//     toggleTheme: () => void;
// }

// export const ThemeContext = createContext<ThemeContextProps>({
//     theme: lightTheme,
//     toggleTheme: () => {}
// });

// interface Props {
//     children: ReactNode;
// }

// export const ThemeProvider = ({ children }: Props): JSX.Element => {
//     const [theme, setTheme] = useState<ThemeType>(lightTheme);

//     const toggleTheme = (): void => {
//         setTheme((prev) => (prev === lightTheme ? darkTheme : lightTheme));
//     };

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//         {children}
//         </ThemeContext.Provider>
//     );
// };


import React, { createContext, useContext, useState, ReactNode } from "react";
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
  // Używamy stanu, aby przechowywać aktualny motyw
  const [theme, setTheme] = useState<ThemeType>(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };



// // contexts/ThemeContext.tsx
// import React, { createContext, useContext, ReactNode } from 'react';
// import { lightTheme } from '@/styles/theme';
// import { ThemeType } from '@/styles/theme.types';

// // Definiujemy domyślną wartość – przykładowo motyw jasny.
// const ThemeContext = createContext<ThemeType>(lightTheme);

// export const useTheme = () => useContext(ThemeContext);

// type ThemeProviderProps = {
//     children: ReactNode;
//     value: ThemeType;
// };

// export const ThemeProvider = ({ children, value }: ThemeProviderProps) => {
//     return (
//         <ThemeContext.Provider value={value}>
//         {children}
//         </ThemeContext.Provider>
//     );
// };

