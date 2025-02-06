// app/register.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

const RegisterScreen = (): JSX.Element => {
    const router = useRouter();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [role, setRole] = useState<"gm" | "player">("player");

    const handleRegister = (): void => {
        // Tymczasowo przekierowujemy do logowania
        router.push("/login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="First name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Repeat Password"
                secureTextEntry
                value={repeatPassword}
                onChangeText={setRepeatPassword}
            />
            <Text style={styles.label}>Select function:</Text>
            <Picker
                selectedValue={role}
                onValueChange={(itemValue: "gm" | "player") => setRole(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Game master (GM)" value="gm" />
                <Picker.Item label="Player Character (PC)" value="player" />
            </Picker>
            <View style={styles.buttonContainer}>
                <Button title="Register" onPress={handleRegister} />
                <Button title="Login" onPress={() => router.push("/login")} />
                <Button title="Back" onPress={() => router.back()} />
            </View>            
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center"
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5
    },
    label: {
        marginBottom: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    }
});
