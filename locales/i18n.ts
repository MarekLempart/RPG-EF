// locales/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import tłumaczeń
import en from "./translations/en.json";
import pl from "./translations/pl.json";

// Klucz do przechowywania wybranego języka w AsyncStorage
const LANGUAGE_STORAGE_KEY = "appLanguage";

// Konfiguracja i18next
i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            pl: { translation: pl },
        },
        lng: Localization.locale.startsWith("pl") ? "pl" : "en", // Domyślnie język systemowy
        fallbackLng: "en", // Domyślny język
        interpolation: {
            escapeValue: false, // React Native nie wymaga escape'owania HTML
        },
    });

// Funkcja do ustawienia języka i zapisania go w pamięci
export const setLanguage = async (lang: string) => {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    i18n.changeLanguage(lang);
};

// Funkcja do pobrania zapisanego języka
export const getStoredLanguage = async () => {
    const storedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLang) {
        i18n.changeLanguage(storedLang);
    }
};

// Wywołaj pobranie języka przy uruchomieniu aplikacji
getStoredLanguage();

export default i18n;
