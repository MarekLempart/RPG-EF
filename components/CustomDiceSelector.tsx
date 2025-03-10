// components/CustomDiceSelector.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeType } from "@/styles/theme.types";
import { TFunction } from "i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CustomDiceSelectorProps = {
    onSelectDiceSize: (size: number) => void;
    theme: ThemeType;
    t: TFunction;
    d66Mode: boolean;
};

const CustomDiceSelector = ({ onSelectDiceSize, theme, t, d66Mode }: CustomDiceSelectorProps) => {
    return (
        <View style={styles.container}>
            {/* D6 */}
            <TouchableOpacity style={styles.diceButton} onPress={() => onSelectDiceSize(6)}>
                <MaterialCommunityIcons name="dice-d6" size={40} color={theme.colors.accent} />
                <Text style={[styles.diceLabel, { color: theme.colors.textPrimary }]}>D6</Text>
            </TouchableOpacity>

            {/* D8 */}
            <TouchableOpacity style={styles.diceButton} onPress={() => onSelectDiceSize(8)}>
                <MaterialCommunityIcons name="dice-d8" size={40} color={theme.colors.accent} />
                <Text style={[styles.diceLabel, { color: theme.colors.textPrimary }]}>D8</Text>
            </TouchableOpacity>

            {/* D10 */}
            <TouchableOpacity style={styles.diceButton} onPress={() => onSelectDiceSize(10)}>
                <MaterialCommunityIcons name="dice-d10" size={40} color={theme.colors.accent} />
                <Text style={[styles.diceLabel, { color: theme.colors.textPrimary }]}>D10</Text>
            </TouchableOpacity>

            {/* D12 */}
            <TouchableOpacity style={styles.diceButton} onPress={() => onSelectDiceSize(12)}>
                <MaterialCommunityIcons name="dice-d12" size={40} color={theme.colors.accent} />
                <Text style={[styles.diceLabel, { color: theme.colors.textPrimary }]}>D12</Text>
            </TouchableOpacity>

            {/* D66 - dwie kostki D6 w różnych kolorach */}
            <TouchableOpacity style={styles.diceButton} onPress={() => onSelectDiceSize(66)}>
                <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons
                        name="dice-d6"
                        size={40}
                        color={d66Mode ? theme.colors.colJaponica : theme.colors.accent}
                    />
                    <MaterialCommunityIcons
                        name="dice-d6"
                        size={40}
                        color={d66Mode ? theme.colors.colPoloBlue : theme.colors.accent}
                    />
                </View>
                <Text style={[styles.diceLabel, { color: theme.colors.textPrimary }]}>
                    D66
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 5,
        flexWrap: "wrap",
    },
    diceButton: {
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 5,
    },
    diceLabel: {
        marginTop: 4,
        fontSize: 16,
    },
});

export default CustomDiceSelector;
