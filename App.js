import React, { useState, useEffect } from 'react';
import { BASE_URL } from '@env'
import Main from './src/pages/Main'
import Login from './src/pages/Login'
import SignUp from './src/pages/SignUp'
import Profile from './src/pages/Profile'
import ResetPass from './src/pages/ResetPass'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LocationContext from './src/LocationContext'
import CustomSplashScreen from './src/components/SplashScreen';
import * as SplashScreen from 'expo-splash-screen';
import styled from 'styled-components'
import * as Location from 'expo-location';
import * as geolib from 'geolib'
import {Alert} from 'react-native'
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
  const [searchingUserLocation, setSearchingUserLocation] = useState(false);

  const Body = styled.View`
    flex: 1;
  `

  SplashScreen.hideAsync();
  
  useEffect(() => {
    const load = async () => {
      let thisToken = ''
        try {
            thisToken = await AsyncStorage.getItem('token') || 'none'  
            
            if (thisToken !== 'none') {
              setToken(thisToken)
            } else {
              setTokenSearched(true)
            }
        } catch(e) {
        }
        return thisToken
    }

    load()
  }, [])

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
  const getLocationPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status == 'granted') {
      getUserLocation();
    } else {
      setErrorMsg('Permission to access location was denied');
      Alert.alert(
        'Location is required to provide accurate service. Go to Settings -> SweetRelief -> Location to allow access',
        "Provide Access",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "Retry", onPress: () => getLocationPermissions() }
        ]
      )
      return;
    }
  }

  const getUserLocation = async () => {
    setSearchingUserLocation(true);
    let location = await Location.getCurrentPositionAsync({accuracy: 6});
    if (location) {
      let latlong = {latitude: location.coords.latitude, longitude: location.coords.longitude}
      setUserLocation(latlong);
    }
    setSearchingUserLocation(false);
  }

  useEffect(() => {
    if (!userLocation) {
      getLocationPermissions();
    }
  }, []);

  useEffect( () => {
    if ((token && !currentUser) && dynoAwake) {
      fetch(`${BASE_URL}/token_show`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }, 
      })
        .then(r => r.json())
        .then(user => {
          if (user.error) {
            setErrorMsg(user.error);
            setCurrentUser(null);
          } else {
            setCurrentUser(user);
            setTokenSearched(true);
          }
        })
    }
  }, [token, dynoAwake])


  useEffect(() => {
    if (dynoAwake) {
      fetch(`${BASE_URL}/active_locations`)
      .then(res => res.json())
      .then(locations => {
        setLocations(locations);
        setIsLoading(false);
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

    const quickSort = (arr) => {
      if (arr.length <= 1) {
        return arr;
      }
    
      let pivot = arr[0];
      let leftArr = [];
      let rightArr = [];
    
      for (let i = 1; i < arr.length; i++) {
        if (arr[i].distance < pivot.distance) {
          leftArr.push(arr[i]);
        } else {
          rightArr.push(arr[i]);
        }
      }
    
      return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
    };

    let sortedByDistance = quickSort(newLocations);
    setSortedLocations(sortedByDistance)
  };

if ((!isLoading && userLocation) && tokenSearched) {
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
                  {(props) => <Main {...props} searchingUserLocation={searchingUserLocation} getUserLocation={getUserLocation} ios={ios} setToken={setToken} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
                </Stack.Screen>
                <Stack.Screen name='Profile'>
                  {(props) => <Profile {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
                </Stack.Screen>
              </>
              :
              <>
                <Stack.Screen name='Login'>
                  {(props) => <Login {...props} setCurrentUser={setCurrentUser} />}
                </Stack.Screen>
                <Stack.Screen name='SignUp'>
                  {(props) => <SignUp {...props} setCurrentUser={setCurrentUser} />}
                </Stack.Screen>
                <Stack.Screen name='ResetPass'>
                  {(props) => <ResetPass {...props} />}
                </Stack.Screen>    
              </>            
              }
            </Stack.Navigator>
          </Body>
      </NavigationContainer>
      </LocationContext.Provider>
  );
} 
return <CustomSplashScreen />

}

