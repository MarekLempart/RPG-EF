// app/(tabs)/gameroom.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

const GameRoomScreen = (): JSX.Element => {
    const router = useRouter();
    const { theme } = useTheme();

    const handleGameRoom = (): void => {
        // Tymczasowe przekierowanie
        router.push("/(tabs)");
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Game room</Text>
            <View style={styles.buttonContainer}>
                <Button title="GameRoom" onPress={handleGameRoom} />
                <Button title="Back" onPress={() => router.back()} />
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
