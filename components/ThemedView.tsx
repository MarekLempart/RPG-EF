import { View, type ViewProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export type ThemedViewProps = ViewProps & {
  customBackgroundColor?: string;
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
