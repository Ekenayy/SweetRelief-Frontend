import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapContainer from '../components/MapContainer'
import NavBar from '../components/NavBar'
import LocationContext from '../LocationContext'
import MapView, {AnimatedRegion} from "react-native-map-clustering";
import * as geolib from 'geolib'

function Main ( ) {

    const [selectedLocation, setSelectedLocation] = useState(null)
    const [distance, setDistance] = useState(null)
    const {userLocation} = React.useContext(LocationContext)
    const [contextUserLocation, setContextUserLocation] = userLocation
    const wholeMap = useRef()

    const setAndGetDistance = (location) => {
        setSelectedLocation(location)

        let latLongs = [contextUserLocation, {latitude: location.latitude,
            longitude: location.longitude}]
        
        // Gets the distance between the two coordinates via geolib API and sets in state
        let thisDistance = geolib.getDistance(contextUserLocation, latLongs[1])
        let convertedDistance = geolib.convertDistance(thisDistance, 'mi')
        setDistance(convertedDistance.toFixed(2))

        // Focuses the map on the two locations using ref
        wholeMap.current.fitToCoordinates(latLongs, { edgePadding: { top: 10, right: 50, bottom: 100, left: 50 }, animated: true })
    }

    return (
        <>
            <MapContainer wholeMap={wholeMap} handlePress={setAndGetDistance} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
            <NavBar handlePress={setAndGetDistance} distance={distance} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
        </>
    )
}

export default Main