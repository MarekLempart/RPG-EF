import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateAttribute } from "../../store/slices/characterSlice";
import { RootState } from "../../store/index";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { MAX_POINTS } from "../constants/constants";

const Step3 = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const attributes = useSelector(
    (state: RootState) => state.character.attributes
  );
  const age = useSelector((state: RootState) => state.character.age);
  const [remainingPoints, setRemainingPoints] = useState(
    MAX_POINTS[age] -
      Object.values(attributes).reduce((sum, attr) => sum + attr.value, 0)
  );
  const [editing, setEditing] = useState<{ [key: string]: boolean }>({});
  const [editedNames, setEditedNames] = useState<{ [key: string]: string }>(
    () => {
      return Object.keys(attributes).reduce((acc, key) => {
        acc[key] = attributes[key as keyof typeof attributes].displayName;
        return acc;
      }, {} as { [key: string]: string });
    }
  );

  useEffect(() => {
    setRemainingPoints(
      MAX_POINTS[age] -
        Object.values(attributes).reduce((sum, attr) => sum + attr.value, 0)
    );
  }, [attributes, age]);

  const handleUpdate = (attribute: keyof typeof attributes, change: number) => {
    if (change > 0 && remainingPoints <= 0) return;
    const newValue = Math.max(0, attributes[attribute].value + change);
    dispatch(updateAttribute({ attribute, value: newValue }));
  };

  const handleRandomize = () => {
    let total = MAX_POINTS[age];
    let attributeKeys = Object.keys(attributes) as (keyof typeof attributes)[];
    let newValues = attributeKeys.map(() => 0);

    while (total > 0) {
      let index = Math.floor(Math.random() * attributeKeys.length);
      newValues[index] += 1;
      total -= 1;
    }

    attributeKeys.forEach((key, index) => {
      dispatch(updateAttribute({ attribute: key, value: newValues[index] }));
    });
  };

  const handleNameChange = (attributeKey: string, text: string) => {
    setEditedNames((prev) => ({ ...prev, [attributeKey]: text }));
  };

  const handleNameBlur = (attributeKey: keyof typeof attributes) => {
    dispatch(
      updateAttribute({
        attribute: attributeKey,
        value: attributes[attributeKey].value,
        displayName: editedNames[attributeKey],
      })
    );
    setEditing((prev) => ({ ...prev, [attributeKey]: false }));
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.bgPrimary }]}
    >
      <View style={styles.remainingPointsRow}>
        <View
          style={[
            styles.pointsBox,
            { borderColor: theme.colors.textSecondary },
          ]}
        >
          <Text
            style={[
              styles.remainingPoints,
              { color: theme.colors.textPrimary },
            ]}
          >
            {remainingPoints}
          </Text>
        </View>
        <CustomButton
          icon={
            <MaterialIcons
              name="casino"
              size={20}
              color={theme.colors.textOnButton}
            />
          }
          onPress={handleRandomize}
          theme={theme}
          style={styles.randomButton}
        />
      </View>
      {Object.keys(attributes).map((key) => {
        const attributeKey = key as keyof typeof attributes;
        return (
          <View
            key={attributeKey}
            style={[
              styles.attributeContainer,
              { borderColor: theme.colors.textSecondary },
            ]}
          >
            <View style={styles.headerRow}>
              {editing[attributeKey] ? (
                <TextInput
                  value={editedNames[attributeKey]}
                  onChangeText={(text) => handleNameChange(attributeKey, text)}
                  onBlur={() => handleNameBlur(attributeKey)}
                  autoFocus
                  style={[
                    styles.attributeNameInput,
                    {
                      color: theme.colors.textPrimary,
                      borderColor: theme.colors.textSecondary,
                    },
                  ]}
                />
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    setEditing({ ...editing, [attributeKey]: true })
                  }
                  style={styles.nameRow}
                >
                  <Text
                    style={[
                      styles.attributeName,
                      { color: theme.colors.textPrimary },
                    ]}
                  >
                    {t(`attributes.${attributeKey.toLowerCase()}`)}
                  </Text>
                  <MaterialIcons
                    name="edit"
                    size={18}
                    color={theme.colors.textSecondary}
                  />
                </TouchableOpacity>
              )}
              <View style={styles.valueControls}>
                <CustomButton
                  title="-"
                  onPress={() => handleUpdate(attributeKey, -1)}
                  theme={theme}
                  style={styles.button}
                />
                <Text
                  style={[
                    styles.attributeValue,
                    { color: theme.colors.textPrimary },
                  ]}
                >
                  {attributes[attributeKey].value}
                </Text>
                <CustomButton
                  title="+"
                  onPress={() => handleUpdate(attributeKey, 1)}
                  theme={theme}
                  style={styles.button}
                />
              </View>
            </View>
            <Text
              style={[
                styles.attributeDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              {t(`attribute_description.${attributeKey.toLowerCase()}`)}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 5,
  },
  remainingPointsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  pointsBox: {
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  remainingPoints: {
    fontSize: 20,
    fontWeight: "bold",
  },
  randomButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 7,
  },
  attributeContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  attributeName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  attributeNameInput: {
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 1,
    paddingBottom: 2,
  },
  valueControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    minWidth: 30,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 50,
    fontSize: 18,
    fontWeight: "bold",
  },

  attributeValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  attributeDescription: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default Step3;
