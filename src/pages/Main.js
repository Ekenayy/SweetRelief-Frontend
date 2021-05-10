import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapContainer from '../components/MapContainer'
import NavBar from '../components/NavBar'
import LocationContext from '../LocationContext'
import * as geolib from 'geolib'

function Main ( ) {

    const [selectedLocation, setSelectedLocation] = useState(null)
    const [distance, setDistance] = useState(null)
    const {userLocation} = React.useContext(LocationContext)
    const [contextUserLocation, setContextUserLocation] = userLocation

    const setAndGetDistance = (location) => {
        setSelectedLocation(location)
        let thisDistance = geolib.getDistance(contextUserLocation, {
            latitude: location.latitude,
            longitude: location.longitude
        })
        let convertedDistance = geolib.convertDistance(thisDistance, 'mi')
        // console.log(geolib.getDistance(contextUserLocation, {
        //     latitude,
        //     longitude
        // }))
        setDistance(convertedDistance.toFixed(2))
    }

    return (
        <>
            <MapContainer handlePress={setAndGetDistance} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
            <NavBar handlePress={setAndGetDistance} distance={distance} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
        </>
    )
}

export default Main