import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BASE_URL } from '@env'
import Main from './src/pages/Main'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

export default function App() {

  const Stack = createStackNavigator();

  const [locations, setLocations] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(locations => setLocations(locations))
  },[])

  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
          headerStyle: {
            backgroundColor: '#FFEFD5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'black',
          },
          }}
        >
          <Stack.Screen name='Main'>
          {(props) => <Main {...props} locations={locations} />}
          </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>

  );
}

