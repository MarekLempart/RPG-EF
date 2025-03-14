// app/index.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from "@/contexts/ThemeContext";
import ExitButton from '@/components/ExitButton';
import CustomButton from "@/components/CustomButton";

export default function WelcomeScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
                Application for RPGs with the system Year Zero Engine
            </Text>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title="Login"
                    onPress={() => router.push("/login")}
                    theme={theme}
                />
                <CustomButton
                    title="Register"
                    onPress={() => router.push("/register")}
                    theme={theme}
                    />
                <ExitButton />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    }
});
