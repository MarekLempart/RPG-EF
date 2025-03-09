import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateAttribute } from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";

const Step3 = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const attributes = useSelector(
    (state: RootState) => state.character.attributes
  );

  const handleUpdate = (attribute: keyof typeof attributes, change: number) => {
    const newValue = Math.max(0, attributes[attribute].value + change);
    dispatch(updateAttribute({ attribute, value: newValue }));
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      {Object.keys(attributes).map((key) => {
        const attributeKey = key as keyof typeof attributes;
        return (
          <View key={attributeKey}>
            <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
              {attributes[attributeKey].displayName}
            </Text>
            <Button title="-" onPress={() => handleUpdate(attributeKey, -1)} />
            <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
              {attributes[attributeKey].value}
            </Text>
            <Button title="+" onPress={() => handleUpdate(attributeKey, 1)} />
            <TextInput
              value={attributes[attributeKey].displayName}
              onChangeText={(text) =>
                dispatch(
                  updateAttribute({
                    attribute: attributeKey,
                    value: attributes[attributeKey].value,
                    displayName: text,
                  })
                )
              }
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default Step3;
