import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSkill,
  addAdditionalSkill,
  updateAdditionalSkill,
} from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";

const MAX_SKILL_POINTS = {
  Young: 8,
  Adult: 10,
  Old: 12,
};

const Step4 = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.character.skills);
  const additionalSkills = useSelector(
    (state: RootState) => state.character.additionalSkills
  );
  const age = useSelector((state: RootState) => state.character.age);

  const attributes = useSelector(
    (state: RootState) => state.character.attributes
  );
  const defaultSkills: Record<string, string[]> = {
    Strength: ["Craft", "Endure", "Fight"],
    Agility: ["Sneak", "Move", "Shoot"],
    Wits: ["Scout", "Comprehend", "Survive"],
    Empathy: ["Manipulate", "SenseEmotion", "Heal"],
  };

  const [remainingSkillPoints, setRemainingSkillPoints] = useState(
    MAX_SKILL_POINTS[age]
  );
  while (remainingSkillPoints < 0) setRemainingSkillPoints(0);
  const [newSkills, setNewSkills] = useState<Record<string, boolean>>({});
  const [skillNames, setSkillNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const totalUsedPoints =
      Object.values(skills).reduce((sum, skill) => sum + skill.value, 0) +
      additionalSkills.reduce((sum, skill) => sum + skill.value, 0);

    setRemainingSkillPoints(
      Math.max(0, MAX_SKILL_POINTS[age] - totalUsedPoints)
    );
  }, [skills, additionalSkills, age]);

  const handleSkillUpdate = (
    skillName: string,
    change: number,
    linkedAttribute: "Strength" | "Agility" | "Wits" | "Empathy"
  ) => {
    if (change > 0 && remainingSkillPoints <= 0) return; // Prevent increasing if no points left

    if (skills[skillName]) {
      // Update default skill
      dispatch(
        updateSkill({
          skillName,
          value: Math.max(0, skills[skillName].value + change),
          linkedAttribute,
        })
      );
    } else {
      // Update additional skill separately
      dispatch(
        updateAdditionalSkill({
          skillName,
          value: Math.max(
            0,
            (additionalSkills.find((skill) => skill.displayName === skillName)
              ?.value || 0) + change
          ),
        })
      );
    }
  };

  const handleAddSkill = (attribute: string) => {
    if (skillNames[attribute]?.trim()) {
      dispatch(
        addAdditionalSkill({
          skillName: skillNames[attribute],
          linkedAttribute: attribute as
            | "Strength"
            | "Agility"
            | "Wits"
            | "Empathy",
        })
      );
      setNewSkills((prev) => ({ ...prev, [attribute]: false }));
      setSkillNames((prev) => ({ ...prev, [attribute]: "" }));
    }
  };

  const handleRandomize = () => {
    let total = MAX_SKILL_POINTS[age];
    let skillKeys = Object.keys(defaultSkills).flatMap(
      (attr) => defaultSkills[attr]
    );
    let newValues = skillKeys.map(() => 0);

    while (total > 0) {
      let index = Math.floor(Math.random() * skillKeys.length);
      newValues[index] += 1;
      total -= 1;
    }

    skillKeys.forEach((key, index) => {
      dispatch(
        updateSkill({
          skillName: key,
          value: newValues[index],
          linkedAttribute:
            (Object.keys(attributes) as (keyof typeof attributes)[]).find(
              (attr) => defaultSkills[attr].includes(key)
            ) || "Strength",
        })
      );
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <View style={styles.pointsRow}>
        <View
          style={[
            styles.pointsBox,
            { borderColor: theme.colors.textSecondary },
          ]}
        >
          <Text
            style={[styles.pointsText, { color: theme.colors.textPrimary }]}
          >
            {remainingSkillPoints}
          </Text>
        </View>
        <CustomButton
          icon={
            <MaterialIcons
              name="casino"
              size={20}
              color={theme.colors.textOnButton}
            />
          }
          onPress={handleRandomize}
          theme={theme}
          style={styles.randomButton}
        />
      </View>
      <View style={styles.gridContainer}>
        {Object.keys(attributes).map((key) => {
          const attributeKey = key as keyof typeof attributes;
          return (
            <View
              key={attributeKey}
              style={[
                styles.column,
                { borderColor: theme.colors.textSecondary },
              ]}
            >
              <View
                style={[
                  styles.attributeTitleContainer,
                  { borderColor: theme.colors.textSecondary },
                ]}
              >
                <Text
                  style={[
                    styles.attributeTitle,
                    { color: theme.colors.textPrimary },
                  ]}
                >
                  {t(`attributes.${attributeKey.toLowerCase()}`)}
                </Text>
              </View>
              {defaultSkills[attributeKey]?.map((skillName) => (
                <View key={skillName} style={styles.skillRow}>
                  <Text style={[{ color: theme.colors.textPrimary }]}>
                    {t(`skills.${skillName.toLowerCase()}`)}
                  </Text>
                  <View style={styles.valueControls}>
                    <CustomButton
                      title="-"
                      onPress={() =>
                        handleSkillUpdate(skillName, -1, attributeKey)
                      }
                      theme={theme}
                      style={styles.button}
                    />
                    <Text
                      style={[
                        styles.skillValue,
                        { color: theme.colors.textPrimary },
                      ]}
                    >
                      {skills[skillName]?.value || 0}
                    </Text>
                    <CustomButton
                      title="+"
                      onPress={() =>
                        handleSkillUpdate(skillName, 1, attributeKey)
                      }
                      theme={theme}
                      style={styles.button}
                    />
                  </View>
                </View>
              ))}
              {additionalSkills
                .filter((skill) => skill.linkedAttribute === attributeKey)
                .map((skill, index) => (
                  <View
                    key={`${skill.displayName}-${index}`}
                    style={styles.skillRow}
                  >
                    <Text style={[{ color: theme.colors.textPrimary }]}>
                      {skill.displayName}
                    </Text>
                    <View style={styles.valueControls}>
                      <CustomButton
                        title="-"
                        onPress={() =>
                          handleSkillUpdate(skill.displayName, -1, attributeKey)
                        }
                        theme={theme}
                        style={styles.button}
                      />
                      <Text
                        style={[
                          styles.skillValue,
                          { color: theme.colors.textPrimary },
                        ]}
                      >
                        {skill.value}
                      </Text>
                      <CustomButton
                        title="+"
                        onPress={() =>
                          handleSkillUpdate(skill.displayName, 1, attributeKey)
                        }
                        theme={theme}
                        style={styles.button}
                      />
                    </View>
                  </View>
                ))}
              {!additionalSkills.some(
                (skill) => skill.linkedAttribute === attributeKey
              ) &&
                (newSkills[attributeKey] ? (
                  <View>
                    <TextInput
                      placeholder={t("skill_name_add_placeholder")}
                      value={skillNames[attributeKey] || ""}
                      onChangeText={(text) =>
                        setSkillNames((prev) => ({
                          ...prev,
                          [attributeKey]: text,
                        }))
                      }
                    />
                    <CustomButton
                      title={t("add_skill_button")}
                      onPress={() => handleAddSkill(attributeKey)}
                      theme={theme}
                      style={styles.addButton}
                    />
                  </View>
                ) : (
                  <CustomButton
                    title="+"
                    onPress={() =>
                      setNewSkills((prev) => ({
                        ...prev,
                        [attributeKey]: true,
                      }))
                    }
                    theme={theme}
                    style={styles.addButton}
                  />
                ))}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pointsBox: {
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  pointsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  pointsText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  randomButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 7,
  },
  column: {
    borderWidth: 1,
    borderRadius: 5,
    width: "50%",
    padding: 5,
  },
  attributeTitleContainer: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  attributeTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  skillRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  skillText: {
    fontSize: 16,
    flex: 1,
  },
  valueControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  button: {
    minWidth: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
    fontSize: 15,
    marginHorizontal: 2,
  },
  skillValue: {
    fontSize: 12,
    marginHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  },
  addButton: {
    alignItems: "center",
    padding: 3,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 5,
  },
});

export default Step4;
