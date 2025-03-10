// components/ExitButton.tsx
import React from "react";
import { useExitApp } from "@/hooks/useExitApp";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import CustomButton from "@/components/CustomButton";

const ExitButton = (): JSX.Element => {
    const { theme } = useTheme();
    const { exitApp } = useExitApp();
    const { t } = useTranslation();

    return <CustomButton
        title={t("exit_app")}
        onPress={exitApp}
        theme={theme}
    />
};

export default ExitButton;
