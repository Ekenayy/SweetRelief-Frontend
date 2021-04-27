import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapContainer from '../components/MapContainer'
import NavBar from '../components/NavBar'

function Main ({locations}) {

    return (
        <>
            <MapContainer locations={locations} />
            <NavBar locations={locations}/>
        </>
    )
}

export default Main