import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSkill,
  addAdditionalSkill,
} from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";

const Step4 = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.character.skills);
  const additionalSkills = useSelector(
    (state: RootState) => state.character.additionalSkills
  );
  const attributes = ["Strength", "Agility", "Wits", "Empathy"] as const;

  const defaultSkills: Record<string, string[]> = {
    Strength: ["Craft", "Endure", "Fight"],
    Agility: ["Sneak", "Move", "Shoot"],
    Wits: ["Scout", "Comprehend", "Survive"],
    Empathy: ["Manipulate", "SenseEmotion", "Heal"],
  };

  const [newSkills, setNewSkills] = useState<Record<string, boolean>>({});
  const [skillNames, setSkillNames] = useState<Record<string, string>>({});

  const handleSkillUpdate = (
    skillName: string,
    change: number,
    linkedAttribute: string
  ) => {
    dispatch(
      updateSkill({
        skillName,
        value: Math.max(0, (skills[skillName]?.value || 0) + change),
        linkedAttribute,
      })
    );
  };

  const handleAdditionalSkillUpdate = (
    skillName: string,
    change: number,
    linkedAttribute: string
  ) => {
    const existingSkill = additionalSkills.find(
      (skill) => skill.displayName === skillName
    );
    if (existingSkill) {
      const newValue = Math.max(0, existingSkill.value + change);
      dispatch(updateSkill({ skillName, value: newValue, linkedAttribute }));
    }
  };

  const handleShowSkillInput = (attribute: string) => {
    setNewSkills((prev) => ({ ...prev, [attribute]: true }));
  };

  const handleAddSkill = (attribute: string) => {
    if (skillNames[attribute]?.trim()) {
      dispatch(
        addAdditionalSkill({
          displayName: skillNames[attribute],
          value: 0,
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

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <Text style={styles.header}>Character Skills</Text>

      <View style={styles.gridContainer}>
        {attributes.map((attribute) => (
          <View key={attribute} style={styles.column}>
            <Text style={styles.attributeTitle}>{attribute}</Text>
            {defaultSkills[attribute].map((skillName) => (
              <View key={skillName} style={styles.skillRow}>
                <Text>{skillName}</Text>
                <Button
                  title="-"
                  onPress={() => handleSkillUpdate(skillName, -1, attribute)}
                />
                <Text>{skills[skillName]?.value || 0}</Text>
                <Button
                  title="+"
                  onPress={() => handleSkillUpdate(skillName, 1, attribute)}
                />
              </View>
            ))}
            {additionalSkills
              .filter((skill) => skill.linkedAttribute === attribute)
              .map((skill, index) => (
                <View
                  key={`${skill.displayName}-${index}`}
                  style={styles.skillRow}
                >
                  <Text>{skill.displayName}</Text>
                  <Button
                    title="-"
                    onPress={() =>
                      handleAdditionalSkillUpdate(
                        skill.displayName,
                        -1,
                        skill.linkedAttribute
                      )
                    }
                  />
                  <Text>{skill.value}</Text>
                  <Button
                    title="+"
                    onPress={() =>
                      handleAdditionalSkillUpdate(
                        skill.displayName,
                        1,
                        skill.linkedAttribute
                      )
                    }
                  />
                </View>
              ))}
            {additionalSkills.filter(
              (skill) => skill.linkedAttribute === attribute
            ).length === 0 &&
              (newSkills[attribute] ? (
                <View>
                  <TextInput
                    placeholder="Skill Name"
                    value={skillNames[attribute] || ""}
                    onChangeText={(text) =>
                      setSkillNames((prev) => ({ ...prev, [attribute]: text }))
                    }
                  />
                  <Button
                    title="Add"
                    onPress={() => handleAddSkill(attribute)}
                  />
                </View>
              ) : (
                <Button
                  title="+ Add Skill"
                  onPress={() => handleShowSkillInput(attribute)}
                />
              ))}
          </View>
        ))}
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
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
    marginBottom: 10,
  },
  attributeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  skillRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});

export default Step4;
