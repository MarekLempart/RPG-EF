import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { setRPGSystem } from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";

const Step1 = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const RPGSystem = useSelector(
    (state: RootState) => state.character.RPGSystem
  );

  // State for DropDownPicker
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Year Zero Engine", value: "Year Zero Engine" },
  ]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
        {t("choose_rpg_system")}
      </Text>
      <DropDownPicker
        open={open}
        value={RPGSystem} // Controlled by Redux
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          const newValue =
            typeof callback === "function" ? callback(RPGSystem) : callback;
          dispatch(setRPGSystem(newValue)); // Ensure Redux gets a string
        }}
        setItems={setItems}
        placeholder={t("choose_rpg_system")}
        containerStyle={styles.dropdownContainer}
        style={[
          styles.dropdown,
          {
            backgroundColor: theme.colors.bgPrimary,
            borderColor: theme.colors.textSecondary,
          },
        ]}
        textStyle={{ color: theme.colors.textPrimary }}
        dropDownContainerStyle={{
          backgroundColor: theme.colors.bgPrimary,
          borderColor: theme.colors.textSecondary,
        }}
      />

      <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
        {t("choose_setting")}
      </Text>
      <TextInput
        placeholder={t("choose_setting")}
        placeholderTextColor={theme.colors.textSecondary}
        style={[
          styles.input,
          {
            color: theme.colors.textPrimary,
            borderColor: theme.colors.textSecondary,
          },
        ]}
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dropdownContainer: {
    width: "100%",
    marginBottom: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 16,
    marginBottom: 10,
  },
});

export default Step1;
