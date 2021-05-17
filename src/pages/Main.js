import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapContainer from '../components/MapContainer'
import NavBar from '../components/NavBar'
import LocationContext from '../LocationContext'
import MapView, {AnimatedRegion} from "react-native-map-clustering";
import CommentForm from '../components/CommentForm'
import { BASE_URL } from '@env'
import * as geolib from 'geolib'

function Main ( {currentUser, setCurrentUser} ) {

    // State
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    // Context
    const {userLocation, locations} = React.useContext(LocationContext)
    const [contextUserLocation, setContextUserLocation] = userLocation
    const [contextLocations, setContextLocations ] = locations

    // Refs
    const wholeMap = useRef()

    const setAndFitToCoords = (location) => {
        fetchLocation(location)

        let latLongs = [contextUserLocation, {latitude: location.latitude,
            longitude: location.longitude}]
        // Focuses the map on the two locations using ref
        wholeMap.current.fitToCoordinates(latLongs, { edgePadding: { top: 10, right: 50, bottom: 100, left: 50 }, animated: true })
    }

    const fetchLocation = (location) => {
        fetch(`${BASE_URL}/locations/${location.id}`)
            .then(r => r.json())
            .then(locFromDb => setSelectedLocation(locFromDb))
    }

    return (
        <>
            <MapContainer wholeMap={wholeMap} handlePress={setAndFitToCoords} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
            <NavBar  modalVisible={modalVisible} setModalVisible={setModalVisible} handlePress={setAndFitToCoords} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
            {modalVisible ? <CommentForm currentUser={currentUser} modalVisible={modalVisible} selectedLocation={selectedLocation} setModalVisible={setModalVisible} /> : null}
        </>
    )
}

export default Main