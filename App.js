import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useContext} from 'react';
import { BASE_URL } from '@env'
import Main from './src/pages/Main'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import LocationContext from './src/LocationContext'
import LocationItem from './src/components/LocationItem';
import styled from 'styled-components'

export default function App() {

  const Stack = createStackNavigator();

  const [locations, setLocations] = useState([]);

  const Body = styled.View`
    flex: 1;
  `

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(locations => setLocations(locations))
  },[])


  return (
    <LocationContext.Provider value={{locations: [locations, setLocations]}}>
    <NavigationContainer>
      <Body>
        <Stack.Navigator
          screenOptions={{
          headerStyle: {
            backgroundColor: '#FFEFD5',
            height: '0%',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'black',
          },
          }}
        >
          <Stack.Screen name='Main'>
            {(props) => <Main {...props} />}
          </Stack.Screen>         
        </Stack.Navigator>
      </Body>
    </NavigationContainer>
    </LocationContext.Provider>



  );
}

