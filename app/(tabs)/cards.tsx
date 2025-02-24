// app/(tabs)/cards.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";


const CardsScreen = (): JSX.Element => {
    const router = useRouter();
    const { theme } = useTheme();
    const { t } = useTranslation();
        
        const handleResourcesPage = (): void => {
            // Tymczasowe przekierowanie
            router.push("/details/detail");
        };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{t("resources_page")}:</Text>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{t("view_character_sheets")}</Text>
            <View style={styles.buttonContainer}>
                <Button title={t("resources")} onPress={handleResourcesPage} />
                <Button title={t("back")} onPress={() => router.back()} />
            </View>
        </View>
    );
};

export default CardsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        textAlign: "center",
        fontSize: 24
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    }
});
