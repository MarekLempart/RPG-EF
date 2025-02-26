import React, { useEffect, useState } from "react";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

interface Step1Props {
  gameSystem: string;
  setGameSystem: (value: string) => void;
  setting: string;
  setSetting: (value: string) => void;
  nextStep: () => void;
}

const Step1: React.FC<Step1Props> = ({
  gameSystem,
  setGameSystem,
  setting,
  setSetting,
  nextStep,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [systems, setSystems] = useState<{ label: string; value: string }[]>(
    []
  );
  const [settings, setSettings] = useState<{ label: string; value: string }[]>(
    []
  );

  // Fetch dropdown options from backend
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const systemRes = await axios.get("https://your-api.com/game-systems");
        const settingRes = await axios.get(
          "https://your-api.com/game-settings"
        );

        setSystems(
          systemRes.data.map((s: any) => ({ label: s.name, value: s.id }))
        );
        setSettings(
          settingRes.data.map((s: any) => ({ label: s.name, value: s.id }))
        );
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchOptions();
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <Text style={[styles.greeting, { color: theme.colors.textPrimary }]}>
        Choose Your Game System
      </Text>

      <Text>Choose System:</Text>
      <RNPickerSelect
        onValueChange={(value) => setGameSystem(value)}
        items={systems}
        value={gameSystem}
        placeholder={{ label: "Select a system...", value: null }}
      />

      <Text>Choose Setting:</Text>
      <RNPickerSelect
        onValueChange={(value) => setSetting(value)}
        items={settings}
        value={setting}
        placeholder={{ label: "Select a setting...", value: null }}
      />

      <Button title="Next" onPress={nextStep} />
    </View>
  );
};

export default Step1;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: { width: "80%", borderWidth: 1, padding: 10, marginBottom: 10 },
  greeting: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 10,
  },
});
