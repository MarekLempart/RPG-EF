// components/DicePool.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { ThemeType } from "@/styles/theme.types";
import { TFunction } from "i18next";

export type DiceData = {
    id: number;
    category: "attribute" | "skill" | "weapon";
    size: number;
    active: boolean;
    value?: number;
};

export type DicePoolProps = {
    dicePool: DiceData[];
    onDicePress: (diceId: number) => void;
    onSelectAll: (category: "attribute" | "skill" | "weapon") => void;
    theme: ThemeType;
    t: TFunction;
    d66Mode: boolean;
};

const DicePool = ({ dicePool, onDicePress, onSelectAll, theme, t, d66Mode }: DicePoolProps) => {
    // Grupowanie kostek wg kategorii – ustalam:
    // - attribute: kolumny 0-1 (2 kolumny x 4 wiersze = 8 kostek)
    // - skill: kolumny 2-4 (3 kolumny x 4 wiersze = 12 kostek)
    // - weapon: kolumna 5 (1 kolumna x 4 wiersze = 4 kostki)
    const attributes = dicePool.filter((d) => d.category === "attribute");
    const skills = dicePool.filter((d) => d.category === "skill");
    const weapons = dicePool.filter((d) => d.category === "weapon");

    // Funkcja pomocnicza dzieląca tablicę na wiersze o zadanej liczbie elementów
    const chunkArray = <T,>(arr: T[], chunkSize: number): T[][] => {
        const result: T[][] = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    // Ustalanie koloru dla pojedynczej kostki na podstawie kategorii i stanu aktywności
    const getDiceBackground = (dice: DiceData): string => {
        if (d66Mode) {
            return theme.colors.accent;
        }
        if (dice.category === "attribute") {
            return dice.active ? theme.colors.diceFeatureSelected : theme.colors.colDiceFeatureUnselected;
        } else if (dice.category === "skill") {
            return dice.active ? theme.colors.diceAbilitySelected : theme.colors.colDiceAbilityUnselected;
        } else if (dice.category === "weapon") {
            return dice.active ? theme.colors.diceItemSelected : theme.colors.colDiceItemUnselected;
        }
            return "#ccc";
    };

    // Tło sekcji danej kategorii
    const getContainerBackground = (category: "attribute" | "skill" | "weapon"): string => {
        if (category === "attribute") {
            return theme.colors.colDiceContainerAttribute;
        } else if (category === "skill") {
            return theme.colors.colDiceContainerSkill;
        } else if (category === "weapon") {
            return theme.colors.colDiceContainerItem;
        }
            return theme.colors.bgSecondary;
    };

    // Ikony nagłówka sekcji
    const getCategoryIcon = (category: "attribute" | "skill" | "weapon"): string => {
        if (category === "attribute") return "💪";
        if (category === "skill") return "🧠";
        if (category === "weapon") return "🦾";
        return "";
    };

    // Render sekcji dla danej kategorii – columns określają liczbę kolumn
    const renderCategorySection = (category: "attribute" | "skill" | "weapon", diceList: DiceData[], columns: number) => {
        const rows = chunkArray(diceList, columns);
        return (
            <View style={[styles.sectionContainer, { backgroundColor: getContainerBackground(category) }]}>
                {/* Nagłówek sekcji */}
                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionIcon, { color: theme.colors.textPrimary }]}>{getCategoryIcon(category)}</Text>
                </View>
                {/* Siatka kostek */}
                <View style={styles.diceGrid}>
                    {rows.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.diceRow}>
                            {row.map((dice) => (
                                <TouchableOpacity
                                    key={dice.id}
                                    style={[
                                        styles.dice,
                                        {
                                            backgroundColor: getDiceBackground(dice),
                                            borderColor: theme.colors.inputBorder,
                                        },
                                    ]}
                                    onPress={() => {
                                        if (!d66Mode) onDicePress(dice.id);
                                    }}
                                >
                                    <Text style={{ color: theme.colors.textPrimary }}>
                                        {dice.value !== undefined ? dice.value : `D${dice.size}`}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            {/* Wyrównanie: uzupełnienie pustymi widokami, jeśli w wierszu jest mniej elementów */}
                            {row.length < columns &&
                                Array.from({ length: columns - row.length }).map((_, idx) => (
                                    <View key={idx} style={[styles.dice, { opacity: 0 }]} />
                                ))}
                        </View>
                    ))}
                </View>
                    {/* Stopka sekcji */}
                    {/* <View style={styles.sectionFooter}>
                        {category === "weapon" ? (
                            <Pressable onPress={() => onSelectAll(category)} style={styles.footerButton}>
                                <Text style={[styles.footerText, { color: theme.colors.textPrimary }]}>✅</Text>
                            </Pressable>
                        ) : (
                            <Pressable onPress={() => onSelectAll(category)} style={styles.footerButton}>
                                <Text style={[styles.footerText, { color: theme.colors.textPrimary }]}>{t("select_all")}</Text>
                            </Pressable>
                    )   }
                    </View> */}
                <View style={styles.sectionFooter}>
                        <Pressable onPress={() => onSelectAll(category)} style={styles.footerButton}>
                            <Text style={[styles.footerText, { color: theme.colors.textPrimary }]}>✅</Text>
                        </Pressable>
                </View>
            </View>
        );
    };

    return (
        <View>
            {/* Nagłówek głównej sekcji */}
            <View style={styles.mainHeader}>
                <Text style={[styles.mainHeaderText, { color: theme.colors.textPrimary }]}>
                    🎲 {t("dice_pool_title")}
                </Text>
            </View>
            <View style={styles.setDice}>
                {renderCategorySection("attribute", attributes, 2)}
                {renderCategorySection("skill", skills, 3)}
                {renderCategorySection("weapon", weapons, 1)}
            </View>        
        </View>
    );
};

const styles = StyleSheet.create({
    setDice: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        height: 290,
        marginTop: 0,
        marginBlock: 0,
    },
    mainHeader: {
        padding: 5,
        alignItems: "center",
    },
    mainHeaderText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    sectionContainer: {
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 8,
        padding: 5,
        // Efekt cienia dla iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        // Efekt cienia dla Android
        elevation: 3,
    },
    sectionHeader: {
        alignItems: "center",
        marginBottom: 5,
    },
    sectionIcon: {
        fontSize: 26,
    },
    diceGrid: {
        margin: 1,
    },
    diceRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 2,
    },
    dice: {
        width: 36,
        height: 36,
        // padding: 5,
        margin: 4,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    sectionFooter: {
        alignItems: "center",
        marginTop: 5,
    },
    footerButton: {
        padding: 5,
    },
    footerText: {
        fontSize: 16,
    },
});

export default DicePool;
