import React, { useEffect, useRef } from "react";
import { TouchableOpacity, StyleSheet, Animated, Easing, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { darkTheme } from "@/styles/theme";

const SLIDER_WIDTH = 45;
const SLIDER_HEIGHT = 20;
const BUTTON_SIZE = 20;
const PADDING = 2;
const ANIMATION_RANGE = SLIDER_WIDTH - BUTTON_SIZE - 2 * PADDING;


const ThemeToggle = (): JSX.Element => {
    const { theme, toggleTheme } = useTheme();
    const isActive = theme === darkTheme;
    const animation = useRef(new Animated.Value(isActive ? ANIMATION_RANGE : 0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isActive ? ANIMATION_RANGE : 0,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, [isActive, animation]);

    return (
        <TouchableOpacity onPress={toggleTheme} activeOpacity={0.8}>
            <View
                style={[
                    styles.slider,
                    { backgroundColor: isActive ? theme.colors.colGrannySmith : theme.colors.colTan },
                ]}
            >
            <Animated.View
                style={[
                    styles.toggleButton,
                    {
                        borderColor: isActive ? theme.colors.hover : theme.colors.distinction,
                        transform: [{ translateX: animation }],
                    },
                ]}
            >
                <MaterialCommunityIcons
                    name={isActive ? "weather-night" : "weather-sunny"}
                    size={20}
                    color={theme.colors.textPrimary}
                />
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
        backgroundColor: "theme.colors.bgPrimary",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ThemeToggle;
