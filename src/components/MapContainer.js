import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


export default function MapContainer() {
    return (
      <View style={styles.container}>
        <MapView 
          style={styles.map}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
        /> 
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