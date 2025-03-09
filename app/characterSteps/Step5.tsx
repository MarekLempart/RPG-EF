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

  const [talent1, setTalent1] = useState(
    talents[0] || {
      name: "",
      description: "",
      bonus: "+1",
      level: "1",
      talentType: "Active",
    }
  );
  const [talent2, setTalent2] = useState(
    talents[1] || {
      name: "",
      description: "",
      bonus: "+1",
      level: "1",
      talentType: "Active",
    }
  );

  const [bonusOpen1, setBonusOpen1] = useState(false);
  const [bonusOpen2, setBonusOpen2] = useState(false);
  const [levelOpen1, setLevelOpen1] = useState(false);
  const [levelOpen2, setLevelOpen2] = useState(false);
  const [typeOpen1, setTypeOpen1] = useState(false);
  const [typeOpen2, setTypeOpen2] = useState(false);

  const handleSave = () => {
    const newTalents = talent1.bonus === "+2" ? [talent1] : [talent1, talent2];
    dispatch(updateTalents(newTalents));
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
          <View style={styles.nameContainer}>
            <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
              {t("Talent Name")}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.textSecondary,
                },
              ]}
              placeholder="Name"
              placeholderTextColor={theme.colors.textSecondary}
              value={talent.name}
              onChangeText={(text) =>
                index === 0
                  ? setTalent1({ ...talent1, name: text })
                  : setTalent2({ ...talent2, name: text })
              }
              editable={index === 0 || talent1.bonus !== "+2"}
            />
          </View>
          {/* <TextInput
            style={[
              styles.input,
              {
                color: theme.colors.textPrimary,
                borderColor: theme.colors.textSecondary,
              },
            ]}
            placeholder="Description"
            placeholderTextColor={theme.colors.textSecondary}
            value={talent.description}
            onChangeText={(text) =>
              index === 0
                ? setTalent1({ ...talent1, description: text })
                : setTalent2({ ...talent2, description: text })
            }
            editable={index === 0 || talent1.bonus !== "+2"}
          /> */}
          <View style={styles.dropdownBox}>
            <View style={styles.dropdownContainer}>
              <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
                {t("Bonus")}
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
                  index === 0
                    ? setTalent1((prev) => ({
                        ...prev,
                        bonus: callback(prev.bonus),
                      }))
                    : setTalent2((prev) => ({
                        ...prev,
                        bonus: callback(prev.bonus),
                      }))
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
                {t("Level")}
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
                  index === 0
                    ? setTalent1((prev) => ({
                        ...prev,
                        level: callback(prev.level),
                      }))
                    : setTalent2((prev) => ({
                        ...prev,
                        level: callback(prev.level),
                      }))
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
                {t("Type")}
              </Text>
              <DropDownPicker
                open={index === 0 ? typeOpen1 : typeOpen2}
                setOpen={index === 0 ? setTypeOpen1 : setTypeOpen2}
                value={talent.talentType}
                items={[
                  { label: "Active", value: "Active" },
                  { label: "Passive", value: "Passive" },
                  { label: "Situational", value: "Situational" },
                ]}
                setValue={(callback) =>
                  index === 0
                    ? setTalent1((prev) => ({
                        ...prev,
                        talentType: callback(prev.talentType),
                      }))
                    : setTalent2((prev) => ({
                        ...prev,
                        talentType: callback(prev.talentType),
                      }))
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
