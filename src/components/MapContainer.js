import React, {useState, useEffect, useContext, useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { GOOGLE_KEY } from '@env'
import styled from 'styled-components'
import MapView, {AnimatedRegion} from "react-native-map-clustering";
import LocationContext from '../LocationContext'
import { Wrapper, TouchView } from '../styles/Styles'
import MapViewDirections from 'react-native-maps-directions';
import { MaterialIcons } from '@expo/vector-icons'; 
// import { PROVIDER_GOOGLE } from 'react-native-maps' 


export default function MapContainer(  {filterBy, setFilterBy, setSelectedLocation, wholeMap, handlePress, selectedLocation} ) {
  
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
    switch (locType) {
      case 'Park':
        return <MaterialIcons name="park" size={30} color="#BEA7E5" />
      case 'Restaurant/Bar':
        return <MaterialIcons name="restaurant" size={30} color="black" />
      case 'Bar':
        return <MaterialIcons name="restaurant" size={30} color="black" />
      case 'Subway Station':
        return <MaterialIcons name="subway" size={24} color="#BEA7E5" />
    }
  }

  const reduceFilterList = (locations) => {
    if (filterBy === null) return locations;
    if (filterBy === "free") {
    return locations.filter((location) => 
    location.free === true
    )
}  if (
    filterBy === "key_required") {
    return locations.filter((location) => 
    location.key_required === false
    )
}  if (
    filterBy === "unisex") {
    return locations.filter((location) => 
    location.unisex !== false
    )
}   if (
    filterBy === "wheelchair_accessible") {
    return locations.filter((location) => 
    location.wheelchair_accessible !== false
    )
    }
};

const filteredLocations = reduceFilterList(contextLocations);

  const allLocations = filteredLocations.map((location, index) => {
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
          clusterColor={"#BEA7E5"}
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
              strokeColor="#BEA7E5"
              origin={contextUserLocation ? contextUserLocation : customLocation}
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