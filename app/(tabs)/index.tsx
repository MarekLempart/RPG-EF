    // app/(tabs)/home.tsx
    import React from "react";
    import { View, Text, StyleSheet } from "react-native";
    import ThemeSwitcher from "@/components/ThemeSwitcher";
    import LanguageSwitcher from "@/components/LanguageSwitcher";

    const HomeScreen = (): JSX.Element => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Strona główna</Text>
        <ThemeSwitcher />
        <LanguageSwitcher />
        </View>
    );
    };

    export default HomeScreen;

    const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 24, marginBottom: 20 }
    });
