import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

interface StepProps {
  description: string;
  setDescription: (value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step5: React.FC<StepProps> = ({
  description,
  setDescription,
  nextStep,
  prevStep,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <View style={styles.container}>
        <Text style={[styles.greeting, { color: theme.colors.textPrimary }]}>
          Talents
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.buttonContainer}>
          <Button title="Back" onPress={prevStep} />
          <Button title="Next" onPress={nextStep} />
        </View>
      </View>
    </View>
  );
};

export default Step5;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: { width: "80%", borderWidth: 1, padding: 10, marginBottom: 10 },
  buttonContainer: { flexDirection: "row", gap: 10 },
  greeting: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 10,
  },
});
