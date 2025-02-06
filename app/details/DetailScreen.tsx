// app/details/DetailScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailScreen = (): JSX.Element => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Szczegóły</Text>
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
    }
});
