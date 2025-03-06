import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setAppearance } from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";

const Step7 = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const appearance = useSelector(
    (state: RootState) => state.character.appearance
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Appearance</Text>
      <TextInput
        style={styles.input}
        value={appearance}
        onChangeText={(text) => dispatch(setAppearance(text))}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    minHeight: 40,
    textAlignVertical: "top",
  },
});

export default Step7;
