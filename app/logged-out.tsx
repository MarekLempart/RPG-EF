// app/logged-out.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import CustomButton from "@/components/CustomButton";

export default function LoggedOutScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
        <Text style={[styles.message, { color: theme.colors.textPrimary }]}>
            {t("logged_out_message")}
        </Text>
            <CustomButton
                title={t("login")}
                onPress={() => router.push("/login")}
                theme={theme}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    message: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center",
    },
});
