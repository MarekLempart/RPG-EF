import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setStats } from "../../store/slices/characterSlice";
import { RootState } from "../../store";

interface Step3Props {
  nextStep: () => void;
  prevStep: () => void;
}

const Step3: React.FC<Step3Props> = ({ nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const stats = useSelector((state: RootState) => state.character.stats);

  const handleStatChange = (
    statKey: "strength" | "agility" | "plot" | "empathy",
    increment: boolean
  ) => {
    const newValue = increment
      ? stats[statKey] + 1
      : Math.max(0, stats[statKey] - 1);
    dispatch(setStats({ stat: statKey, value: newValue }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stats and Skills</Text>
      {Object.entries(stats).map(([key, value]) => (
        <View key={key} style={styles.statRow}>
          <Text style={styles.statLabel}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
          <Button
            title="-"
            onPress={() =>
              handleStatChange(
                key as "strength" | "agility" | "plot" | "empathy",
                false
              )
            }
          />
          <Text style={styles.statValue}>{String(value)}</Text>
          <Button
            title="+"
            onPress={() =>
              handleStatChange(
                key as "strength" | "agility" | "plot" | "empathy",
                true
              )
            }
          />
        </View>
      ))}
    </View>
  );
};

export default Step3;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, marginBottom: 20 },
  statRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  statLabel: { fontSize: 16, width: 100 },
  statValue: { fontSize: 16, marginHorizontal: 10 },
});
