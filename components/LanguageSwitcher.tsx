// components/LanguageSwitcher.tsx
import React, { useContext } from "react";
import { Button, View } from "react-native";
import { LanguageContext } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = (): JSX.Element => {
    const { toggleLanguage } = useContext(LanguageContext);
    const { t } = useTranslation();

    return (
        <View style={{ margin: 10 }}>
        <Button title={t("toggle_language")} onPress={toggleLanguage} />
        </View>
    );
};

export default LanguageSwitcher;
