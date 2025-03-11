    // app/gameroom/diceRoll.tsx
    import React, { useState } from "react";
    import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    } from "react-native";
    import { useTheme } from "@/contexts/ThemeContext";
    import { useTranslation } from "react-i18next";
    import { useRouter } from "expo-router";
    import Toast from "react-native-toast-message";

    /**
     * Typ pomocniczy do przechowywania informacji o pojedynczej kości.
     */
    type DiceData = {
    id: number;
    category: "attribute" | "skill" | "weapon";
    size: number;            // D6, D8, D10, D12, D66
    active: boolean;         // Czy kość jest zaznaczona/wybrana
    value?: number;          // Wylosowana wartość
    colorActive: string;     // Kolor, gdy kość jest aktywna
    colorInactive: string;   // Kolor, gdy kość jest nieaktywna
    };

    export default function DiceRollScreen() {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const router = useRouter();

    // Stan główny: pula kości
    const [dicePool, setDicePool] = useState<DiceData[]>(() =>
        generateInitialDicePool(theme)
    );

    // Typ rzutu (tekst w polu "Type of Dice Roll")
    const [typeOfDiceRoll, setTypeOfDiceRoll] = useState("");

    // Historia wszystkich wykonanych rzutów (dla przeglądania poprzednich/następnych)
    const [rollHistory, setRollHistory] = useState<any[]>([]);
    const [currentRollIndex, setCurrentRollIndex] = useState(-1);

    // Czy można jeszcze forsować rzut
    const [canPush, setCanPush] = useState(false);
    const [hasPushed, setHasPushed] = useState(false);

    /**
     * Funkcja do zaznaczania/odznaczania danej kości.
     */
    const handleDicePress = (diceId: number) => {
        setDicePool((prev) =>
        prev.map((d) =>
            d.id === diceId ? { ...d, active: !d.active, value: undefined } : d
        )
        );
    };

    /**
     * Wykonanie rzutu (Roll):
     * - Losuje wartości na wszystkich aktywnych kościach
     * - Oblicza sukcesy
     * - Zapisuje wynik w historii
     * - Umożliwia (na razie) jednorazowe forsowanie
     */
    const handleRoll = () => {
        // Rzucamy tylko na aktywnych kościach
        const newDicePool = dicePool.map((d) => {
        if (d.active) {
            const value = rollSingleDice(d.size);
            return { ...d, value };
        }
        return d;
        });

        setDicePool(newDicePool);

        // Oblicz sukcesy
        const successes = newDicePool.reduce((acc, d) => {
        if (d.active && d.value !== undefined) {
            return acc + computeSuccesses(d.size, d.value);
        }
        return acc;
        }, 0);

        // Zapis w historii
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

        // Ustawienie możliwości forsowania
        setCanPush(true);
        setHasPushed(false);

        Toast.show({
        type: "success",
        text1: t("dice_roll_completed"),
        text2: t("total_successes", { count: successes }),
        });
    };

    /**
     * Forsowanie rzutu (Push):
     * - Rzuca ponownie kości, które nie dały sukcesu
     * - Aktualizuje historię
     */
    const handlePushRoll = () => {
        if (!canPush || hasPushed) {
        return;
        }

        const newDicePool = dicePool.map((d) => {
        if (d.active && d.value !== undefined) {
            const s = computeSuccesses(d.size, d.value);
            // Przerzucamy tylko kości bez sukcesu
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

    /**
     * Anulowanie forsowania (przycisk "Don't Push")
     */
    const handleNoPush = () => {
        setCanPush(false);
        setHasPushed(false);
    };

    /**
     * Nawigacja w historii (poprzedni rzut)
     */
    const handlePreviousRoll = () => {
        if (currentRollIndex > 0) {
        setCurrentRollIndex(currentRollIndex - 1);
        }
    };

    /**
     * Nawigacja w historii (następny rzut)
     */
    const handleNextRoll = () => {
        if (currentRollIndex < rollHistory.length - 1) {
        setCurrentRollIndex(currentRollIndex + 1);
        }
    };

    const currentRoll = currentRollIndex >= 0 ? rollHistory[currentRollIndex] : null;

    // Obsługa parowania, ataku, ekwipunku, talentów, umiejętności
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

    /**
     * Zmiana wybranej (aktywnej) kości na inny rozmiar (np. D8, D10, D12, D66)
     */
    const changeSelectedDiceSize = (size: number) => {
        // Znajdujemy pierwszą aktywną kość
        const firstActive = dicePool.find((d) => d.active);
        if (!firstActive) {
        Toast.show({
            type: "error",
            text1: t("no_dice_selected"),
        });
        return;
        }
        // Zmieniamy jej rozmiar
        setDicePool((prev) =>
        prev.map((d) =>
            d.id === firstActive.id
            ? { ...d, size, value: undefined }
            : d
        )
        );
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}>
        <Text style={[styles.header, { color: theme.colors.textPrimary }]}>
            {t("dice_pool_roll")}
        </Text>

        {/* Siatka kości (6 kolumn × 4 wiersze) */}
        <View style={styles.diceGrid}>
            {dicePool.map((dice) => (
            <TouchableOpacity
                key={dice.id}
                style={[
                styles.dice,
                {
                    backgroundColor: dice.active ? dice.colorActive : dice.colorInactive,
                    borderColor: theme.colors.inputBorder,
                },
                ]}
                onPress={() => handleDicePress(dice.id)}
            >
                {/* Jeśli kość nie jest rzucona, wyświetlamy np. jej rozmiar (6,8,10,12,66). Jeśli jest – wartość. */}
                <Text style={{ color: theme.colors.textPrimary }}>
                {dice.value !== undefined ? dice.value : `D${dice.size}`}
                </Text>
            </TouchableOpacity>
            ))}
        </View>

        {/* Typ rzutu (pole tekstowe) */}
        <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
            {t("type_of_dice_roll")}
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
            placeholder={t("type_of_dice_roll_placeholder")}
            placeholderTextColor={theme.colors.textSecondary}
            value={typeOfDiceRoll}
            onChangeText={setTypeOfDiceRoll}
        />

        {/* Custom dice (D8, D10, D12, D66) */}
        <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
            {t("custom_dice")}
        </Text>
        <View style={styles.customDiceRow}>
            <TouchableOpacity onPress={() => changeSelectedDiceSize(8)}>
            <Text style={[styles.customDiceButton, { backgroundColor: theme.colors.accent }]}>D8</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeSelectedDiceSize(10)}>
            <Text style={[styles.customDiceButton, { backgroundColor: theme.colors.accent }]}>D10</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeSelectedDiceSize(12)}>
            <Text style={[styles.customDiceButton, { backgroundColor: theme.colors.accent }]}>D12</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeSelectedDiceSize(66)}>
            <Text style={[styles.customDiceButton, { backgroundColor: theme.colors.accent }]}>D66</Text>
            </TouchableOpacity>
        </View>

        {/* Lewa i prawa ręka */}
        <View style={styles.handRow}>
            {/* Lewa ręka */}
            <View style={styles.handButton}>
            <TouchableOpacity style={styles.handSegment} onPress={() => handleParry("left")}>
                <Text style={styles.handSegmentText}>🛡️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.handSegment} onPress={() => handleInventory("left")}>
                <Text style={[styles.handSegmentText, { color: theme.colors.textPrimary  }]}>{t("hand_item")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.handSegment} onPress={() => handleAttack("left")}>
                <Text style={styles.handSegmentText}>⚔️</Text>
            </TouchableOpacity>
            </View>
            {/* Prawa ręka */}
            <View style={styles.handButton}>
            <TouchableOpacity style={styles.handSegment} onPress={() => handleParry("right")}>
                <Text style={styles.handSegmentText}>🛡️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.handSegment} onPress={() => handleInventory("right")}>
                <Text style={[styles.handSegmentText, { color: theme.colors.textPrimary  }]}>{t("hand_item")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.handSegment} onPress={() => handleAttack("right")}>
                <Text style={styles.handSegmentText}>⚔️</Text>
            </TouchableOpacity>
            </View>
        </View>

        {/* Talent / Skill */}
        <View style={styles.talentSkillRow}>
            <Button title={t("talent")} onPress={handleTalent} />
            <Button title={t("skill")} onPress={handleSkill} />
        </View>

        {/* Dolny wiersz: strzałki (poprzedni/następny) i Roll / Push */}
        <View style={styles.bottomRow}>
            <TouchableOpacity onPress={handlePreviousRoll}>
            <Text style={[styles.arrowButton, { color: theme.colors.textPrimary }]}>{"<"}</Text>
            </TouchableOpacity>

            {!canPush ? (
            <Button title={t("roll")} onPress={handleRoll} />
            ) : !hasPushed ? (
            <>
                <Button title={t("push_roll")} onPress={handlePushRoll} />
                <Button title={t("dont_push")} onPress={handleNoPush} />
            </>
            ) : (
            <Text style={[styles.infoText, { color: theme.colors.textPrimary }]}>
                {t("roll_completed")}
            </Text>
            )}

            <TouchableOpacity onPress={handleNextRoll}>
            <Text style={[styles.arrowButton, { color: theme.colors.textPrimary }]}>{">"}</Text>
            </TouchableOpacity>
        </View>

        {/* Wyświetlanie aktualnego wyniku rzutu z historii (jeśli istnieje) */}
        {currentRoll && (
            <View style={styles.rollResult}>
            <Text style={{ color: theme.colors.textPrimary }}>
                {t("roll_result", { count: currentRoll.totalSuccesses })}
            </Text>
            </View>
        )}

        {/* Przycisk powrotu */}
        <View style={styles.bottomNav}>
            <Button title={t("back")} onPress={() => router.back()} />
        </View>
        </ScrollView>
    );
    }

    /**
     * Generowanie startowej puli 24 kości (6 kolumn × 4 wiersze).
     * - Kolumny 0 i 1: zielone (cechy)
     * - Kolumny 2, 3, 4: niebieskie (umiejętności)
     * - Kolumna 5: czerwona (broń/przedmiot)
     * Kolory zmieniamy w zależności od motywu (dark / light).
     */
    function generateInitialDicePool(theme: any): DiceData[] {
    const diceArray: DiceData[] = [];
    let idCounter = 1;

    for (let col = 0; col < 6; col++) {
        for (let row = 0; row < 4; row++) {
        let category: "attribute" | "skill" | "weapon" = "attribute";
        let colorActive = "#007700";   // zielony
        let colorInactive = "#aaaaaa"; // wyszarzone

        if (col >= 2 && col <= 4) {
            category = "skill";
            colorActive = "#000077";   // niebieski
        } else if (col === 5) {
            category = "weapon";
            colorActive = "#770000";   // czerwony
        }

        // Przykład rozjaśniania w dark mode:
        const isDarkMode = theme.colors.bgPrimary === theme.colors.colPickledBluewood
                        || theme.colors.bgPrimary === theme.colors.colCrowBlack;
        if (isDarkMode) {
            // Rozjaśnij odcień
            if (colorActive === "#007700") colorActive = "#00cc00"; // jaśniejszy zielony
            if (colorActive === "#000077") colorActive = "#0000cc"; // jaśniejszy niebieski
            if (colorActive === "#770000") colorActive = "#cc0000"; // jaśniejszy czerwony
        }

        diceArray.push({
            id: idCounter++,
            category,
            size: 6,          // Domyślnie D6
            active: false,    // Na początku nieaktywne
            value: undefined, // Brak wylosowanej wartości
            colorActive,
            colorInactive,
        });
        }
    }
    return diceArray;
    }

    /**
     * Funkcja losująca wynik dla pojedynczej kości.
     * Obsługuje też D66 (2×D6).
     */
    function rollSingleDice(size: number): number {
    if (size === 66) {
        // Rzut 2×D6 (np. 31, 42, 66 itp.)
        const tens = Math.floor(Math.random() * 6) + 1;  // 1..6
        const ones = Math.floor(Math.random() * 6) + 1;  // 1..6
        return tens * 10 + ones;
    }
    // D6, D8, D10, D12
    return Math.floor(Math.random() * size) + 1;
    }

    /**
     * Przykładowa funkcja obliczająca liczbę sukcesów w zależności
     * od rozmiaru kości i wylosowanej wartości.
     * Można dostosować do własnych zasad Year Zero Engine.
     */
    function computeSuccesses(size: number, value: number): number {
    if (size === 6) {
        // Sukces na "6"
        return value === 6 ? 1 : 0;
    } else if (size === 8) {
        // Np. 6 lub 7 = 1 sukces, 8 = 2 sukcesy
        if (value === 8) return 2;
        if (value >= 6) return 1;
        return 0;
    } else if (size === 10) {
        // Np. 10 = 3 sukcesy, 8-9 = 2 sukces, 6-7 = 1 sukces,
        if (value === 10) return 3;
        if (value >= 8) return 2;
        if (value >= 6) return 1;
        return 0;
    } else if (size === 12) {
        // Np. 12 = 4 sukcesy, 10-11 = 3 sukcesy, 8-9 = 2 sukces, 6-7 = 1 sukces,
        if (value === 12) return 4;
        if (value >= 10) return 3;
        if (value >= 8) return 2;
        if (value >= 6) return 1;
        return 0;
    } else if (size === 66) {
        // D66 – wyniki z predziału 11-16, 21-26, 31-36, 41-46, 51-56, 61-66,
        // brak określenia sukcesów tylko podanie wyniku - kod do zmiany! 
        if (value === 66) return 5;
        if (value >= 61) return 4;
        if (value >= 56) return 3;
        if (value >= 51) return 2;
        if (value >= 46) return 1;
        return 0;
    }
    return 0;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 10,
    },
    diceGrid: {
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        height: 240,
        margin: 10,
    },
    dice: {
        width: 50,
        height: 50,
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        fontSize: 16,
        marginVertical: 5,
    },
    input: {
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
        marginBottom: 10,
    },
    customDiceRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },
    customDiceButton: {
        padding: 15,
        borderRadius: 5,
        marginHorizontal: 5,
        color: "#fff", // tekst przycisku
    },
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
        padding: 10,
        borderRightWidth: 1,
        borderRightColor: "#ccc",
    },
    handSegmentText: {
        fontSize: 16,
    },
    talentSkillRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
        alignItems: "center",
    },
    arrowButton: {
        fontSize: 24,
        paddingHorizontal: 10,
    },
    infoText: {
        fontSize: 16,
    },
    rollResult: {
        alignItems: "center",
        marginVertical: 10,
    },
    bottomNav: {
        marginVertical: 10,
        alignItems: "center",
    },
});
