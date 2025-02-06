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
            <Text style={styles.title}>Rejestracja</Text>
            <TextInput
                style={styles.input}
                placeholder="Imię"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Nazwisko"
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
                placeholder="Hasło"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Powtórz hasło"
                secureTextEntry
                value={repeatPassword}
                onChangeText={setRepeatPassword}
            />
            <Text style={styles.label}>Wybierz funkcję:</Text>
            <Picker
                selectedValue={role}
                onValueChange={(itemValue: "gm" | "player") => setRole(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Mistrz gry" value="gm" />
                <Picker.Item label="Gracz" value="player" />
            </Picker>
            <Button title="Zarejestruj" onPress={handleRegister} />
            <Button title="Loguj" onPress={() => router.push("/login")} />
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
});
