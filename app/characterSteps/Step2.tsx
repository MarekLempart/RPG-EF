import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
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

  return (
    <View>
      <Text>Character Name</Text>
      <TextInput
        value={name}
        onChangeText={(text) =>
          dispatch(setCharacterDetails({ name: text, age, archetype, race }))
        }
      />

      <Text>Age</Text>
      <Picker
        selectedValue={age}
        onValueChange={(value) =>
          dispatch(setCharacterDetails({ name, age: value, archetype, race }))
        }
      >
        <Picker.Item label="Young" value="Young" />
        <Picker.Item label="Adult" value="Adult" />
        <Picker.Item label="Old" value="Old" />
      </Picker>

      <Text>Archetype</Text>
      <TextInput
        value={archetype}
        onChangeText={(text) =>
          dispatch(setCharacterDetails({ name, age, archetype: text, race }))
        }
      />

      <Text>Race</Text>
      <TextInput
        value={race}
        onChangeText={(text) =>
          dispatch(setCharacterDetails({ name, age, archetype, race: text }))
        }
      />
    </View>
  );
};

export default Step2;
