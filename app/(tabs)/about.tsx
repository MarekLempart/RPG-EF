import { useRouter } from 'expo-router';
import { StyleSheet, View, Button, Text } from 'react-native';

export default function TabTwoScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About page!</Text>
      <Button title='Wróć' onPress={() => router.back()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  }
});
