import { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as Location from 'expo-location';

export default function LocationScreen() {
  const [localization, setLocalization] = useState<Location.LocationObjectCoords | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }

    const currentLocation = await Location.getCurrentPositionAsync({})

    setLocalization(currentLocation.coords)
  }

  return <View style={styles.container}>
    <Text style={styles.title}>Lokalizacja GPS</Text>
    <Button title="Pobierz lokalizację" onPress={getLocation} />
    {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
    {localization && (
      <Text style={styles.title}>Współrzędne: {localization.latitude}, {localization.longitude}</Text>
    )}
    
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  error: {
    color: 'red',
    fontSize: 10
  }
});