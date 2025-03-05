import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { setRPGSystem } from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";

const Step1 = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const RPGSystem = useSelector(
    (state: RootState) => state.character.RPGSystem
  );

  return (
    <View>
      <Text>Choose Game Setting</Text>
      <Picker
        selectedValue={RPGSystem}
        onValueChange={(value) => dispatch(setRPGSystem(value))}
      >
        <Picker.Item label="Year Zero Engine" value="Year Zero Engine" />
      </Picker>
    </View>
  );
};

export default Step1;
