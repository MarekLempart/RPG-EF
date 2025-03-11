// components/HandActions.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeType } from "@/styles/theme.types";
import { TFunction } from "i18next";
import CustomButton from "@/components/CustomButton";

type HandActionsProps = {
    onParry: (hand: "left" | "right") => void;
    onAttack: (hand: "left" | "right") => void;
    onInventory: (hand: "left" | "right") => void;
    onTalent: () => void;
    onSkill: () => void;
    theme: ThemeType;
    t: TFunction;
};

const HandActions = ({ onParry, onAttack, onInventory, onTalent, onSkill, theme, t }: HandActionsProps) => {
    return (
        <>
            <View style={styles.handRow}>
                <View style={styles.handButton}>
                    <TouchableOpacity style={styles.handSegment} onPress={() => onParry("left")}>
                        <Text style={styles.handSegmentText}>🛡️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.handSegment} onPress={() => onInventory("left")}>
                        <Text style={[styles.handSegmentText, { color: theme.colors.textPrimary }]}>{t("hand_item")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.handSegment} onPress={() => onAttack("left")}>
                        <Text style={styles.handSegmentText}>⚔️</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.handButton}>
                    <TouchableOpacity style={styles.handSegment} onPress={() => onParry("right")}>
                        <Text style={styles.handSegmentText}>🛡️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.handSegment} onPress={() => onInventory("right")}>
                        <Text style={[styles.handSegmentText, { color: theme.colors.textPrimary }]}>{t("hand_item")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.handSegment} onPress={() => onAttack("right")}>
                        <Text style={styles.handSegmentText}>⚔️</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.talentSkillRow}>
                <CustomButton
                    title={t("talent")}
                    onPress={onTalent}
                    theme={theme}
                />
                <CustomButton
                    title={t("skill")}
                    onPress={onSkill}
                    theme={theme}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    handRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 0,
    },
    handButton: {
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#ccc",
        overflow: "hidden",
    },
    handSegment: {
        padding: 7,
        borderRightWidth: 1,
        borderRightColor: "#ccc",
    },
    handSegmentText: {
        fontSize: 16,
    },
    talentSkillRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 5,
    },
});

export default HandActions;
