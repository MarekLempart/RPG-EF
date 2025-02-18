// components/HeaderActions.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

const HeaderActions = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <ThemeToggle />
            <View style={styles.gap} />
            <LanguageToggle />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        marginRight: 10,
    },
    gap: {
        height: 3,
    }
});

export default HeaderActions;
