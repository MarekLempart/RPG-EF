import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

interface StepProps {
  description: string;
  setDescription: (value: string) => void;
  prevStep: () => void;
  handleSubmit: () => void;
}

const Step8: React.FC<StepProps> = ({ prevStep, handleSubmit }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bio</Text>

        <Button title="Back" onPress={prevStep} />
        <Button title="Complete" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default Step8;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, marginBottom: 10 },
  input: { width: "80%", borderWidth: 1, padding: 10, marginBottom: 10 },
  buttonContainer: { flexDirection: "row", gap: 10 },
});
