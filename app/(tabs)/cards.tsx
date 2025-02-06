// app/(tabs)/cards.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CardsScreen = (): JSX.Element => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Przeglądanie kart</Text>
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
    }
});
