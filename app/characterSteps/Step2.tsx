import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCharacterDetails } from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";

const Step2 = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { name, age, archetype, race } = useSelector(
    (state: RootState) => state.character
  );
  const [avatar, setAvatar] = useState<string | null>(null);

  const placeholderAvatar = require("../../assets/images/avatar-placeholder.png");

  // State for Age Dropdown
  const [ageOpen, setAgeOpen] = useState(false);
  const [ageItems, setAgeItems] = useState([
    { label: t("age_young"), value: "Young" },
    { label: t("age_adult"), value: "Adult" },
    { label: t("age_old"), value: "Old" },
  ]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <View style={styles.mainContainer}>
        {/* Avatar Upload */}

        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          <Image
            source={avatar ? { uri: avatar } : placeholderAvatar}
            style={styles.avatar}
          />
          <Text
            style={[styles.uploadText, { color: theme.colors.textSecondary }]}
          >
            {t("upload_avatar")}
          </Text>
        </TouchableOpacity>

        <View style={styles.rightContainer}>
          {/* Character Name */}
          <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
            {t("character_name")}
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) =>
              dispatch(
                setCharacterDetails({ name: text, age, archetype, race })
              )
            }
            placeholderTextColor={theme.colors.textSecondary}
            style={[
              styles.input,
              {
                color: theme.colors.textPrimary,
                borderColor: theme.colors.textSecondary,
              },
            ]}
          />

          {/* Age Dropdown */}
          <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
            {t("character_age")}
          </Text>
          <DropDownPicker
            open={ageOpen}
            value={age} // Redux state value
            items={ageItems}
            setOpen={setAgeOpen}
            setValue={(callback) => {
              const newValue =
                typeof callback === "function" ? callback(age) : callback;
              dispatch(
                setCharacterDetails({ name, age: newValue, archetype, race })
              );
            }}
            setItems={setAgeItems}
            containerStyle={styles.dropdownContainer}
            style={[
              styles.dropdown,
              {
                backgroundColor: theme.colors.bgPrimary,
                borderColor: theme.colors.textSecondary,
              },
            ]}
            textStyle={{ color: theme.colors.textPrimary }}
            dropDownContainerStyle={{
              backgroundColor: theme.colors.bgPrimary,
              borderColor: theme.colors.textSecondary,
            }}
          />
        </View>
      </View>

      <View style={styles.archRaceContainer}>
        {/* Archetype */}
        <View style={styles.archBox}>
          <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
            {t("character_archetype")}
          </Text>
          <TextInput
            value={archetype}
            onChangeText={(text) =>
              dispatch(
                setCharacterDetails({ name, age, archetype: text, race })
              )
            }
            style={[
              styles.input,
              {
                color: theme.colors.textPrimary,
                borderColor: theme.colors.textSecondary,
              },
            ]}
          />
        </View>

        {/* Race */}
        <View style={styles.raceBox}>
          <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
            {t("character_race")}
          </Text>
          <TextInput
            value={race}
            onChangeText={(text) =>
              dispatch(
                setCharacterDetails({ name, age, archetype, race: text })
              )
            }
            style={[
              styles.input,
              {
                color: theme.colors.textPrimary,
                borderColor: theme.colors.textSecondary,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 5,
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: "48%",
    alignItems: "center",
    marginRight: 15,
  },
  avatar: {
    width: 120,
    height: 150,
    aspectRatio: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  uploadText: {
    marginTop: 5,
    fontSize: 12,
  },
  rightContainer: {
    flex: 1,
    width: "48%",
  },
  archRaceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  archBox: {
    width: "48%",
  },
  raceBox: {
    width: "48%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dropdownContainer: {
    width: "100%",
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 16,
    marginBottom: 10,
  },
});

export default Step2;
