// app/(tabs)/cards.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

const CardsScreen = (): JSX.Element => {
    const router = useRouter();
    const { theme } = useTheme();
        
        const handleResourcesPage = (): void => {
            // Tymczasowe przekierowanie
            router.push("/details/detail");
        };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Resources page:</Text>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>View character sheets</Text>
            <View style={styles.buttonContainer}>
                <Button title="Resources" onPress={handleResourcesPage} />
                <Button title="Back" onPress={() => router.back()} />
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
        fontSize: 24
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    }
});
