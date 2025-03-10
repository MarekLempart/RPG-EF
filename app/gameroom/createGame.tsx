// app/gameroom/createGame.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import * as Clipboard from "expo-clipboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";

const screenWidth = Dimensions.get("window").width;

const CreateGameScreen = (): JSX.Element => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const router = useRouter();

    const [gameName, setGameName] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [invitations, setInvitations] = useState([{ playerName: "" }]);

    const processGameName = (name: string): string => {
        const words = name.trim().split(/\s+/).slice(0, 3);
        let processed = words.join("_");
        if (processed.length > 20) {
        processed = processed.slice(0, 20);
        }
        return processed;
    };

    const generateRandomNumber = (digits: number): string => {
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        return Math.floor(Math.random() * (max - min + 1) + min).toString();
    };

    const handleGenerateCode = () => {
        if (!gameName.trim()) {
            Toast.show({
                type: "error",
                text1: t("error"),
                text2: t("game_name_empty")
            });
            return;
        }
        const processedName = processGameName(gameName);
        const random5 = generateRandomNumber(5);
        const random8 = generateRandomNumber(8);
        const code = `${processedName}-KOD: ${random5}-${random8}`;
        setGeneratedCode(code);
        Toast.show({
            type: "success",
            text1: t("success"),
            text2: t("code_generated")
        });
    };

    const handleSaveCode = async () => {
        if (!generatedCode.trim()) {
            Toast.show({
                type: "error",
                text1: t("error"),
                text2: t("code_empty")
            });
            return;
        }
        Clipboard.setStringAsync(generatedCode);
        Toast.show({
            type: "success",
            text1: t("success"),
            text2: t("code_saved")
        });
    };

    const handleSendInvitation = (index: number) => {
        Toast.show({
            type: "info",
            text1: t("invitation_sent"),
            text2: `${invitations[index].playerName}`
        });
        console.log("Wysyłanie zaproszenia do:", invitations[index].playerName);
    };

    const handleAddInvitationRow = () => {
        setInvitations([...invitations, { playerName: "" }]);
    };

    const handleCreateGame = () => {
        if (!gameName.trim() || !generatedCode.trim()) {
            Toast.show({
                type: "error",
                text1: t("error"),
                text2: t("fill_all_fields")
            });
            return;
        }
        Toast.show({
            type: "success",
            text1: t("success"),
            text2: t("game_created")
        });
        console.log("Creating game:", gameName, "code:", generatedCode, "invitations:", invitations);
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.colors.bgPrimary }}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
                    {t("new_game")}
                </Text>
                <TextInput
                    style={[
                        styles.input,
                        {
                            backgroundColor: theme.colors.inputBackground,
                            borderColor: theme.colors.inputBorder,
                            color: theme.colors.textPrimary,
                        },
                    ]}
                    placeholder={t("game_name_placeholder")}
                    placeholderTextColor={theme.colors.textSecondary}
                    value={gameName}
                    onChangeText={setGameName}
                />
                <View style={styles.codeRow}>
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            icon={
                                <MaterialCommunityIcons
                                    name="key"
                                    size={24}
                                    color={theme.colors.textOnButton}
                                />
                            }
                            onPress={handleGenerateCode}
                            theme={theme}
                        />
                    </View>
                    <View style=
                        {[styles.codeOutputContainer,
                        {
                            backgroundColor: theme.colors.inputBackground,
                            borderColor: theme.colors.inputBorder,
                        },
                    ]}>
                        <Text style={{
                            color: theme.colors.textPrimary
                        }}>
                            {generatedCode}
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            icon={
                                <MaterialCommunityIcons
                                    name="content-save"
                                    size={24}
                                    color={theme.colors.textOnButton}
                                />
                            }
                            onPress={handleSaveCode}
                            theme={theme}
                        />
                    </View>
                </View>
                <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
                    {t("invite_players")}
                </Text>
                {invitations.map((invitation, index) => (
                    <View key={index} style={styles.invitationRow}>
                        <TextInput
                            style={[
                                styles.invitationInput,
                                {
                                    backgroundColor: theme.colors.inputBackground,
                                    borderColor: theme.colors.inputBorder,
                                    color: theme.colors.textPrimary,
                                },
                            ]}
                            placeholder={t("player_name_placeholder")}
                            placeholderTextColor={theme.colors.textSecondary}
                            value={invitation.playerName}
                            onChangeText={(text) => {
                                const newInvitations = [...invitations];
                                newInvitations[index].playerName = text;
                                setInvitations(newInvitations);
                            }}
                        />
                        <CustomButton
                            title={t("send_invitation")}
                            onPress={() => handleSendInvitation(index)}
                            theme={theme}
                        />
                    </View>
                ))}
                <View style={styles.addPlayerButton}>
                    <CustomButton
                        title={t("next_player")}
                        onPress={handleAddInvitationRow}
                        theme={theme}
                    />
                </View>
                <View style={styles.bottomRow}>
                    <View style={styles.bottomButton}>
                        <CustomButton
                            title={t("create_game")}
                            onPress={handleCreateGame}
                            theme={theme}
                        />
                        <CustomButton
                            title={t("back")}
                            onPress={() => router.back()}
                            theme={theme}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default CreateGameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 150,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    codeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    codeOutputContainer: {
        flex: 2,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    invitationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    invitationInput: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    addPlayerButton: {
        marginVertical: 5,
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        marginTop: 30,
        bottom: 80,
    },
    bottomButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
        bottom: 20,
    },
});
