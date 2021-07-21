import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useContext} from 'react';
import { BASE_URL } from '@env'
import Main from './src/pages/Main'
import Login from './src/pages/Login'
import SignUp from './src/pages/SignUp'
import Profile from './src/pages/Profile'
import ResetPass from './src/pages/ResetPass'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import LocationContext from './src/LocationContext'
import SplashScreen from './src/components/SplashScreen';
import styled from 'styled-components'
import * as Location from 'expo-location';
import * as geolib from 'geolib'
import {SafeAreaView, Alert} from 'react-native'
import {LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
LogBox.ignoreLogs(['Reanimated 2']);

export default function App() {

  const Stack = createStackNavigator();

  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [sortedLocations, setSortedLocations] = useState([])
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [tokenSearched, setTokenSearched] = useState(false)
  const [ios, setIos] = useState(Platform.OS === 'ios')
  const [dynoAwake, setDynoAwake] = useState(false)
  const [getPermission, setGetPermission] = useState(false)
  // const [sorted, setSorted] = useState(false)


  const Body = styled.View`
    flex: 1;
  `

  const load = async () => {
    let thisToken = ''
      try {
          thisToken = await AsyncStorage.getItem('token') || 'none'  
          
          if (thisToken !== 'none') {
            setToken(thisToken)
          } else {
            setTokenSearched(true)
            // No token found. The user will be sent to the login page
          }
      } catch(e) {
        // read error
        console.log(e.message)
      }
      return thisToken
  }

  useEffect(() => {
    if (!dynoAwake) {
      fetch(`${BASE_URL}/awake`)
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            setDynoAwake(true)
          }
        })
    }
  }, [dynoAwake])

  // Loads the token from the device storage
  useEffect(() => {
    load()
  }, [])

  // Request userLocation
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert('Location is required to provide accurate service. Please change location settings to allow access')
        setUserLocation({
          latitude: 40.700415, 
          longitude: -73.90897
        })
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let latlong = {latitude: location.coords.latitude, longitude: location.coords.longitude}
      setUserLocation(latlong);
    })();
  }, []);

  useEffect( () => {
    if (token && !currentUser && dynoAwake) {
      fetch(`${BASE_URL}/token_show`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }, 
      })
        .then(r => r.json())
        .then(user => {
          if (user.error) {
            setErrorMsg(user.error)
            setCurrentUser(null)
          } else {
            setCurrentUser(user)
            setTokenSearched(true)
          }
        })
    }
  }, [token, dynoAwake])



  // Should be dependent on Dyno awake
  useEffect(() => {
    if (dynoAwake) {
      fetch(`${BASE_URL}/locations`)
      .then(res => res.json())
      .then(locations => {
        setLocations(locations)
        setIsLoading(false)
      })
    }

  },[dynoAwake])

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

if (isLoading && !tokenSearched) {
  return <SplashScreen />
} 
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
            {currentUser ? 
            <>
              <Stack.Screen name='Main'>
                {(props) => <Main {...props} ios={ios} setToken={setToken} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
              </Stack.Screen>
              <Stack.Screen name='Profile'>
                {(props) => <Profile {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
              </Stack.Screen>
            </>
            :
            <>
              <Stack.Screen name='Login'>
                {(props) => <Login {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
              </Stack.Screen>
              <Stack.Screen name='SignUp'>
                {(props) => <SignUp {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
              </Stack.Screen>
              <Stack.Screen name='ResetPass'>
                {(props) => <ResetPass {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
              </Stack.Screen>    
            </>            
            }
          </Stack.Navigator>
        </Body>
    </NavigationContainer>
    </LocationContext.Provider>
  );
}

