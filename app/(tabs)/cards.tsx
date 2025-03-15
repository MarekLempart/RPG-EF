// app/(tabs)/cards.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
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
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(
        "https://rpg-app-backend.onrender.com/api/characters",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCharacters(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        // No characters found, just set an empty array instead of an error
        setCharacters([]);
      } else {
        console.error("Error fetching characters:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleCharacterAdded = (newCharacter: Character) => {
  //   setCharacters((prev) => [...prev, newCharacter]);
  // };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <View style={styles.buttonContainer}>
        <CustomButton
          title={t("add_new_character")}
          onPress={() => router.push("/addCharacter")}
          theme={theme}
        />
      </View>

      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
        {t("your_chcracters")}
      </Text>

      {loading ? (
        <Text style={[styles.message, { color: theme.colors.textSecondary }]}>
          {t("loading_characters")}
        </Text>
      ) : characters.length === 0 ? (
        <Text style={[styles.message, { color: theme.colors.textSecondary }]}>
          {t("no_characters")}
        </Text>
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item) => item.id}
          numColumns={2} // Display two characters per row
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                { backgroundColor: theme.colors.bgSecondary },
              ]}
              onPress={() =>
                router.push(
                  `/character/${item.id}` as unknown as Parameters<
                    typeof router.push
                  >[0]
                )
              }
            >
              <Image
                source={{
                  uri: item.avatar || "https://via.placeholder.com/100",
                }}
                style={styles.avatar}
              />
              <Text
                style={[
                  styles.characterName,
                  { color: theme.colors.textPrimary },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default CardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 20,
  },
  message: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    width: "48%", // Ensures two columns
    aspectRatio: 1, // Makes the cards square
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  characterName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
