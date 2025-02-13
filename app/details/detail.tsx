// app/details/detail.tsx
import React, { useLayoutEffect} from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

const DetailScreen = (): JSX.Element => {
    const router = useRouter();
    const navigation = useNavigation();
    const { theme } = useTheme();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: theme.colors.bgSecondary },
            headerTitleStyle: { color: theme.colors.textSecondary },
            headerTintColor: theme.colors.accent,
            ...(Platform.OS === "ios" && {
                headerBackTitle: "Cards",
                headerBackTitleStyle: { color: theme.colors.accent },
            }),
        });
    }, [navigation, theme]);

    const handleDetails = (): void => {
        // Tymczasowe przekierowanie
        router.push("/(tabs)");
    };
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
                Resource details
            </Text>
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
