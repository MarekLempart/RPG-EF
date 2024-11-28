import { StyleSheet, View, Text, Image, Button } from 'react-native';

export default function HomeScreen() {
  return <View style={styles.container}>
    <Text style={styles.title}>Witaj CodeStoryBro grupo!</Text>
    <Image 
      style={styles.image}
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
    />
    <Button title={'Start!'} onPress={() => alert('Kliknięcie!')}/>
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
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20
  }
});
