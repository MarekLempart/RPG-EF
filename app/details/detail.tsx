// app/details/detail.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

const DetailScreen = (): JSX.Element => {
    const router = useRouter();
    const handleDetails = (): void => {
        // Tymczasowe przekierowanie
        router.push("/(tabs)");
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resource details</Text>
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
