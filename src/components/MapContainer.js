import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { BASE_URL } from '@env'
import styled from 'styled-components'
import MapView from "react-native-map-clustering";
import LocationContext from '../LocationContext'
import { Wrapper, TouchView } from '../styles/Styles'
// import { PROVIDER_GOOGLE } from 'react-native-maps' 


export default function MapContainer(  {setSelectedLocation, selectedLocation} ) {
  
  const {locations} = React.useContext(LocationContext)
  const [contextLocations, setContextLocations] = locations

  console.log(selectedLocation)

  const region = {
    latitude: 40.8798295,
    longitude: -73.8614968,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03
  }

  const bigView = styled.View`
    flex: 1,
    background-color: '#fff',
    align-items: center,
    justify-content: center,
  `

  return (
      <View style={styles.container}>
        <MapView 
        clusterColor={"orange"}
        extent={110}
        animationEnabled={false}
        // fitToCoordinates={selectedLocation ? {coordinates: [selectedLocation.latitude, selectedLocation.longitude]} : null}
        initialRegion={region}
          style={styles.map}
          showsUserLocation={true}
          // provider={PROVIDER_GOOGLE}
        >
          {contextLocations.map((location, index) => {
            return (
              <Marker 
                key={index}
                coordinate={{latitude: location.latitude, longitude: location.longitude}} 
              >
                <TouchView onPress={() => setSelectedLocation(location)}>
                  <Text>{location.name}💩</Text>
                </TouchView>
              </Marker>
            )
          }
          )}
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