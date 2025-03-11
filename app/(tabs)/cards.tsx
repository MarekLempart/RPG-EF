// app/(tabs)/cards.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import CustomButton from "@/components/CustomButton";

interface Character {
  id: string;
  name: string;
  avatar: string;
}

const CardsScreen = (): JSX.Element => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      // const response = await axios.get("`/characters`");
      // setCharacters(response.data);
      console.log(
        "Fetchowanie kart postaci. API do dodania jak już będzie backend"
      );
    } catch (error) {
      console.error("Error fetching characters", error);
    }
  };

  const handleCharacterAdded = (newCharacter: Character) => {
    setCharacters((prev) => [...prev, newCharacter]);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <View style={styles.buttonContainer}>
        <Button
          title="Add Character"
          onPress={() => router.push("/addCharacter")}
        />
      </View>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
        Your Characters Cards
      </Text>
      <View style={styles.container}>
        <FlatList
          data={characters}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 50,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
  },
});
