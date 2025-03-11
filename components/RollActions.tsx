// components/RollActions.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Router } from "expo-router";
import { ThemeType } from "@/styles/theme.types";
import { TFunction } from "i18next";
import { RollData } from "@/hooks/useDiceRoll";
import CustomButton from "@/components/CustomButton";

type RollActionsProps = {
    canPush: boolean;
    hasPushed: boolean;
    onRoll: () => void;
    onPushRoll: () => void;
    onNoPush: () => void;
    onPreviousRoll: () => void;
    onNextRoll: () => void;
    currentRoll: RollData | null;
    theme: ThemeType;
    t: TFunction;
    router: Router;
    handleClearDice: () => void;
};

const RollActions = ({
    canPush,
    hasPushed,
    onRoll,
    onPushRoll,
    onNoPush,
    onPreviousRoll,
    onNextRoll,
    currentRoll,
    theme,
    t,
    router,
    handleClearDice,
}: RollActionsProps) => {
    const isD66Roll =
        currentRoll && currentRoll.dice.every((d) => d.size === 66);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.bottomRow}>
                    <CustomButton
                        title={"<"}
                        onPress={onPreviousRoll}
                        theme={theme}
                    />
                    {!canPush ? (
                        <>
                            <CustomButton
                                title={t("roll")}
                                onPress={onRoll}
                                theme={theme}
                            /> 
                        </>
                        ) : !hasPushed ? (
                            <>
                                <CustomButton
                                    title={t("push_roll")}
                                    onPress={onPushRoll}
                                    theme={theme}
                                />
                                <CustomButton
                                    title={t("dont_push")}
                                    onPress={onNoPush}
                                    theme={theme}
                                />
                            </>
                        ) : (
                            <>
                                <Text style={[styles.infoText, { color: theme.colors.textPrimary }]}>
                                    {t("roll_completed")}
                                </Text>
                            </>
                    )}
                    <CustomButton
                        title={">"}
                        onPress={onNextRoll}
                        theme={theme}
                    />
                </View>
                <View style={styles.rollResult}>
                    <Text style={{ color: theme.colors.textPrimary }}>
                        {currentRoll
                            ? isD66Roll
                                ? t("roll_result_d66", { count: currentRoll.totalSuccesses })
                                : t("roll_result", { count: currentRoll.totalSuccesses })
                            : t("no_roll_yet")}
                    </Text>
                </View>
            </View>
            <View style={styles.bottomNav}>
                <CustomButton
                    title={t("clear_dice")}
                    onPress={handleClearDice}
                    theme={theme}
                />
                <CustomButton
                    title={t("back")}
                    onPress={() => router.back()}
                    theme={theme}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // position: "relative",
    },
    content: {
        flex: 1,
        marginBottom: 60,
        // paddingBottom: 120,
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 5,
        alignItems: "center",
    },
    infoText: {
        fontSize: 16,
    },
    rollResult: {
        alignItems: "center",
        marginVertical: 2,
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "transparent",
    },
});

export default RollActions;
