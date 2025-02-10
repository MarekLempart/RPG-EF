// contexts/LanguageContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { setLanguage as setI18nLanguage, getStoredLanguage } from "@/locales/i18n";
import * as Localization from "expo-localization";

interface LanguageContextProps {
    language: string;
    toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
    language: "en",
    toggleLanguage: () => {},
});

interface Props {
    children: ReactNode;
}
export const LanguageProvider = ({ children }: Props): JSX.Element => {
    const [language, setLanguageState] = useState<string>("en");

    useEffect(() => {
        const loadLanguage = async () => {
            await getStoredLanguage();
            const locales = Localization.getLocales();
            const deviceLocale = locales[0]?.languageTag || "en";
            setLanguageState(deviceLocale.startsWith("pl") ? "pl" : "en");
        };
        loadLanguage();
    }, []);

    const toggleLanguage = async (): Promise <void> => {
        const newLang = language === "en" ? "pl" : "en";
        setLanguageState(newLang);
        await setI18nLanguage(newLang);
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
