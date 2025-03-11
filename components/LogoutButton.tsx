// components/LogoutButton.tsx
import React from "react";
import { useLogout } from "../hooks/useLogout";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import CustomButton from "@/components/CustomButton";

const LogoutButton = (): JSX.Element => {
    const { handleLogout } = useLogout();
    const { theme } = useTheme();
    const { t } = useTranslation();

    return < CustomButton title={t("logout")} onPress={handleLogout} theme={theme} />
};

export default LogoutButton;
