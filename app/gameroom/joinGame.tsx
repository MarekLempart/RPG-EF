// app/gameroom/joinGame.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

const JoinGameScreen = (): JSX.Element => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const router = useRouter();
    const [gameCode, setGameCode] = useState("");

    const handleJoin = () => {
        if (!gameCode.trim()) {
            Toast.show({
                type: "error",
                text1: t("error"),
                text2: t("game_code_empty")
            });
            return;
        }
            Toast.show({
                type: "success",
                text1: t("success"),
                text2: t("joining_game")
            });
            console.log("Joining game with code:", gameCode);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
                {t("choose_game_title")}
            </Text>
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: theme.colors.inputBackground,
                        borderColor: theme.colors.inputBorder,
                        color: theme.colors.textPrimary,
                    },
                ]}
                placeholder={t("game_code_placeholder")}
                placeholderTextColor={theme.colors.textSecondary}
                value={gameCode}
                onChangeText={setGameCode}
            />
            <View style={styles.buttonContainer}>
                <Button title={t("join_game")} onPress={handleJoin} />
                <Button title={t("back")} onPress={() => router.back()} />
            </View>
        </View>
    );
};

export default JoinGameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
        position: "absolute",
        bottom: 90,
    },
});
