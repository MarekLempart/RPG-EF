// app/(tabs)/gameroom.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const GameRoomScreen = (): JSX.Element => {
    const router = useRouter();
    const { theme } = useTheme();
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.user);

    const roleDisplay = user.role === "gm" ? t("game_master") : t("player");

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
            <Text style={[styles.message, { color: theme.colors.textPrimary }]}>
                {t("welcome_gameroom", { name: `${user.firstName} ${user.lastName}`, role: roleDisplay })}
            </Text>
            {user.role === "player" && (
                <Button title={t("join_game")} onPress={() => router.push("/gameroom/joinGame")} />
            )}
            {user.role === "gm" && (
                <>
                    <Button title={t("create_new_game")} onPress={() => router.push("/gameroom/createGame")} />
                    <Button title={t("join_another_game")} onPress={() => router.push("/gameroom/joinGame")} />
                </>
            )}
            <View style={styles.buttonContainer}>
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
    message: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
        position: "absolute",
        bottom: 90,
    }
});
