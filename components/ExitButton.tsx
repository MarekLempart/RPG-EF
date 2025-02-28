// components/ExitButton.tsx
import React from "react";
import { Button } from "react-native";
import { useExitApp } from "@/hooks/useExitApp";
import { useTranslation } from "react-i18next";

const ExitButton = (): JSX.Element => {
    const { exitApp } = useExitApp();
    const { t } = useTranslation();

    return <Button title={t("exit_app")} onPress={exitApp} />;
};

export default ExitButton;
