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
    const [comments, setComments] = useState([])
    const [filterBy, setFilterBy] = useState(null);

    // Context
    const {userLocation, locations} = React.useContext(LocationContext)
    const [contextUserLocation, setContextUserLocation] = userLocation
    const [contextLocations, setContextLocations ] = locations
    // Refs
    const wholeMap = useRef()

    useEffect(() => {
        if (selectedLocation) {
        }
    }, [selectedLocation])

    const setAndFitToCoords = (location) => {
        fetchLocation(location)

        let latLongs = [contextUserLocation, {latitude: location.latitude,
            longitude: location.longitude}]
        // Focuses the map on the two locations using ref
        wholeMap.current.fitToCoordinates(latLongs, { edgePadding: { top: 10, right: 100, bottom: 150, left: 100 }, animated: true })
    }

    const fetchLocation = (location) => {
        fetch(`${BASE_URL}/locations/${location.id}`)
            .then(r => r.json())
            .then(locFromDb => setSelectedLocation({...location, locFromDb}))

        fetchComments(location.id)
    }

    const fetchComments = (id) => {
        fetch(`${BASE_URL}/comments/${id}`, {method: 'POST'})
                .then(r => r.json())
                .then(commentsFromDb => setComments(commentsFromDb))
    }

    // Currently everything is waiting for selectedLocation which doesn't have comments
    // We want everything that deals with comments to wait to see if comments event exist 
    // comments.length? 
    return (
        <>
            <MapContainer filterBy={filterBy} setFilterBy={setFilterBy} wholeMap={wholeMap} handlePress={setAndFitToCoords} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
            <NavBar filterBy={filterBy} setFilterBy={setFilterBy} currentUser={currentUser} setComments={setComments} comments={comments}  modalVisible={modalVisible} setModalVisible={setModalVisible} handlePress={setAndFitToCoords} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
            {modalVisible ? <CommentForm setComments={setComments} comments={comments} currentUser={currentUser} modalVisible={modalVisible} selectedLocation={selectedLocation} setModalVisible={setModalVisible} /> : null}
        </>
    )
}

export default Main