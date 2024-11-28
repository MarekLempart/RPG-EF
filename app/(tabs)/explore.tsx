import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

export default function TabTwoScreen() {
  const [name, setName] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Wprowadź swoje imię:</Text>
      <TextInput
        style={styles.input}
        placeholder='Imię'
        onChangeText={setName}
        value={name}
      />
      <Button title='Wyślij' onPress={() => alert(`Cześć, ${name}`)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    color: '#333',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderRadius: 16,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  }
});
