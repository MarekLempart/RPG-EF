// components/CustomButton.tsx
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    ViewStyle,
    StyleProp,
} from "react-native";
import { ThemeType } from "@/styles/theme.types";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Opcjonalnie, dla ikon z @expo/vector-icons

type CustomButtonProps = {
    // Tekst wyświetlany wewnątrz przycisku.
    title?: string;
    // Funkcja wywoływana po naciśnięciu.
    onPress: () => void;
    // Ikona wyświetlana obok tekstu (opcjonalna).
    icon?: React.ReactNode;
    // Motyw aplikacji - kolory, cienie, itp.
    theme: ThemeType;
    // Dodatkowy styl nadpisujący (opcjonalny).
    style?: StyleProp<ViewStyle>;
};

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    icon,
    theme,
    style,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                {
                    // Kolor wypełnienia zależny od stanu (naciśnięcia)
                    backgroundColor: pressed
                        ? theme.colors.activeButton
                        : theme.colors.button,
                    borderRadius: 5,
                    // Cień (dla iOS i Android):
                    shadowColor: theme.colors.shadowColor || "#000",
                },
                style,
            ]}
        >
            {/* Wewnątrz Pressable można wyrenderować zarówno ikonę, jak i tekst */}
            <View style={styles.content}>
                {/* Jeżeli przekazano ikonę, wyrenderuj ją */}
                {icon && (
                    <View style={{ marginRight: title ? 6 : 0 }}>
                        {icon}
                    </View>
                )}
                {/* Jeżeli przekazano tytuł, wyrenderuj tekst */}
                {title && (
                    <Text style={[styles.title, { color: theme.colors.textOnButton }]}>
                        {title}
                    </Text>
                )}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 40,
        // Cień (iOS)
        shadowOffset: { width: 2, height: 7 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        // Cień (Android)
        elevation: 5,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
    },
});

export default CustomButton;
