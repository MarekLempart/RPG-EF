import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, Button, TextInput } from "react-native";
import { useState } from "react";
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
  const [newSkill, setNewSkill] = useState("");
  const [linkedAttribute, setLinkedAttribute] = useState("Strength");

  const handleSkillUpdate = (skillName: string, change: number) => {
    const newValue = Math.max(0, (skills[skillName]?.value || 0) + change);
    dispatch(updateSkill({ skillName, value: newValue, linkedAttribute }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      dispatch(
        addAdditionalSkill({
          displayName: newSkill,
          value: 0,
          linkedAttribute: linkedAttribute as
            | "Strength"
            | "Agility"
            | "Wits"
            | "Empathy",
        })
      );
      setNewSkill("");
    }
  };

  return (
    <View>
      <Text>Character Skills</Text>
      {Object.keys(skills).map((key) => (
        <View key={key}>
          <Text>{skills[key].displayName}</Text>
          <Button title="-" onPress={() => handleSkillUpdate(key, -1)} />
          <Text>{skills[key].value}</Text>
          <Button title="+" onPress={() => handleSkillUpdate(key, 1)} />
        </View>
      ))}

      <Text>Add Custom Skill</Text>
      <TextInput
        placeholder="Skill Name"
        value={newSkill}
        onChangeText={setNewSkill}
      />
      <Button title="Add Skill" onPress={handleAddSkill} />
    </View>
  );
};

export default Step4;
