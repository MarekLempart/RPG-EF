// app/(tabs)/cards.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

const CardsScreen = (): JSX.Element => {
    const router = useRouter();
        
        const handleResourcesPage = (): void => {
            // Tymczasowe przekierowanie
            router.push("/(tabs)");
        };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resources page:</Text>
            <Text style={styles.title}>View character sheets</Text>
            <View style={styles.buttonContainer}>
                <Button title="Resources Page" onPress={handleResourcesPage} />
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
