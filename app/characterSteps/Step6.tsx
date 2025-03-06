import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";

const Step6 = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.character.items);

  const handleInputChange = (
    field: "weapons" | "armor" | "gear",
    value: string
  ) => {
    dispatch(setItems({ ...items, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Items</Text>

      <Text style={styles.label}>Weapons</Text>
      <TextInput
        style={styles.input}
        value={items.weapons}
        onChangeText={(text) => handleInputChange("weapons", text)}
        multiline
      />

      <Text style={styles.label}>Armor</Text>
      <TextInput
        style={styles.input}
        value={items.armor}
        onChangeText={(text) => handleInputChange("armor", text)}
        multiline
      />

      <Text style={styles.label}>Gear</Text>
      <TextInput
        style={styles.input}
        value={items.gear}
        onChangeText={(text) => handleInputChange("gear", text)}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    minHeight: 40,
    textAlignVertical: "top",
  },
});

export default Step6;
