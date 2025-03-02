import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import {
  // fetchGameSystems,
  setSelectedSystem,
  setSelectedSetting,
} from "../../store/slices/characterSlice";

const Step1 = ({ nextStep }: { nextStep: () => void }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { gameSystems, selectedSystem, selectedSetting } = useSelector(
    (state: any) => state.character
  );

  const systemsArray = Array.isArray(gameSystems) ? gameSystems : [];

  const selectedSystemObj = systemsArray.find(
    (system) => system.name === selectedSystem
  );

  // useEffect(() => {
  //   dispatch(fetchGameSystems() as any);
  // }, [dispatch]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <Text style={[styles.greeting, { color: theme.colors.textPrimary }]}>
        {t("Choose Your Game System")}
      </Text>

      <Picker
        selectedValue={selectedSystem}
        onValueChange={(itemValue) => dispatch(setSelectedSystem(itemValue))}
        style={styles.picker}
      >
        {gameSystems.map((system: string) => (
          <Picker.Item key={system} label={system} value={system} />
        ))}
      </Picker>

      <Text>{t("Choose Setting")}</Text>
      <Picker
        selectedValue={selectedSetting}
        onValueChange={(itemValue) => dispatch(setSelectedSetting(itemValue))}
        style={styles.picker}
      >
        {gameSystems
          .find((system: any) => system.name === selectedSystem)
          ?.settings?.map((setting: string) => (
            <Picker.Item key={setting} label={setting} value={setting} />
          ))}
      </Picker>

      <Button title={t("Next")} onPress={nextStep} />
    </View>
  );
};

export default Step1;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  greeting: { fontSize: 24, textAlign: "center", marginVertical: 10 },
  picker: { width: 250, height: 50 },
});
