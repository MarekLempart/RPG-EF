import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';
import { TUser } from '../(tabs)';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, [])
  
  return <View style={styles.container}>
    <Text style={styles.title}>Użytkownik nr {id}</Text>
    {user ? <View>
        <Text>{user.name}</Text>
        <Text>{user.username}</Text>
        <Text>{user.email}</Text>
        <Text>{user.phone}</Text>
        <Text>{user.website}</Text>
        <Text>{user.address.street}</Text>
        <Text>{user.address.suite}</Text>
        <Text>{user.address.city}</Text>
        <Text>{user.address.zipcode}</Text>
        <Text>{user.address.geo.lat}</Text>
        <Text>{user.address.geo.lng}</Text>
        <Text>{user.company.name}</Text>
        <Text>{user.company.catchPhrase}</Text>
        <Text>{user.company.bs}</Text>
      </View> : <Text>Ładowanie...</Text>}
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