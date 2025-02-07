// import {
//     DarkTheme,
//     DefaultTheme,
//     ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
// import { useEffect } from "react";
// import "react-native-reanimated";

// import { useColorScheme } from "@/hooks/useColorScheme";
// import { Provider } from "react-redux";
// import store from "@/store";

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//     const colorScheme = useColorScheme();
//     const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//     });

//     useEffect(() => {
//         if (loaded) {
//             SplashScreen.hideAsync();
//         }
//     }, [loaded]);

//     if (!loaded) {
//         return null;
//     }

// return (
//     <Provider store={store}>
//         <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//             <Stack>
//                 <Stack.Screen
//                     name="(tabs)"
//                     options={{ title: "Home", headerShown: false }}
//                 />
//                 <Stack.Screen name="+not-found" />
//             </Stack>
//             <StatusBar style="auto" />
//         </ThemeProvider>
//     </Provider>
//     );
// }

// app/_layout.tsx
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Stack } from "expo-router";
import { Provider as ReduxProvider } from "react-redux";

import store from "@/store";
import { ThemeProvider } from "@/contexts/ThemeContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      {/* Opakowujemy aplikację w nasz własny ThemeProvider */}
      <ThemeProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ReduxProvider>
  );
}



// // app/_layout.tsx
// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { lightTheme, darkTheme } from "@/styles/theme";
// import { ThemeType } from "@/styles/theme.types";

// type ThemeContextType = {
//   theme: ThemeType;
//   toggleTheme: () => void;
// };

// const ThemeContext = createContext<ThemeContextType>({
//   theme: lightTheme, // wartość domyślna
//   toggleTheme: () => {}, // funkcja domyślna nic nie robiąca
// });

// export const useTheme = () => useContext(ThemeContext);

// type ThemeProviderProps = {
//   children: ReactNode;
// };

// export const ThemeProvider = ({ children }: ThemeProviderProps) => {
//   // Używamy stanu, aby przechowywać aktualny motyw
//   const [theme, setTheme] = useState<ThemeType>(lightTheme);

//   const toggleTheme = () => {
//     setTheme((prevTheme) =>
//       prevTheme === lightTheme ? darkTheme : lightTheme
//     );
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export { ThemeContext };

