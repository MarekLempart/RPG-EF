// app/editData.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import axios, { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { setUser } from "@/store/slices/userSlice";
import { Picker } from "@react-native-picker/picker";
import LogoutButton from "@/components/LogoutButton";

const EditDataScreen = (): JSX.Element => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const [firstName, setFirstName] = useState<string>(user.firstName || "");
    const [lastName, setLastName] = useState<string>(user.lastName || "");
    const [email, setEmail] = useState<string>(user.email || "");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<"gm" | "player">(user.role || "player");
    const [avatarUri, setAvatarUri] = useState<string>(user.avatar || "");;

    const isValidEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPassword = (password: string): boolean => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
    };

    const validateForm = (): boolean => {
        if (firstName.trim().length < 3) {
            Toast.show({
                type: "error",
                text1: t("update_data_error"),
                text2: t("First name must be at least 3 characters")
            });
            return false;
        }
        if (lastName.trim().length < 3) {
            Toast.show({
                type: "error",
                text1: t("update_data_error"),
                text2: t("Last name must be at least 3 characters")
            });
            return false;
        }
        if (!isValidEmail(email)) {
            Toast.show({
                type: "error",
                text1: t("update_data_error"),
                text2: t("Please enter a valid email address")
            });
            return false;
        }
        if (password && !isValidPassword(password)) {
            Toast.show({
                type: "error",
                text1: t("update_data_error"),
                text2: t("Password must be at least 6 characters long and include uppercase, lowercase and a number")
            });
            return false;
        }
        return true;
    };

    const pickImage = async (): Promise<void> => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(t("permission_denied"), t("media_library_permission"));
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [600, 750],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setAvatarUri(result.assets[0].uri);
            // Propozycja zapisu lokalnego oraz wysyłki na serwer:
            // await saveAvatarToLocalStorage(result.uri);
            // await uploadAvatarToServer(result.uri);
        }
    };

    const handleUpdateData = async (): Promise<void> => {
        if (!validateForm()) {
            return;
        }
        try {
            const updatePayload = {
                firstName,
                lastName,
                email,
                role,
                avatar: avatarUri,
                ...(password ? { password } : {})
            };

            const response = await axios.patch("http://localhost:5100/api/auth/update", updatePayload, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            const updatedUser = response.data.user;
            dispatch(
                setUser({
                    id: updatedUser._id,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    role: updatedUser.role,
                    avatar: updatedUser.avatar,
                    token: user.token,
                })
            );
            Toast.show({
                type: "success",
                text1: t("success"),
                text2: t("Data updated successfully")
            });
            router.push("/(tabs)");
        } catch (error) {
            const err = error as AxiosError;
            console.error("Update error:", err.response?.data || err.message);
            Toast.show({
                type: "error",
                text1: t("update_data_error"),
                text2: (err.response?.data as { message?: string })?.message || "Failed to update data"
            });
        }
    };

return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
        <Text style={[styles.greeting, { color: theme.colors.textPrimary }]}>
            {t("hello_user", { name: `${firstName} ${lastName}` || "" })}
        </Text>
        <View style={styles.profileContainer}>
            <TouchableOpacity onPress={pickImage}>
                {avatarUri ? (
                    <Image source={{ uri: avatarUri }} style={styles.avatar} />
                ) : (
                    <Image source={require("@/assets/images/avatar-placeholder.png")} style={styles.avatar} />
                )}
        </TouchableOpacity>
        <View style={styles.infoContainer}>
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: theme.colors.inputBackground,
                        borderColor: theme.colors.inputBorder,
                        color: theme.colors.textPrimary,
                    }]}
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
                    }]}
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
                    }]}
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
                placeholder={`${t("password")} (${t("optional")})`}
                placeholderTextColor={theme.colors.textSecondary}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Text style={[styles.roleText, { color: theme.colors.textPrimary }]}>
                {t("preferred_role")}: {role === "gm" ? t("game_master") : t("player")}
            </Text>
            <Picker
                selectedValue={role}
                onValueChange={(itemValue: "gm" | "player") => setRole(itemValue)}
                style={[
                    styles.input,
                    {
                        backgroundColor: theme.colors.inputBackground,
                        color: theme.colors.textPrimary,
                        borderColor: theme.colors.inputBorder,
                    },
                ]}
                dropdownIconColor={theme.colors.textPrimary}
            >
                <Picker.Item label={t("game_master")} value="gm" />
                <Picker.Item label={t("player")} value="player" />
            </Picker>
        </View>
    </View>
        <View style={styles.bottomButtons}>
            <Button title={t("update_data")} onPress={handleUpdateData} />
            <LogoutButton />
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
    picker: {
        height: 40,
        fontSize: 14,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    roleText: {
        fontSize: 16,
        marginBottom: 10,
    },
    bottomButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: '100%',
        marginTop: 20,
        position: "absolute",
        bottom: 80,
    },
});
