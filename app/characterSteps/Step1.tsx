import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
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
    <View style={styles.container}>
      <Text style={styles.label}>{t("Choose RPG System")}</Text>
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
        placeholder={t("Select an RPG System")}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownMenu}
      />

      <Text style={styles.label}>{t("Choose Setting")}</Text>
      <TextInput placeholder={t("Choose Setting")} style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dropdownContainer: {
    width: "100%",
  },
  dropdown: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
  },
  dropdownMenu: {
    borderColor: "#ccc",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});

export default Step1;
