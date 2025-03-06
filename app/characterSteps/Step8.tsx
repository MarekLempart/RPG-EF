import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setHistory } from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";

const Step8 = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.character.history);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Character History</Text>
      <TextInput
        style={styles.input}
        value={history}
        onChangeText={(text) => dispatch(setHistory(text))}
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

export default Step8;
