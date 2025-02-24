// app/(tabs)/index.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/userSlice";
import { useRouter } from "expo-router";
// import ThemeSwitcher from "@/components/ThemeSwitcher";
// import LanguageSwitcher from "@/components/LanguageSwitcher";


const HomeScreen = (): JSX.Element => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();

    // Pobranie danych użytkownika ze store
    const user = useSelector((state: RootState) => state.user);

    const handleLogout = () => {
        // Proponowany kod wylogowania – odkomentować, gdy backend będzie gotowy:
        // dispatch(logout());
        // router.push("/login");
        console.log("Wylogowanie - funkcja tymczasowa, backend nie jest gotowy");
    };

    const handleEditData = () => {
        router.push("/editData");
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
                {t("welcome")}
            </Text>

            {user.name && (
                <Text style={[styles.subtitle, { color: theme.colors.textPrimary }]}>
                    {t("hello_user", { name: user.name })}
                </Text>
            )}
            <View style={styles.buttonContainer}>
                <Button title={t("edit_data")} onPress={handleEditData} />
                <Button title={t("logout")} onPress={handleLogout} />
            </View>

            {/* <View style={styles.buttonContainer}>
                <ThemeSwitcher />
                <LanguageSwitcher />
            </View> */}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        textAlign: "center",
        fontSize: 24,
        marginBottom: 20,
    },
    subtitle: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    }
});
