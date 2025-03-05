import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Button } from "react-native";
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

  return (
    <View>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      {step === 5 && <Step5 />}
      {step === 6 && <Step6 />}
      {step === 7 && <Step7 />}
      {step > 8 && (
        <View>
          <Button title="Placeholder Step" disabled />
        </View>
      )}

      <Button title="Back" onPress={handleBack} disabled={step === 1} />
      {step < 9 ? (
        <Button title="Next" onPress={handleNext} />
      ) : (
        <Button title="Complete" onPress={handleComplete} />
      )}
    </View>
  );
};

export default AddCharacterScreen;
