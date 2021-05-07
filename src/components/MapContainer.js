import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Marker, Polyline } from 'react-native-maps';
import { BASE_URL, GOOGLE_KEY } from '@env'
import styled from 'styled-components'
import MapView, {AnimatedRegion} from "react-native-map-clustering";
import LocationContext from '../LocationContext'
import { Wrapper, TouchView } from '../styles/Styles'
import MapViewDirections from 'react-native-maps-directions';
import { MaterialIcons } from '@expo/vector-icons'; 
// import { PROVIDER_GOOGLE } from 'react-native-maps' 


export default function MapContainer(  {setSelectedLocation, selectedLocation} ) {
  
  const {locations, userLocation} = React.useContext(LocationContext)
  const [contextLocations, setContextLocations] = locations
  const [contextUserLocation, setContextUserLocaction] = userLocation

  // console.log(contextUserLocation)
  
  // latitude: 40.8798295,
  //   longitude: -73.8614968,
  const customLocation = {
    latitude: 40.700415, 
    longitude: -73.90897
  }

  const region = {
    ...customLocation,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03
  }

  const createLogo = (locType) => {
    
    if (locType === 'Park') {
      return <MaterialIcons name="park" size={30} color="black" />
    } else if (locType === 'Restaurant/Bar') {
      return <MaterialIcons name="restaurant" size={30} color="black" />
    }

  }

  const allLocations = contextLocations.map((location, index) => {
    return (
      <Marker 
        key={index}
        coordinate={{latitude: location.latitude, longitude: location.longitude}} 
      >
        <TouchView onPress={() => setSelectedLocation(location)}>
          {createLogo(location.locType)}
        </TouchView>
      </Marker>
    )
  })

  const goToInitialLocation = () => {
    let initialRegion = { ...contextUserLocation, latitudeDelta: .03, logitudeDelta: .03}
    console.log(initialRegion)
    // MapView.animateToRegion(initialRegion, 2000)
  }

  return (
      <View style={styles.container}>
        <MapView 
          clusterColor={"orange"}
          extent={190}
          animationEnabled={false}
          initialRegion={region}
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          // onMapReady={goToInitialLocation}
          // provider={PROVIDER_GOOGLE}
        >
          {allLocations}
          {selectedLocation ? 
            <MapViewDirections
              strokeWidth={4}
              strokeColor="#49e36c"
              origin={customLocation}
              destination={{latitude: selectedLocation.latitude, longitude: selectedLocation.longitude}}
              apikey={GOOGLE_KEY}
            />
            : null}
        </MapView>
      </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });