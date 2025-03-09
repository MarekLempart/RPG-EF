import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSkill,
  addAdditionalSkill,
} from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";
import { MaterialIcons } from "@expo/vector-icons";

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

  const attributes = ["Strength", "Agility", "Wits", "Empathy"] as const;
  const defaultSkills: Record<string, string[]> = {
    Strength: ["Craft", "Endure", "Fight"],
    Agility: ["Sneak", "Move", "Shoot"],
    Wits: ["Scout", "Comprehend", "Survive"],
    Empathy: ["Manipulate", "Sense Emot.", "Heal"],
  };

  const [remainingSkillPoints, setRemainingSkillPoints] = useState(
    MAX_SKILL_POINTS[age]
  );
  while (remainingSkillPoints < 0) setRemainingSkillPoints(0);
  const [newSkills, setNewSkills] = useState<Record<string, boolean>>({});
  const [skillNames, setSkillNames] = useState<Record<string, string>>({});

  useEffect(() => {
    setRemainingSkillPoints(
      MAX_SKILL_POINTS[age] -
        Object.values(skills).reduce((sum, skill) => sum + skill.value, 0)
    );
  }, [skills, age]);

  const handleSkillUpdate = (
    skillName: string,
    change: number,
    linkedAttribute: string
  ) => {
    if (change > 0 && remainingSkillPoints <= 0) return;
    dispatch(
      updateSkill({
        skillName,
        value: Math.max(0, (skills[skillName]?.value || 0) + change),
        linkedAttribute,
      })
    );
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
            attributes.find((attr) => defaultSkills[attr].includes(key)) ||
            "Strength",
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
        <TouchableOpacity onPress={handleRandomize} style={styles.randomButton}>
          <MaterialIcons
            name="casino"
            size={20}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.gridContainer}>
        {attributes.map((attribute) => (
          <View
            key={attribute}
            style={[styles.column, { borderColor: theme.colors.textSecondary }]}
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
                {attribute}
              </Text>
            </View>
            {defaultSkills[attribute].map((skillName) => (
              <View key={skillName} style={styles.skillRow}>
                <Text style={[{ color: theme.colors.textPrimary }]}>
                  {skillName}
                </Text>
                <View style={styles.valueControls}>
                  <TouchableOpacity
                    onPress={() => handleSkillUpdate(skillName, -1, attribute)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.skillValue,
                      { color: theme.colors.textPrimary },
                    ]}
                  >
                    {skills[skillName]?.value || 0}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleSkillUpdate(skillName, 1, attribute)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {additionalSkills
              .filter((skill) => skill.linkedAttribute === attribute)
              .map((skill) => (
                <View key={skill.displayName} style={styles.skillRow}>
                  <Text style={[{ color: theme.colors.textPrimary }]}>
                    {skill.displayName}
                  </Text>
                  <View style={styles.valueControls}>
                    <TouchableOpacity
                      onPress={() =>
                        handleSkillUpdate(skill.displayName, -1, attribute)
                      }
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.skillValue,
                        { color: theme.colors.textPrimary },
                      ]}
                    >
                      {skill.value}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        handleSkillUpdate(skill.displayName, 1, attribute)
                      }
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            {newSkills[attribute] ? (
              <View>
                <TextInput
                  placeholder="Skill Name"
                  value={skillNames[attribute] || ""}
                  onChangeText={(text) =>
                    setSkillNames((prev) => ({ ...prev, [attribute]: text }))
                  }
                />
                <TouchableOpacity
                  onPress={() => handleAddSkill(attribute)}
                  style={styles.addButton}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  setNewSkills((prev) => ({ ...prev, [attribute]: true }))
                }
                style={styles.addButton}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
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
    paddingHorizontal: 5,
  },
  pointsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  pointsText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  randomButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    borderWidth: 1,
    borderRadius: 5,
    width: "50%",
    paddingHorizontal: 5,
    paddingVertical: 10,
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
    marginBottom: 15,
  },
  skillText: {
    fontSize: 16,
    flex: 1,
  },
  valueControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  skillValue: {
    fontSize: 12,
    marginHorizontal: 10,
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
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default Step4;
