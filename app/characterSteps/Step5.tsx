import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { updateTalents } from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";

const Step5 = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const talents = useSelector((state: RootState) => state.character.talents);

  const [talent1, setTalent1] = useState(
    talents[0] || { name: "", bonus: "+1", level: "1", type: "General" }
  );
  const [talent2, setTalent2] = useState(
    talents[1] || { name: "", bonus: "+1", level: "1", type: "General" }
  );

  const handleSave = () => {
    const newTalents = talent1.bonus === "+2" ? [talent1] : [talent1, talent2];
    dispatch(updateTalents(newTalents));
  };

  return (
    <View>
      <Text>Talent 1</Text>
      <TextInput
        placeholder="Name"
        value={talent1.name}
        onChangeText={(text) => setTalent1({ ...talent1, name: text })}
      />
      <Picker
        selectedValue={talent1.bonus}
        onValueChange={(value) => setTalent1({ ...talent1, bonus: value })}
      >
        <Picker.Item label="+1" value="+1" />
        <Picker.Item label="+2" value="+2" />
      </Picker>
      <Button title="Save Talents" onPress={handleSave} />

      {talent1.bonus !== "+2" && (
        <View>
          <Text>Talent 2</Text>
          <TextInput
            placeholder="Name"
            value={talent2.name}
            onChangeText={(text) => setTalent2({ ...talent2, name: text })}
          />
        </View>
      )}
    </View>
  );
};

export default Step5;
