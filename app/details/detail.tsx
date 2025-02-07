// app/details/detail.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

const DetailScreen = (): JSX.Element => {
    const router = useRouter();
    const { theme } = useTheme();
    const handleDetails = (): void => {
        // Tymczasowe przekierowanie
        router.push("/(tabs)");
    };
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Resource details</Text>
            <View style={styles.buttonContainer}>
                <Button title="Details" onPress={handleDetails} />
                <Button title="Back" onPress={() => router.back()} />
            </View>
        </View>
    );
};

export default DetailScreen;

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
