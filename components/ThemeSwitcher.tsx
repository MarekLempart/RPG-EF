// components/ThemeSwitcher.tsx
import React from "react";
import { Button, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const ThemeSwitcher = (): JSX.Element => {
  const { toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={{ margin: 10 }}>
      <Button title={t("toggle_theme")} onPress={toggleTheme} />
    </View>
  );
};

export default ThemeSwitcher;
