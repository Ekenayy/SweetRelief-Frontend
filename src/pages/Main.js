import React, { useState, useEffect, useRef } from 'react'
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
    const [reviews, setReviews] = useState([])
    // Context
    const {userLocation, locations} = React.useContext(LocationContext)
    const [contextUserLocation, setContextUserLocation] = userLocation
    const [contextLocations, setContextLocations ] = locations
    // Refs
    const wholeMap = useRef()

    useEffect(() => {
        if (selectedLocation) {
            setReviews(selectedLocation.comments)
        }
    }, [selectedLocation])

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
            .then(locFromDb => setSelectedLocation({...location, comments: locFromDb.comments}))
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