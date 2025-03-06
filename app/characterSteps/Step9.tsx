import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setBigDream } from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";

const Step9 = () => {
  const dispatch = useDispatch();
  const bigDream = useSelector((state: RootState) => state.character.bigDream);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Big Dream</Text>
      <TextInput
        style={styles.input}
        value={bigDream}
        onChangeText={(text) => dispatch(setBigDream(text))}
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

export default Step9;
