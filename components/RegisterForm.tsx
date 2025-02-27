// components/RegisterForm.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios, { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

const RegisterForm = (): JSX.Element => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const router = useRouter();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [role, setRole] = useState<"gm" | "player">("player");

    const isValidEmail = (email: string): boolean => {
        // Prosty wzorzec walidujący adres e-mail
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPassword = (password: string): boolean => {
        // Minimum 6 znaków, co najmniej 1 duża litera, 1 mała litera, 1 cyfra
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
    };

    const validateForm = (): boolean => {
        if (firstName.trim().length < 3) {
            Toast.show({
                type: "error",
                text1: t("registration_error"),
                text2: t("First name must be at least 3 characters")
            });
            return false;
        }
        if (lastName.trim().length < 3) {
            Toast.show({
                type: "error",
                text1: t("registration_error"),
                text2: t("Last name must be at least 3 characters")
            });
            return false;
        }
        if (!isValidEmail(email)) {
            Toast.show({
                type: "error",
                text1: t("registration_error"),
                text2: t("Please enter a valid email address")
            });
            return false;
        }
        if (!isValidPassword(password)) {
            Toast.show({
                type: "error",
                text1: t("registration_error"),
                text2: t("Password must be at least 6 characters long and include uppercase, lowercase and a number")
            });
            return false;
        }
        if (password !== repeatPassword) {
            Toast.show({
                type: "error",
                text1: t("registration_error"),
                text2: t("passwords_do_not_match")
            });
            return false;
        }
        return true;
    };

    const handleRegister = async (): Promise<void> => {
        if (!validateForm()) {
            return;
        }
        try {
            await axios.post("http://localhost:5100/api/auth/register", {
                firstName,
                lastName,
                email,
                password,
                role,
            });
            Toast.show({
                type: "success",
                text1: t("success"),
                text2: t("registration_success")
            });
            router.push("/login");
        } catch (error) {
            const err = error as AxiosError;
            console.error("Registration error:", err.response?.data || err.message);
            Toast.show({
                type: "error",
                text1: t("registration_error"),
                text2: (err.response?.data as { message?: string })?.message || t("registration_error_message")
            });
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{t("register")}</Text>
        <TextInput
            style={[
                styles.input,
                {
                    backgroundColor: theme.colors.inputBackground,
                    borderColor: theme.colors.inputBorder,
                    color: theme.colors.textPrimary,
                },
            ]}
            placeholder={t("first_name")}
            placeholderTextColor={theme.colors.textSecondary}
            value={firstName}
            onChangeText={setFirstName}
        />
        <TextInput
            style={[
                styles.input,
                {
                    backgroundColor: theme.colors.inputBackground,
                    borderColor: theme.colors.inputBorder,
                    color: theme.colors.textPrimary,
                },
            ]}
            placeholder={t("last_name")}
            placeholderTextColor={theme.colors.textSecondary}
            value={lastName}
            onChangeText={setLastName}
        />
        <TextInput
            style={[
                styles.input,
                {
                    backgroundColor: theme.colors.inputBackground,
                    borderColor: theme.colors.inputBorder,
                    color: theme.colors.textPrimary,
                },
            ]}
            placeholder={t("email")}
            placeholderTextColor={theme.colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
        />
        <TextInput
            style={[
                styles.input,
                {
                    backgroundColor: theme.colors.inputBackground,
                    borderColor: theme.colors.inputBorder,
                    color: theme.colors.textPrimary,
                },
            ]}
            placeholder={t("password")}
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />
        <TextInput
            style={[
                styles.input,
                {
                    backgroundColor: theme.colors.inputBackground,
                    borderColor: theme.colors.inputBorder,
                    color: theme.colors.textPrimary,
                },
            ]}
            placeholder={t("repeat_password")}
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry
            value={repeatPassword}
            onChangeText={setRepeatPassword}
        />
        <Text style={[styles.label, { color: theme.colors.textPrimary }]}>{t("select_function")}</Text>
        <Picker
            selectedValue={role}
            onValueChange={(itemValue: "gm" | "player") => setRole(itemValue)}
            style={[
                styles.input,
                {
                    backgroundColor: theme.colors.inputBackground,
                    borderColor: theme.colors.inputBorder,
                    color: theme.colors.textPrimary,
                },
            ]}
        >
            <Picker.Item label={t("game_master")} value="gm" />
            <Picker.Item label={t("player")} value="player" />
        </Picker>
        <View style={styles.buttonContainer}>
            <Button title={t("register")} onPress={handleRegister} />
            <Button title={t("login")} onPress={() => router.push("/login")} />
            <Button title={t("back")} onPress={() => router.back()} />
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
});

export default RegisterForm;
