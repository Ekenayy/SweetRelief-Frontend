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
        wholeMap.current.fitToCoordinates(latLongs, { edgePadding: { top: 10, right: 50, bottom: 100, left: 50 }, animated: true })
    }

    // console.log(wholeMap.current)

    return (
        <>
            <MapContainer wholeMap={wholeMap} handlePress={setAndGetDistance} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
            <NavBar handlePress={setAndGetDistance} distance={distance} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
        </>
    )
}

export default Main