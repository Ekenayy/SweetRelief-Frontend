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
import * as Location from 'expo-location';
import * as geolib from 'geolib'


export default function App() {

  const Stack = createStackNavigator();

  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [sortedLocations, setSortedLocations] = useState([])
  // const [sorted, setSorted] = useState(false)


  const Body = styled.View`
    flex: 1;
  `
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let latlong = {latitude: location.coords.latitude, longitude: location.coords.longitude}
      setUserLocation(latlong);
    })();
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/locations`)
      .then(res => res.json())
      .then(locations => setLocations(locations))
  },[])

  useEffect(() => {
    fetch(`${BASE_URL}/users/1`)
      .then(res => res.json())
      .then(user => setCurrentUser(user))
  },[])

  // Sorting the locations once we have locations and a userlocation
  useEffect(() => {
        if (locations && userLocation) {
            sortByDistance(locations)
        }
  }, [locations, userLocation])

  const sortByDistance = (locations) => {
    let newLocations = [];

    const numberCompare = (num1, num2) =>{
        return num1.distance-num2.distance
    };


    locations.map((location) => {
        const latLongs = [ userLocation, {latitude: location.latitude,
            longitude: location.longitude}];
        let thisDistance = geolib.getDistance(userLocation, latLongs[1]);
        let convertedDistance = geolib.convertDistance(thisDistance, 'mi')
        let roundedDistance = parseFloat(convertedDistance.toFixed(2))
        let walkingTime = (convertedDistance / 3.0) * 60
        let roundedWalkTime = parseFloat(walkingTime.toFixed(0))
        let updatedLocation = {...location, distance: roundedDistance, walkTime: roundedWalkTime, comments: []}
        newLocations.push(updatedLocation)
    });

    let sortedByDistance = newLocations.sort(numberCompare);
    setSortedLocations(sortedByDistance)
    // setSorted(true)
  };

  return (
    <LocationContext.Provider 
      value={{locations: sortedLocations.length ? [sortedLocations, setSortedLocations] : [locations, setLocations], 
      userLocation: [userLocation, setUserLocation]}}>
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
            {(props) => <Main {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          </Stack.Screen>         
        </Stack.Navigator>
      </Body>
    </NavigationContainer>
    </LocationContext.Provider>



  );
}

