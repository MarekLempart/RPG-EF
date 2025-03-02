import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setAvatar,
  setName,
  setArchetype,
  setRace,
  setAppearance,
  setBigDream,
} from "../../store/slices/characterSlice";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
}

const Step2: React.FC<Step2Props> = ({ nextStep, prevStep }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { avatar, name, archetype, race, appearance, bigDream } = useSelector(
    (state: any) => state.character
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      dispatch(setAvatar(result.assets[0].uri));
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <Text style={[styles.greeting, { color: theme.colors.textPrimary }]}>
        {t("Character Description")}
      </Text>

      {/* Avatar Selection */}
      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      ) : (
        <Button title={t("Pick an Avatar")} onPress={pickImage} />
      )}

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder={t("Enter Name")}
        placeholderTextColor={theme.colors.textSecondary}
        value={name}
        onChangeText={(text) => dispatch(setName(text))}
      />

      {/* Archetype Input */}
      <TextInput
        style={styles.input}
        placeholder={t("Enter Archetype")}
        placeholderTextColor={theme.colors.textSecondary}
        value={archetype}
        onChangeText={(text) => dispatch(setArchetype(text))}
      />

      {/* Race Input */}
      <TextInput
        style={styles.input}
        placeholder={t("Enter Race")}
        placeholderTextColor={theme.colors.textSecondary}
        value={race}
        onChangeText={(text) => dispatch(setRace(text))}
      />

      {/* Appearance Input */}
      <TextInput
        style={styles.input}
        placeholder={t("Describe Appearance")}
        placeholderTextColor={theme.colors.textSecondary}
        value={appearance}
        onChangeText={(text) => dispatch(setAppearance(text))}
      />

      {/* Big Dream Input */}
      <TextInput
        style={styles.input}
        placeholder={t("Enter Big Dream")}
        placeholderTextColor={theme.colors.textSecondary}
        value={bigDream}
        onChangeText={(text) => dispatch(setBigDream(text))}
      />

      <View style={styles.buttonContainer}>
        <Button title={t("Back")} onPress={prevStep} />
        <Button title={t("Next")} onPress={nextStep} />
      </View>
    </View>
  );
};

export default Step2;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: {
    width: "80%",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  greeting: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});
