// hooks/useDiceRoll.ts
import { useState } from "react";
import Toast from "react-native-toast-message";
import { ThemeType } from "@/styles/theme.types";
import { TFunction } from "i18next";

export interface DiceData {
    id: number;
    category: "attribute" | "skill" | "weapon";
    size: number;
    active: boolean;
    value?: number;
}

export interface RollData {
    dice: DiceData[];
    totalSuccesses: number;
    typeOfDiceRoll: string;
    date: Date;
    push: boolean;
}

export function useDiceRoll(theme: ThemeType, t: TFunction) {
    // Stan główny
    const [dicePool, setDicePool] = useState<DiceData[]>(() => generateInitialDicePool());
    const [typeOfDiceRoll, setTypeOfDiceRoll] = useState<string>("");
    const [rollHistory, setRollHistory] = useState<RollData[]>([]);
    const [currentRollIndex, setCurrentRollIndex] = useState<number>(-1);
    const [canPush, setCanPush] = useState<boolean>(false);
    const [hasPushed, setHasPushed] = useState<boolean>(false);
    const [selectedCustomDiceSize, setSelectedCustomDiceSize] = useState<number | null>(null);
    const [d66Mode, setD66Mode] = useState<boolean>(false);

    const handleDicePress = (diceId: number) => {
        if (d66Mode) return;
        setDicePool((prev) =>
            prev.map((d) =>
                d.id === diceId ? { ...d, active: !d.active, value: undefined } : d
            )
        );
    };

    const changeSelectedDiceSize = (size: number) => {
        if (size === 66) {
            setSelectedCustomDiceSize(66);
            setD66Mode(true);
            setDicePool(prev => prev.map(d => ({ ...d, active: false })));
            Toast.show({
                type: "info",
                text1: t("d66_mode_activated", { defaultValue: "D66 mode activated" }),
            });
            return;
        }
        setSelectedCustomDiceSize(size);
        const firstActive = dicePool.find((d) => d.active);
        if (!firstActive) {
            Toast.show({
                type: "error",
                text1: t("no_dice_selected"),
            });
            return;
        }
        setDicePool((prev) =>
            prev.map((d) =>
                d.id === firstActive.id ? { ...d, size, value: undefined } : d
            )
        );
    };

    const handleRoll = () => {
        if (d66Mode) {
            const value = rollSingleDice(66);
            const d66Dice: DiceData = { id: 0, category: "weapon", size: 66, active: true, value };
            const rollData: RollData = {
                dice: [d66Dice],
                totalSuccesses: value,
                typeOfDiceRoll,
                date: new Date(),
                push: false,
            };
            const newHistory = [...rollHistory, rollData];
            setRollHistory(newHistory);
            setCurrentRollIndex(newHistory.length - 1);
            Toast.show({
                type: "success",
                text1: t("dice_roll_completed"),
                text2: t("roll_result_d66", { count: value }),
            });
            setD66Mode(false);
            setSelectedCustomDiceSize(null);
            return;
        }
        // Normalny rzut dla pozostałych kości
        const newDicePool = dicePool.map((d) => {
            if (d.active) {
                const value = rollSingleDice(d.size);
                return { ...d, value };
            }
            return d;
        });
        setDicePool(newDicePool);
        const successes = newDicePool.reduce((acc, d) => {
            if (d.active && d.value !== undefined) {
                return acc + computeSuccesses(d.size, d.value);
            }
            return acc;
        }, 0);
        const rollData = {
            dice: newDicePool.filter((d) => d.active),
            totalSuccesses: successes,
            typeOfDiceRoll,
            date: new Date(),
            push: false,
        };
        const newHistory = [...rollHistory, rollData];
        setRollHistory(newHistory);
        setCurrentRollIndex(newHistory.length - 1);
        setCanPush(true);
        setHasPushed(false);
        Toast.show({
            type: "success",
            text1: t("dice_roll_completed"),
            text2: t("total_successes", { count: successes }),
        });
    };

    const handlePushRoll = () => {
        if (!canPush || hasPushed) {
            return;
        }
        const newDicePool = dicePool.map((d) => {
            if (d.active && d.value !== undefined) {
                const s = computeSuccesses(d.size, d.value);
                if (s === 0) {
                    const value = rollSingleDice(d.size);
                    return { ...d, value };
                }
            }
            return d;
        });
        setDicePool(newDicePool);
        const successes = newDicePool.reduce((acc, d) => {
            if (d.active && d.value !== undefined) {
                return acc + computeSuccesses(d.size, d.value);
            }
            return acc;
        }, 0);
        const rollData = {
            dice: newDicePool.filter((d) => d.active),
            totalSuccesses: successes,
            typeOfDiceRoll,
            date: new Date(),
            push: true,
        };
        const newHistory = [...rollHistory, rollData];
        setRollHistory(newHistory);
        setCurrentRollIndex(newHistory.length - 1);
        setHasPushed(true);
        Toast.show({
            type: "success",
            text1: t("dice_push_completed"),
            text2: t("total_successes", { count: successes }),
        });
    };

    const handleNoPush = () => {
        setCanPush(false);
        setHasPushed(false);
    };

    const handlePreviousRoll = () => {
        if (currentRollIndex > 0) {
            setCurrentRollIndex(currentRollIndex - 1);
        }
    };

    const handleNextRoll = () => {
        if (currentRollIndex < rollHistory.length - 1) {
            setCurrentRollIndex(currentRollIndex + 1);
        }
    };

    const handleParry = (hand: "left" | "right") => {
        const text = `${t("parry")} (${hand === "left" ? t("left_hand") : t("right_hand")})`;
        setTypeOfDiceRoll(text);
        Toast.show({
            type: "info",
            text1: text,
        });
    };

    const handleAttack = (hand: "left" | "right") => {
        const text = `${t("attack")} (${hand === "left" ? t("left_hand") : t("right_hand")})`;
        setTypeOfDiceRoll(text);
        Toast.show({
            type: "info",
            text1: text,
        });
    };

    const handleInventory = (hand: "left" | "right") => {
        Toast.show({
            type: "info",
            text1: t("inventory_clicked", { hand }),
        });
    };

    const handleTalent = () => {
        setTypeOfDiceRoll(t("talent"));
        Toast.show({
            type: "info",
            text1: t("talent"),
        });
    };

    const handleSkill = () => {
        setTypeOfDiceRoll(t("skill"));
        Toast.show({
            type: "info",
            text1: t("skill"),
        });
    };

    const handleApplyCustomDiceSize = () => {
        if (selectedCustomDiceSize == null) {
            Toast.show({
                type: "error",
                text1: "No custom dice size selected",
            });
            return;
        }
        const anyActive = dicePool.some((d) => d.active);
            if (!anyActive) {
                Toast.show({
                    type: "error",
                    text1: t("no_dice_selected"),
                });
                return;
            }
        setDicePool((prev) =>
            prev.map((d) =>
                d.active
                ? {
                    ...d,
                    size: selectedCustomDiceSize,
                    value: undefined,
                }
                : d
            )
        );
    };

    const currentRoll = currentRollIndex >= 0 ? rollHistory[currentRollIndex] : null;

    const handleClearDice = () => {
        setDicePool(prev => prev.map(d => ({ ...d, active: false, value: undefined })));
        setTypeOfDiceRoll("");
        setCanPush(false);
        setHasPushed(false);
        setD66Mode(false);
    };

    return {
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
    };
}

// Funkcje pomocnicze
function generateInitialDicePool(): DiceData[] {
    const diceArray: DiceData[] = [];
    let idCounter = 1;
    for (let col = 0; col < 6; col++) {
        for (let row = 0; row < 4; row++) {
            let category: "attribute" | "skill" | "weapon" = "attribute";
            if (col >= 2 && col <= 4) {
                category = "skill";
            } else if (col === 5) {
                category = "weapon";
            }
            diceArray.push({
                id: idCounter++,
                category,
                size: 6,
                active: false,
                value: undefined,
            });
        }
    }
    return diceArray;
}

function rollSingleDice(size: number): number {
    if (size === 66) {
        const tens = Math.floor(Math.random() * 6) + 1;
        const ones = Math.floor(Math.random() * 6) + 1;
        return tens * 10 + ones;
    }
    return Math.floor(Math.random() * size) + 1;
}

function computeSuccesses(size: number, value: number): number {
    if (size === 6) {
        return value === 6 ? 1 : 0;
    } else if (size === 8) {
        if (value === 8) return 2;
        if (value >= 6 && value <= 7) return 1;
        return 0;
    } else if (size === 10) {
        if (value === 10) return 3;
        if (value >= 8 && value <= 9) return 2;
        if (value >= 6 && value <= 7) return 1;
        return 0;
    } else if (size === 12) {
        if (value === 12) return 4;
        if (value >= 10 && value <= 11) return 3;
        if (value >= 8 && value <= 9) return 2;
        if (value >= 6 && value <= 7) return 1;
        return 0;
    } else if (size === 66) {
        return value;
    }
    return 0;
}
