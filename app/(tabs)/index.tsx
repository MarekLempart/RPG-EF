// app/(tabs)/index.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const HomeScreen = (): JSX.Element => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
                {t("homepage")}
            </Text>
            <View style={styles.buttonContainer}>
                <ThemeSwitcher />
                <LanguageSwitcher />
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 24,
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    }
});
