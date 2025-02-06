    // contexts/LanguageContext.tsx
    import React, { createContext, useState, ReactNode } from "react";

    interface LanguageContextProps {
    language: string;
    toggleLanguage: () => void;
    }

    export const LanguageContext = createContext<LanguageContextProps>({
    language: "en",
    toggleLanguage: () => {}
    });

    interface Props {
    children: ReactNode;
    }

    export const LanguageProvider = ({ children }: Props): JSX.Element => {
    const [language, setLanguage] = useState<string>("en");

    const toggleLanguage = (): void => {
        setLanguage((prev) => (prev === "en" ? "pl" : "en"));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
        {children}
        </LanguageContext.Provider>
    );
    };
