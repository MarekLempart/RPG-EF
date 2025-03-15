import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { resetCharacter } from "../store/slices/characterSlice";
import { RootState } from "../store/index";
import { CharacterState } from "@/store/slices/characterSlice";
import Toast from "react-native-toast-message";
import CustomButton from "@/components/CustomButton";
import Step1 from "./characterSteps/Step1";
import Step2 from "./characterSteps/Step2";
import Step3 from "./characterSteps/Step3";
import Step4 from "./characterSteps/Step4";
import Step5 from "./characterSteps/Step5";
import Step6 from "./characterSteps/Step6";
import Step7 from "./characterSteps/Step7";
import Step8 from "./characterSteps/Step8";
import Step9 from "./characterSteps/Step9";
import { MAX_POINTS, MAX_SKILL_POINTS } from "./constants/constants";

const AddCharacterScreen = (): JSX.Element => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const character = useSelector((state: RootState) => state.character);

  // Function to validate if we can proceed
  const canProceedToNextStep = (step: number, character: CharacterState) => {
    if (step === 2) {
      // Check mandatory text fields in Step 2
      if (
        !character.name.trim() ||
        !character.archetype.trim() ||
        !character.race.trim()
      ) {
        Toast.show({
          type: "error",
          text1: t("add_character_step2_error_text1"),
          text2: t("add_character_step2_error_text2"),
        });
        return false;
      }
    }

    if (step === 3) {
      // Check if all attribute points are used
      const remainingPoints =
        MAX_POINTS[character.age as keyof typeof MAX_POINTS] -
        Object.values(character.attributes).reduce(
          (sum: number, attr: any) => sum + (attr as { value: number }).value,
          0
        );
      if (remainingPoints > 0) {
        Toast.show({
          type: "error",
          text1: t("add_character_step3_error_text1"),
          text2: t("add_character_step3_error_text2"),
        });
        return false;
      }
    }

    if (step === 4) {
      // Check if all skill points are used
      const remainingSkillPoints =
        MAX_SKILL_POINTS[character.age as keyof typeof MAX_SKILL_POINTS] -
        (Object.values(
          character.skills as unknown as { value: number }[]
        ).reduce((sum, skill) => sum + skill.value, 0) +
          (character.additionalSkills as { value: number }[]).reduce(
            (sum, skill) => sum + skill.value,
            0
          ));
      if (remainingSkillPoints > 0) {
        Toast.show({
          type: "error",
          text1: t("add_character_step4_error_text1"),
          text2: t("add_character_step4_error_text2"),
        });
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (canProceedToNextStep(step, character)) {
      setStep((prev) => Math.min(prev + 1, 9));
    }
  };
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleComplete = () => {
    console.log("Submitting character:", character);
    dispatch(resetCharacter());
  };

  const getStepTitle = () => {
    const titles = [
      t("game_settings"),
      t("character_description"),
      t("attributes_title"),
      t("skills_title"),
      t("talents"),
      t("items"),
      t("appearance"),
      t("character_history"),
      t("big_dream"),
    ];
    return titles[step - 1];
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <View
        style={[styles.header, { borderColor: theme.colors.textSecondary }]}
      >
        <CustomButton
          icon={
            <Ionicons
              name="arrow-back"
              size={24}
              color={step === 1 ? "gray" : `${theme.colors.textOnButton}`}
            />
          }
          onPress={handleBack}
          theme={theme}
          disabled={step === 1}
        />
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          {getStepTitle()}
        </Text>
        {step < 9 ? (
          <CustomButton
            icon={
              <Ionicons
                name="arrow-forward"
                size={24}
                color={theme.colors.textOnButton}
              />
            }
            onPress={handleNext}
            theme={theme}
          />
        ) : (
          <CustomButton
            icon={
              <Ionicons
                name="checkmark"
                size={24}
                color={theme.colors.textOnButton}
              />
            }
            onPress={handleComplete}
            theme={theme}
          />
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
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddCharacterScreen;
