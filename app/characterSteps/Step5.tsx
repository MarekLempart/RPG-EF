import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { updateTalents } from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";

const Step5 = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const talents = useSelector((state: RootState) => state.character.talents);

  const talent1 = talents[0] || {
    name: "",
    description: "",
    bonus: "+1",
    level: "1",
    talentType: "Active",
  };
  const talent2 = talents[1] || {
    name: "",
    description: "",
    bonus: "+1",
    level: "1",
    talentType: "Active",
  };

  const [bonusOpen1, setBonusOpen1] = useState(false);
  const [bonusOpen2, setBonusOpen2] = useState(false);
  const [levelOpen1, setLevelOpen1] = useState(false);
  const [levelOpen2, setLevelOpen2] = useState(false);
  const [typeOpen1, setTypeOpen1] = useState(false);
  const [typeOpen2, setTypeOpen2] = useState(false);

  // Handle updates and save directly to Redux
  const updateTalent = (index: number, updatedTalent: any) => {
    const newTalents = [...talents];
    newTalents[index] = updatedTalent;

    // If talent1 has "+2", disable talent2
    dispatch(
      updateTalents(updatedTalent.bonus === "+2" ? [newTalents[0]] : newTalents)
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      {[talent1, talent2].map((talent, index) => (
        <View
          key={index}
          style={[
            styles.talentContainer,
            talent1.bonus === "+2" && index === 1 ? styles.disabled : null,
          ]}
        >
          {/* Talent Name */}
          <View style={styles.nameContainer}>
            <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
              {t("talent_name")}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.textSecondary,
                },
              ]}
              placeholder={t("talent_name_placeholder")}
              placeholderTextColor={theme.colors.textSecondary}
              value={talent.name}
              onChangeText={(text) =>
                updateTalent(index, { ...talent, name: text })
              }
              editable={index === 0 || talent1.bonus !== "+2"}
            />
          </View>

          {/* Dropdowns */}
          <View style={styles.dropdownBox}>
            <View style={styles.dropdownContainer}>
              <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
                Bonus
              </Text>
              <DropDownPicker
                open={index === 0 ? bonusOpen1 : bonusOpen2}
                setOpen={index === 0 ? setBonusOpen1 : setBonusOpen2}
                value={talent.bonus}
                items={[
                  { label: "+1", value: "+1" },
                  { label: "+2", value: "+2" },
                ]}
                setValue={(callback) =>
                  updateTalent(index, {
                    ...talent,
                    bonus: callback(talent.bonus),
                  })
                }
                disabled={index === 1 && talent1.bonus === "+2"}
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

            <View style={styles.dropdownContainer}>
              <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
                {t("talent_level")}
              </Text>
              <DropDownPicker
                open={index === 0 ? levelOpen1 : levelOpen2}
                setOpen={index === 0 ? setLevelOpen1 : setLevelOpen2}
                value={talent.level}
                items={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                ]}
                setValue={(callback) =>
                  updateTalent(index, {
                    ...talent,
                    level: callback(talent.level),
                  })
                }
                disabled={index === 1 && talent1.bonus === "+2"}
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

            <View style={styles.dropdownContainerTwo}>
              <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
                {t("talent_type")}
              </Text>
              <DropDownPicker
                open={index === 0 ? typeOpen1 : typeOpen2}
                setOpen={index === 0 ? setTypeOpen1 : setTypeOpen2}
                value={talent.talentType}
                items={[
                  { label: t("types.active"), value: "Active" },
                  { label: t("types.passive"), value: "Passive" },
                  { label: t("types.situational"), value: "Situational" },
                ]}
                setValue={(callback) =>
                  updateTalent(index, {
                    ...talent,
                    talentType: callback(talent.talentType),
                  })
                }
                disabled={index === 1 && talent1.bonus === "+2"}
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
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 5,
  },
  talentContainer: {
    flexDirection: "column",
    marginBottom: 100,
  },
  nameContainer: {
    width: "50%",
  },
  dropdownBox: {
    flexDirection: "row",
  },
  dropdownContainer: {
    flexDirection: "column",
    width: "25%",
  },
  dropdownContainerTwo: {
    flexDirection: "column",
    width: "50%",
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 17,
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Step5;
