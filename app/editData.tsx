// app/editData.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
// import { logout, updateUser } from "@/store/slices/userSlice"; // Przykładowe akcje do aktualizacji danych

const EditDataScreen = (): JSX.Element => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();

    // Pobranie danych użytkownika ze store
    const user = useSelector((state: RootState) => state.user);
    const [firstName, setFirstName] = useState<string>(user.name ? user.name.split(" ")[0] : "");
    const [lastName, setLastName] = useState<string>(user.name ? user.name.split(" ")[1] || "" : "");
    const [email, setEmail] = useState<string>(""); // Na razie puste, pobierane z backendu
    const [role, setRole] = useState<"gm" | "player">(user.role || "player");

    // Zarządzanie awatarem
    // Początkowy placeholder – umieść plik w assets/images/avatar-placeholder.png
    const [avatarUri, setAvatarUri] = useState<string>("");

    const pickImage = async (): Promise<void> => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(t("permission_denied"), t("media_library_permission"));
            return;
        }
        const result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [600, 750],
            quality: 1,
        });

        // Sprawdzamy, czy operacja nie została anulowana i czy mamy jakieś assety
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setAvatarUri(result.assets[0].uri);
            // Propozycja zapisu lokalnego oraz wysyłki na serwer:
            // await saveAvatarToLocalStorage(result.uri);
            // await uploadAvatarToServer(result.uri);
        }
    };

    const handleUpdateData = () => {
        console.log("Aktualizacja danych:", { firstName, lastName, email, role, avatarUri });
        // Przykładowy kod aktualizacji – odkomentować, gdy backend będzie gotowy:
        // dispatch(updateUser({ firstName, lastName, email, role, avatar: avatarUri }));
        router.back();
    };

    const handleLogout = () => {
    // Proponowany kod wylogowania – odkomentować, gdy backend będzie gotowy:
    // dispatch(logout());
    // router.push("/login");
    console.log("Wylogowanie - funkcja tymczasowa, backend nie jest gotowy");
    };

return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
        <Text style={[styles.greeting, { color: theme.colors.textPrimary }]}>
            {t("hello_user", { name: user.name || "" })}
        </Text>
        <View style={styles.profileContainer}>
            <TouchableOpacity onPress={pickImage}>
                {avatarUri ? (
                    <Image source={{ uri: avatarUri }} style={styles.avatar} />
                ) : (
                    <Image source={require("../assets/images/avatar-placeholder.png")} style={styles.avatar} />
                )}
        </TouchableOpacity>
        <View style={styles.infoContainer}>
            <TextInput
                style={[styles.input, { color: theme.colors.textPrimary, borderColor: theme.colors.textSecondary }]}
                placeholder={t("first_name")}
                placeholderTextColor={theme.colors.textSecondary}
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={[styles.input, { color: theme.colors.textPrimary, borderColor: theme.colors.textSecondary }]}
                placeholder={t("last_name")}
                placeholderTextColor={theme.colors.textSecondary}
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={[styles.input, { color: theme.colors.textPrimary, borderColor: theme.colors.textSecondary }]}
                placeholder={t("email")}
                placeholderTextColor={theme.colors.textSecondary}
                value={email}
                onChangeText={setEmail}
            />
            <Text style={[styles.roleText, { color: theme.colors.textPrimary }]}>
                {t("preferred_role")}: {role === "gm" ? t("game_master") : t("player")}
            </Text>
        </View>
    </View>
        <View style={styles.bottomButtons}>
            <Button title={t("update_data")} onPress={handleUpdateData} />
            <Button title={t("logout")} onPress={handleLogout} />
        </View>
    </View>
    );
};

export default EditDataScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    greeting: {
        fontSize: 24,
        textAlign: "center",
        marginVertical: 10,
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 20,
    },
    avatar: {
        width: 120,
        height: 150,
        resizeMode: "cover",
        borderRadius: 10,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 20,
        justifyContent: "center",
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    roleText: {
        fontSize: 16,
    },
    bottomButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 80,
        left: 0,
        right: 0,
    },
});
