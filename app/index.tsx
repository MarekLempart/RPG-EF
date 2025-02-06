// app/index.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
        <Text style={styles.title}>
            Application for RPGs with the system Year Zero Engine
        </Text>
        <View style={styles.buttonContainer}>
            <Button title="Login" onPress={() => router.push("/login")} />
            <Button title="Register" onPress={() => router.push("/register")} />
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
