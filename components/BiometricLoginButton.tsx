// components/BiometricLoginButton.tsx
import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { useBiometricAuth } from "@/hooks/useBiometricAuth";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

const BiometricLoginButton = (): JSX.Element => {
    const { biometricAuth } = useBiometricAuth();
    const { t } = useTranslation();
    const router = useRouter();

    const handleBiometricLogin = async () => {
        try {
            const success = await biometricAuth();
            if (success) {
                Toast.show({
                    type: "success",
                    text1: t("login_success"),
                    text2: t("biometric_success_message"),
                });
                router.push("/(tabs)");
            } else {
                Toast.show({
                    type: "error",
                    text1: t("login_error"),
                    text2: t("biometric_fail_message"),
                });
            }
        } catch (error) {
            console.error("Biometric error:", error);
            Toast.show({
                type: "error",
                text1: t("login_error"),
                text2: t("biometric_error_message"),
            });
        }
    };

    return (
        <View style={styles.container}>
            <Button title={t("login_with_biometrics")} onPress={handleBiometricLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
});

export default BiometricLoginButton;
