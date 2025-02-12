import { View, type ViewProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
// import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  customBackgroundColor?: string;
  // lightColor?: string;
  // darkColor?: string;
};

export function ThemedView({ style, customBackgroundColor, ...otherProps }: ThemedViewProps) {
  const { theme } = useTheme();
  const backgroundColor = customBackgroundColor ?? theme.colors.bgPrimary;

  return (
    <View
      style={[{ backgroundColor }, style]} {...otherProps}
    />
  );
}

// export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
//   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

//   return <View style={[{ backgroundColor }, style]} {...otherProps} />;
// }
