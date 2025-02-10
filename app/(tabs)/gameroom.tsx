// app/(tabs)/gameroom.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";


const GameRoomScreen = (): JSX.Element => {
    const router = useRouter();
    const { theme } = useTheme();
    const { t } = useTranslation();


    const handleGameRoom = (): void => {
        // Tymczasowe przekierowanie
        router.push("/(tabs)");
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{t("game_room")}</Text>

            <View style={styles.buttonContainer}>
                <Button title={t("game_room")} onPress={handleGameRoom} />
                <Button title={t("back")} onPress={() => router.back()} />
            </View>
        </View>
    );
};

    export default GameRoomScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 24
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    }
});
