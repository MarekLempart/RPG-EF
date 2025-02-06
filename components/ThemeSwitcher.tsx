// components/ThemeSwitcher.tsx
import React, { useContext } from "react";
import { Button, View } from "react-native";
import { ThemeContext } from "@/contexts/ThemeContext";

const ThemeSwitcher = (): JSX.Element => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <View style={{ margin: 10 }}>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

export default ThemeSwitcher;