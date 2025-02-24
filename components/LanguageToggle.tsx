// components/LanguageToggle.tsx
import React, { useEffect, useRef, useContext } from "react";
import { TouchableOpacity, StyleSheet, Animated, Easing, View } from "react-native";
import { LanguageContext } from "@/contexts/LanguageContext";
import CountryFlag from "react-native-country-flag";
import { useTheme } from "@/contexts/ThemeContext";
import { darkTheme } from "@/styles/theme";

const SLIDER_WIDTH = 45;
const SLIDER_HEIGHT = 20;
const BUTTON_SIZE = 20;
const PADDING = 2;
const ANIMATION_RANGE = SLIDER_WIDTH - BUTTON_SIZE - 2 * PADDING;

const LanguageToggle = (): JSX.Element => {
    const { language, toggleLanguage } = useContext(LanguageContext);
    const { theme } = useTheme();
    const isActive = language === "en";
    const isDarkMode = theme === darkTheme;
    const animation = useRef(new Animated.Value(isActive ? ANIMATION_RANGE : 0)).current;

useEffect(() => {
    Animated.timing(animation, {
        toValue: isActive ? ANIMATION_RANGE : 0,
        duration: 600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
    }).start();
}, [isActive, animation]);

const flagCode = isActive ? "GB" : "PL";

    return (
        <TouchableOpacity onPress={toggleLanguage} activeOpacity={0.8}>
            <View
                style={[
                    styles.slider,
                    { backgroundColor: isDarkMode ? theme.colors.colGrannySmith : theme.colors.colTan },
                ]}
            >
                <Animated.View
                    style={[
                        styles.toggleButton,
                    { borderColor: isActive ? theme.colors.hover : theme.colors.distinction,
                    transform: [{ translateX: animation }],},
                    ]}
            >
                    <View style={styles.flagContainer}>
                        <CountryFlag isoCode={flagCode} size={16} />
                    </View>                    
                </Animated.View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    slider: {
        width: SLIDER_WIDTH,
        height: SLIDER_HEIGHT,
        borderRadius: SLIDER_HEIGHT / 2,
        padding: PADDING,
        justifyContent: "center",
    },
    toggleButton: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        backgroundColor: "#theme.colors.bgPrimary",
        justifyContent: "center",
        alignItems: "center",
    },
    flagContainer: {
        width: 20,
        height: 20,
        borderRadius: 15,
        borderWidth: 0,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
});

export default LanguageToggle;
