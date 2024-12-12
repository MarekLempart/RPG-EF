import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';

export type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

export default function HomeScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  return <View style={styles.container}>
    <Text style={styles.title}>Lista użytkowników</Text>
    <FlatList
      data={users}
      keyExtractor={user => user.id.toString()}
      renderItem={({ item }) => <View style={styles.userItem}>
          <Button title={item.name} onPress={() => router.push(`/details/${item.id}`)} />
        </View>}
    />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});