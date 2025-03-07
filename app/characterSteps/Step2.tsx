import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setCharacterDetails } from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";

const Step2 = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { name, age, archetype, race } = useSelector(
    (state: RootState) => state.character
  );

  // State for Age Dropdown
  const [ageOpen, setAgeOpen] = useState(false);
  const [ageItems, setAgeItems] = useState([
    { label: "Young", value: "Young" },
    { label: "Adult", value: "Adult" },
    { label: "Old", value: "Old" },
  ]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <View style={styles.nameAgeContainer}>
        {/* Character Name */}
        <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
          {t("Name")}
        </Text>
        <TextInput
          value={name}
          onChangeText={(text) =>
            dispatch(setCharacterDetails({ name: text, age, archetype, race }))
          }
          placeholderTextColor={theme.colors.textSecondary}
          style={[
            styles.input,
            {
              color: theme.colors.textPrimary,
              borderColor: theme.colors.textSecondary,
            },
          ]}
        />

        {/* Age Dropdown */}
        <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
          {t("Age")}
        </Text>
        <DropDownPicker
          open={ageOpen}
          value={age} // Redux state value
          items={ageItems}
          setOpen={setAgeOpen}
          setValue={(callback) => {
            const newValue =
              typeof callback === "function" ? callback(age) : callback;
            dispatch(
              setCharacterDetails({ name, age: newValue, archetype, race })
            );
          }}
          setItems={setAgeItems}
          placeholder={t("Select Age")}
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
      </View>

      <View style={styles.archRaceContainer}>
        {/* Archetype */}
        <View style={styles.archBox}>
          <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
            {t("Archetype")}
          </Text>
          <TextInput
            value={archetype}
            onChangeText={(text) =>
              dispatch(
                setCharacterDetails({ name, age, archetype: text, race })
              )
            }
            style={[
              styles.input,
              {
                color: theme.colors.textPrimary,
                borderColor: theme.colors.textSecondary,
              },
            ]}
          />
        </View>

        {/* Race */}
        <View style={styles.raceBox}>
          <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
            {t("Race")}
          </Text>
          <TextInput
            value={race}
            onChangeText={(text) =>
              dispatch(
                setCharacterDetails({ name, age, archetype, race: text })
              )
            }
            style={[
              styles.input,
              {
                color: theme.colors.textPrimary,
                borderColor: theme.colors.textSecondary,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 5,
  },
  nameAgeContainer: {
    width: "50%",
    alignSelf: "flex-end",
    marginLeft: 10,
    marginBottom: 20,
  },
  archRaceContainer: {
    flexDirection: "row",
  },
  archBox: {
    width: "45%",
    marginRight: 13,
  },
  raceBox: {
    width: "50%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dropdownContainer: {
    width: "100%",
    marginBottom: 10,
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
    borderRadius: 5,
    padding: 16,
    marginBottom: 10,
  },
});

export default Step2;
