import React, {useState, useEffect, useContext, useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { BASE_URL, GOOGLE_KEY } from '@env'
import styled from 'styled-components'
import MapView, {AnimatedRegion} from "react-native-map-clustering";
import LocationContext from '../LocationContext'
import { Wrapper, TouchView } from '../styles/Styles'
import MapViewDirections from 'react-native-maps-directions';
import { MaterialIcons } from '@expo/vector-icons'; 
// import { PROVIDER_GOOGLE } from 'react-native-maps' 


export default function MapContainer(  {setSelectedLocation, wholeMap, handlePress, selectedLocation} ) {
  
  const {locations, userLocation} = React.useContext(LocationContext)
  const [contextLocations, setContextLocations] = locations
  const [contextUserLocation, setContextUserLocation] = userLocation

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
        key={location.id}
        coordinate={{latitude: location.latitude, longitude: location.longitude}} 
      >
        <TouchView onPress={() => handlePress(location)}>
          {createLogo(location.locType)}
        </TouchView>
      </Marker>
    )
  })

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
          ref={wholeMap}
          // provider={PROVIDER_GOOGLE}
        >
          {allLocations}
          {selectedLocation ? 
            <MapViewDirections
              strokeWidth={4}
              mode="WALKING"
              strokeColor="#49e36c"
              origin={contextUserLocation ? contextUserLocation : customLocation}
              destination={{latitude: selectedLocation.latitude, longitude: selectedLocation.longitude}}
              apikey={GOOGLE_KEY}
              // onReady={result => {
              //   console.log(`Duration: ${result.duration} min.`)
              //   }
              // }
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