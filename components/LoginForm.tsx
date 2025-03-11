// components/LoginForm.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { setUser } from "@/store/slices/userSlice";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import BiometricLoginButton from "./BiometricLoginButton";
import CustomButton from "@/components/CustomButton";

interface LoginResponse {
    user: {
        userId: string;
        firstName: string;
        lastName: string;
        email: string;
        role: "gm" | "player";
        avatar: string;
        token: string;
    };
}

const LoginForm = (): JSX.Element => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async (): Promise<void> => {
        if (!email || !password) {
            Toast.show({
                type: "error",
                text1: t("login_error"),
                text2: t("Please fill in both email and password")
            });
            return;
        }
        try {
            const response = await axios.post<LoginResponse>("https://rpg-app-backend.onrender.com/api/auth/login", {
                email,
                password,
            });
        const { user } = response.data;
        dispatch(
            setUser({
                id: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,                
                avatar: user.avatar,
                token: user.token,
            })
        );
        Toast.show({
            type: "success",
            text1: t("success"),
            text2: t("Logged in successfully")
        });
        router.push("/(tabs)");
        } catch (error) {
            const err = error as AxiosError;
            console.error("Login error:", err.response?.data || err.message);
            Toast.show({
                type: "error",
                text1: t("login_error"),
                text2: (err.response?.data as { message?: string })?.message || t("login_error_message")
            });
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{t("login")}</Text>
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
            <View style={styles.buttonContainer}>
                <CustomButton
                    title={t("login")}
                    onPress={handleLogin}
                    theme={theme}
                />
                <CustomButton
                    title={t("back")}
                    onPress={() => router.back()}
                    theme={theme}
                />
            </View>
            <View style={styles.buttonContainer}>
                <BiometricLoginButton />
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
});

export default LoginForm;
