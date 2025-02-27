// components/LogoutButton.tsx
import React from "react";
import { Button } from "react-native";
import { useLogout } from "../hooks/useLogout";
import { useTranslation } from "react-i18next";

const LogoutButton = (): JSX.Element => {
    const { handleLogout } = useLogout();
    const { t } = useTranslation();

    return <Button title={t("logout")} onPress={handleLogout} />;
};

export default LogoutButton;
