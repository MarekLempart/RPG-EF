import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setHistory } from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";

const Step8 = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.character.history);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <TextInput
        style={[styles.input, { color: theme.colors.textPrimary }]}
        value={history}
        onChangeText={(text) => dispatch(setHistory(text))}
        multiline
        placeholder={t("history_placeholder")}
        placeholderTextColor={theme.colors.textSecondary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 5,
  },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    minHeight: "60%",
    textAlignVertical: "top",
  },
});

export default Step8;
