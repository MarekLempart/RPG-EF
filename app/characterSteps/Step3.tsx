import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, Button, TextInput } from "react-native";
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
    <View>
      <Text>Character Stats</Text>
      {Object.keys(attributes).map((key) => {
        const attributeKey = key as keyof typeof attributes; // Explicitly cast key
        return (
          <View key={attributeKey}>
            <Text>{attributes[attributeKey].displayName}</Text>
            <Button title="-" onPress={() => handleUpdate(attributeKey, -1)} />
            <Text>{attributes[attributeKey].value}</Text>
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

export default Step3;
