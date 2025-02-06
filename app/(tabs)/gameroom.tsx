    // app/(tabs)/gameroom.tsx
    import React from "react";
    import { View, Text, StyleSheet } from "react-native";

    const GameRoomScreen = (): JSX.Element => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Pokój gry</Text>
        </View>
    );
    };

    export default GameRoomScreen;

    const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 24 }
    });
