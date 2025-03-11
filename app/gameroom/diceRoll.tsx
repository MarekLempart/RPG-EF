// app/gameroom/diceRoll.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import DicePool from "@/components/DicePool";
import TypeInput from "@/components/TypeInput";
import CustomDiceSelector from "@/components/CustomDiceSelector";
import HandActions from "@/components/HandActions";
import RollActions from "@/components/RollActions";
import { useDiceRoll } from "@/hooks/useDiceRoll";

export default function DiceRollScreen() {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const router = useRouter();
    const {
        dicePool,
        setDicePool,
        typeOfDiceRoll,
        setTypeOfDiceRoll,
        rollHistory,
        currentRollIndex,
        setCurrentRollIndex,
        canPush,
        hasPushed,
        handleDicePress,
        handleRoll,
        handlePushRoll,
        handleNoPush,
        handlePreviousRoll,
        handleNextRoll,
        currentRoll,
        changeSelectedDiceSize,
        handleApplyCustomDiceSize,
        selectedCustomDiceSize,
        setSelectedCustomDiceSize,
        handleParry,
        handleAttack,
        handleInventory,
        handleTalent,
        handleSkill,
        handleClearDice,
        d66Mode,
    } = useDiceRoll(theme, t);

    // Funkcja zaznaczająca wszystkie kości danej kategorii
    const handleSelectAll = (category: "attribute" | "skill" | "weapon") => {
        setDicePool((prev) =>
            prev.map((d) => (d.category === category ? { ...d, active: true } : d))
        );
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
            {/* Zestaw kości (Dice Pool) */}
            <DicePool
                dicePool={dicePool}
                onDicePress={handleDicePress}
                onSelectAll={handleSelectAll}
                theme={theme}
                t={t}
                d66Mode={d66Mode}
            />

            {/* Pole tekstowe: Type of Dice Roll */}
            <TypeInput
                label={t("type_of_dice_roll")}
                placeholder={t("type_of_dice_roll_placeholder")}
                value={typeOfDiceRoll}
                onChangeText={setTypeOfDiceRoll}
                theme={theme}
            />

            {/* Wybór kości niestandardowych (Custom Dice) */}
            <CustomDiceSelector
                onSelectDiceSize={changeSelectedDiceSize}
                theme={theme}
                t={t}
                d66Mode={d66Mode}
            />

            {/* Wybór testu – akcje związane z użyciem przedmiotu, talentu lub umiejętności */}
            <HandActions
                onParry={handleParry}
                onAttack={handleAttack}
                onInventory={handleInventory}
                onTalent={handleTalent}
                onSkill={handleSkill}
                theme={theme}
                t={t}
            />

            {/* Wykonanie rzutu/przerzutu i wyświetlenie sukcesów */}
            <RollActions
                canPush={canPush}
                hasPushed={hasPushed}
                onRoll={handleRoll}
                onPushRoll={handlePushRoll}
                onNoPush={handleNoPush}
                onPreviousRoll={handlePreviousRoll}
                onNextRoll={handleNextRoll}
                currentRoll={currentRoll}
                theme={theme}
                t={t}
                router={router}
                handleClearDice={handleClearDice}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});
