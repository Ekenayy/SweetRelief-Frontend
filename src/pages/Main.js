import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapContainer from '../components/MapContainer'
import NavBar from '../components/NavBar'

function Main ( ) {

    const [selectedLocation, setSelectedLocation] = useState(null)
    // The location item and the MapContainer need to know have this state    
    return (
        <>
            <MapContainer setSelectedLocation={setSelectedLocation}/>
            <NavBar selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
        </>
    )
}

export default Main