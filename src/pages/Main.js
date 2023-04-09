import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native';
import MapContainer from '../components/MapContainer'
import NavBar from '../components/NavBar'
import LocationContext from '../LocationContext'
import ShowModal from '../components/ShowModal'
import { BASE_URL } from '@env'
import { BlurView } from 'expo-blur';

function Main ( {currentUser, ios, navigation, setCurrentUser, setToken} ) {

    // State
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [comments, setComments] = useState([])
    const [avgRating, setAvgRating] = useState(null)
    const [filterBy, setFilterBy] = useState(null);
    const [modalContent, setModalContent] = useState('')
    const [favoriteLocIds, setFavoriteLocIds] = useState(currentUser.favorite_location_ids)
    const [commented, setCommented] = useState(false)
    const [commentCount, setCommentCount] = useState(0)

    // Context
    const {userLocation, locations} = React.useContext(LocationContext)
    const [contextUserLocation, setContextUserLocation] = userLocation
    
    // Refs
    const wholeMap = useRef(null)

    useEffect(() => {

        if (selectedLocation) {

            let formBody = {
                location_id: selectedLocation.id,
                user_id: currentUser.id
            }

            fetch(`${BASE_URL}/commented`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formBody)
            })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        setCommented(true)
                    } else {
                        setCommented(false)
                    }
                })
        }
            
    }, [selectedLocation])

    const setAndFitToCoords = (location) => {
        fetchLocation(location)

        let latLongs = [contextUserLocation, {latitude: location.latitude,
            longitude: location.longitude}]

        wholeMap.current.fitToCoordinates(latLongs, { edgePadding: { top: 10, right: 100, bottom: 150, left: 100 }, animated: true })
    }

    const fetchLocation = (location) => {
        fetch(`${BASE_URL}/locations/${location.id}`)
            .then(r => r.json())
            .then(locFromDb => setSelectedLocation({...location, locFromDb}))

        fetchComments(location.id)
    }

    const fetchComments = (id) => {

        fetch(`${BASE_URL}/location_comments/${id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({offset: 0})
        })
                .then(r => r.json())
                .then(data => {
                    if (data.errors) {
                        setComments([])
                        setAvgRating(0)
                    } else {
                        setComments(data.comments)
                        setAvgRating(data.average_rating)
                        setCommentCount(data.count)
                    }
                })
    }

    return ( 
            <>
                <MapContainer ios={ios} favoriteLocIds={favoriteLocIds} filterBy={filterBy} wholeMap={wholeMap} handlePress={setAndFitToCoords} selectedLocation={selectedLocation}/>
                <NavBar commentCount={commentCount} setCommentCount={setCommentCount} commented={commented} setAvgRating={setAvgRating} avgRating={avgRating} contextUserLocation={contextUserLocation} wholeMap={wholeMap} navigation={navigation} setFavoriteLocIds={setFavoriteLocIds} favoriteLocIds={favoriteLocIds} setToken={setToken} setCurrentUser={setCurrentUser} setModalContent={setModalContent} modalContent={modalContent} filterBy={filterBy} setFilterBy={setFilterBy} currentUser={currentUser} setComments={setComments} comments={comments}  modalVisible={modalVisible} setModalVisible={setModalVisible} handlePress={setAndFitToCoords} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
                {modalVisible ? <BlurView intensity={90} BlurTint='light' style={[StyleSheet.absoluteFill]}/> : null}
                {modalVisible ? <ShowModal setCommented={setCommented} avgRating={avgRating} setAvgRating={setAvgRating} setCommentCount={setCommentCount} setCurrentUser={setCurrentUser} commentCount={commentCount} modalContent={modalContent} setModalContent={setModalContent} setComments={setComments} comments={comments} currentUser={currentUser} modalVisible={modalVisible} selectedLocation={selectedLocation} setModalVisible={setModalVisible} /> : null}
            </>
    )
}

export default Main