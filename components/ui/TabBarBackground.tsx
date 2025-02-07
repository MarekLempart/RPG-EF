// // This is a shim for web and Android where the tab bar is generally opaque.
// export default undefined;

// export function useBottomTabOverflow() {
//   return 0;
// }

import { View, ViewStyle } from "react-native";

interface TabBarBackgroundProps {
  style ?: ViewStyle; // Obsługa stylów
}

export default function TabBarBackground({ style }: TabBarBackgroundProps) {
  return <View style={[{ backgroundColor: "transparent" }, style]} />;
}

export function useBottomTabOverflow() {
  return 0;
}
