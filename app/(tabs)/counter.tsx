import { RootState } from "@/store";
import {
  decrement,
  increment,
  incrementByValue,
  reset,
} from "@/store/slices/counterSlice";
import { StyleSheet, View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const counter = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>Licznik: {counter}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Button title="Reset" onPress={() => dispatch(reset())} />
      <Button
        title="Increment by value"
        onPress={() => dispatch(incrementByValue(10))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  counter: {
    fontSize: 32,
    marginBottom: 20,
  },
});
