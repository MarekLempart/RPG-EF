import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from "@/contexts/ThemeContext";

interface TabBarBackgroundProps {
  style?: ViewStyle;
}

export default function TabBarBackground({ style }: TabBarBackgroundProps) {
  const { theme } = useTheme();
  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      tint="systemChromeMaterial"
      intensity={100}
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: theme.colors.bgSecondary },
        style,
      ]}
    />
  );
}

export function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  return tabHeight - bottom;
}
