// components/TypeInput.tsx
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { ThemeType } from "@/styles/theme.types";


type TypeInputProps = {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    theme: ThemeType;
};

const TypeInput = ({ label, placeholder, value, onChangeText, theme }: TypeInputProps) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
                {label}
            </Text>
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: theme.colors.inputBackground,
                        borderColor: theme.colors.inputBorder,
                        color: theme.colors.textPrimary,
                    },
                ]}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.textSecondary}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 2
    },
    label: {
        fontSize: 16,
        marginVertical: 5
    },
    input: {
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
        marginBottom: 5,
    },
});

export default TypeInput;
