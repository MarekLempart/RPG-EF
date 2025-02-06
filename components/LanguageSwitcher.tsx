// components/LanguageSwitcher.tsx
import React, { useContext } from "react";
import { Button, View } from "react-native";
import { LanguageContext } from "@/contexts/LanguageContext";

const LanguageSwitcher = (): JSX.Element => {
    const { toggleLanguage } = useContext(LanguageContext);
    return (
        <View style={{ margin: 10 }}>
        <Button title="Toggle Language" onPress={toggleLanguage} />
        </View>
    );
};

export default LanguageSwitcher;
