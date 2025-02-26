import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

interface StepProps {
  name: string;
  setName: (value: string) => void;
  nextStep: () => void;
}

const Step1: React.FC<StepProps> = ({ name, setName, nextStep }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <View>
        <Text style={styles.title}>Choose Your Game System</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Button title="Next" onPress={nextStep} />
      </View>
    </View>
  );
};

export default Step1;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, marginBottom: 10 },
  input: { width: "80%", borderWidth: 1, padding: 10, marginBottom: 10 },
});
