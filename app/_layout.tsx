// app/_layout.tsx
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Stack } from "expo-router";
import { Provider as ReduxProvider } from "react-redux";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

import store from "@/store";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): JSX.Element | null {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const { t } = useTranslation();

  if (!loaded) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ title: t("homepage"), headerShown: false }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
          <Toast />
        </LanguageProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
