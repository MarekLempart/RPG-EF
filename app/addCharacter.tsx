import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import Step1 from "./characterSteps/Step1";
import Step2 from "./characterSteps/Step2";
import Step3 from "./characterSteps/Step3";
import Step4 from "./characterSteps/Step4";
import Step5 from "./characterSteps/Step5";
import Step6 from "./characterSteps/Step6";
import Step7 from "./characterSteps/Step7";
import Step8 from "./characterSteps/Step8";

const AddCharacterScreen = (): JSX.Element => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    router.push("/cards"); // Navigate back after saving
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <View style={styles.container}>
        {step === 1 && (
          <Step1 name={name} setName={setName} nextStep={() => setStep(2)} />
        )}
        {step === 2 && (
          <Step2
            description={description}
            setDescription={setDescription}
            nextStep={() => setStep(3)}
            prevStep={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <Step3
            description={description}
            setDescription={setDescription}
            nextStep={() => setStep(4)}
            prevStep={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <Step4
            description={description}
            setDescription={setDescription}
            nextStep={() => setStep(5)}
            prevStep={() => setStep(3)}
          />
        )}
        {step === 5 && (
          <Step5
            description={description}
            setDescription={setDescription}
            nextStep={() => setStep(6)}
            prevStep={() => setStep(4)}
          />
        )}
        {step === 6 && (
          <Step6
            description={description}
            setDescription={setDescription}
            nextStep={() => setStep(7)}
            prevStep={() => setStep(5)}
          />
        )}
        {step === 7 && (
          <Step7
            description={description}
            setDescription={setDescription}
            nextStep={() => setStep(8)}
            prevStep={() => setStep(6)}
          />
        )}
        {step === 8 && (
          <Step8
            description={description}
            setDescription={setDescription}
            prevStep={() => setStep(7)}
            handleSubmit={handleSubmit} // Passing handleSubmit function
          />
        )}
      </View>
    </View>
  );
};

export default AddCharacterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
