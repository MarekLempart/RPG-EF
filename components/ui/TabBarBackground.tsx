import { View, ViewStyle } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

interface TabBarBackgroundProps {
  style?: ViewStyle;
}

export default function TabBarBackground({ style }: TabBarBackgroundProps) {
  const { theme } = useTheme();

return (
  <View
    style={[
      { backgroundColor: theme.colors.bgSecondary },
      style,
    ]}
  />
);
}

export function useBottomTabOverflow() {
  return 0;
}
