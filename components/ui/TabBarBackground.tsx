// // This is a shim for web and Android where the tab bar is generally opaque.
// export default undefined;

// export function useBottomTabOverflow() {
//   return 0;
// }

import { View, ViewStyle } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

interface TabBarBackgroundProps {
  style?: ViewStyle;
}

// export default function TabBarBackground({ style }: TabBarBackgroundProps) {
//   return <View style={[{ backgroundColor: "transparent" }, style]} />;
// }
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
