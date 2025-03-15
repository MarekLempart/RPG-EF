import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const CharacterScreen = () => {
  const { id } = useLocalSearchParams(); // Get character ID from URL

  return (
    <View>
      <Text>Character ID: {id}</Text>
      {/* Character details will go here */}
    </View>
  );
};

export default CharacterScreen;
