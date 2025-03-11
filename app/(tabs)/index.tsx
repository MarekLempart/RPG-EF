// app/(tabs)/index.tsx
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { RootState } from "@/store";
// import LogoutButton from "@/components/LogoutButton";
import ExitButton from "@/components/ExitButton";
import CustomButton from "@/components/CustomButton";
import { useFetchCurrentUser } from "@/hooks/useFetchCurrentUser";

const HomeScreen = (): JSX.Element => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const { fetchCurrentUser } = useFetchCurrentUser();

    useEffect(() => {
        if (user.token) {
            fetchCurrentUser();
        }
    }, [user.token]);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
            <View style={styles.header}>
                <Image 
                    source={
                        user.avatar 
                        ? { uri: user.avatar } 
                        : require("@/assets/images/avatar-placeholder.png")
                    }
                    style={styles.avatar}
                />
                <View style={styles.userInfo}>
                    <Text style={[styles.text, { color: theme.colors.textPrimary }]}>
                        {user.firstName} {user.lastName}
                    </Text>
                    <Text style={[styles.text, { color: theme.colors.textPrimary }]}>
                        {user.email}
                    </Text>
                    <Text style={[styles.text, { color: theme.colors.textPrimary }]}>
                        {t("preferred_role")}: {user.role === "gm" ? t("game_master") : t("player")}
                    </Text>
                </View>
            </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title={t("edit_data")}
                        onPress={() => router.push("/userEdit/editData")}
                        theme={theme}
                    />
                    {/* <LogoutButton /> */}
                    <ExitButton />
                </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 150,
        resizeMode: "cover",
        borderRadius: 10,
    },
    userInfo: {
        marginLeft: 20,
        justifyContent: "space-around",
        flex: 1,
    },
    text: {
        fontSize: 16,
        marginVertical: 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
        position: "absolute",
        bottom: 90,
    }
});
