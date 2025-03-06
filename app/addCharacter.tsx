import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { resetCharacter } from "../store/slices/characterSlice";
import { RootState } from "../store/index";
import Step1 from "./characterSteps/Step1";
import Step2 from "./characterSteps/Step2";
import Step3 from "./characterSteps/Step3";
import Step4 from "./characterSteps/Step4";
import Step5 from "./characterSteps/Step5";
import Step6 from "./characterSteps/Step6";
import Step7 from "./characterSteps/Step7";
import Step8 from "./characterSteps/Step8";
import Step9 from "./characterSteps/Step9";

const AddCharacterScreen = (): JSX.Element => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const character = useSelector((state: RootState) => state.character);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 9));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleComplete = () => {
    console.log("Submitting character:", character);
    dispatch(resetCharacter());
  };

  const getStepTitle = () => {
    const titles = [
      "Game Settings",
      "Character Description",
      "Stats",
      "Skills",
      "Talents",
      "Items",
      "Appearance",
      "Character History",
      "Big Dream",
    ];
    return titles[step - 1];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} disabled={step === 1}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={step === 1 ? "gray" : "black"}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{getStepTitle()}</Text>
        {step < 9 ? (
          <TouchableOpacity onPress={handleNext}>
            <Ionicons name="arrow-forward" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleComplete}>
            <Ionicons name="checkmark" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      {step === 5 && <Step5 />}
      {step === 6 && <Step6 />}
      {step === 7 && <Step7 />}
      {step === 8 && <Step8 />}
      {step === 9 && <Step9 />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddCharacterScreen;
