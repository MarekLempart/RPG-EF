import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  
  return <View style={styles.container}>
    <Text style={styles.title}>Ekran szczegółów nr {id}</Text>
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