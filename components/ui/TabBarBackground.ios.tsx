import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabBarBackgroundProps {
  style?: ViewStyle; // Dodajemy obsługę props.style
}

export default function BlurTabBarBackground({ style }: TabBarBackgroundProps) {
  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      tint="systemChromeMaterial"
      intensity={100}
      // style={StyleSheet.absoluteFill}
      style={[StyleSheet.absoluteFill, style]}
    />
  );
}

export function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  return tabHeight - bottom;
}
