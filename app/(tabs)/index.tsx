import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return <View style={styles.container}>
    <Text style={styles.title}>Ekran główny</Text>
    <Button title={'Idź do About'} onPress={() => router.push('/about')}/>
    <Button title={'Idź do Details nr 42'} onPress={() => router.push('/details/42')}/>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  }
});