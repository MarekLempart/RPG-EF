// locales/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "./translations/en.json";
import pl from "./translations/pl.json";

const LANGUAGE_STORAGE_KEY = "appLanguage";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            pl: { translation: pl },
        },
        lng: Localization.getLocales()[0]?.languageCode === "pl" ? "pl" : "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export const setLanguage = async (lang: string) => {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    i18n.changeLanguage(lang);
};

export const getStoredLanguage = async () => {
    const storedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLang) {
        i18n.changeLanguage(storedLang);
    }
};

getStoredLanguage();

export default i18n;
