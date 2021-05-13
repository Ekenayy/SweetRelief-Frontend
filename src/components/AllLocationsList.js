import React, {useEffect, useState} from 'react'
import LocationItem from './LocationItem'
import { Text, Scroll } from '../styles/Styles'
import LocationContext from '../LocationContext'
import styled from 'styled-components'
import * as geolib from 'geolib'


function AllLocationsList ({handlePress, distance, setDistance, selectedLocation, setSelectedLocation, filters}) {

    const {locations, userLocation} = React.useContext(LocationContext)
    const [contextLocations, setContextLocations] = locations
    const [contextUserLocation, setContextUserLocation] = userLocation
    const [sortedLocations, setSortedLocations] = useState([])

    // const sortByDistance = (locations) => {
    //     let newLocations = [];

    //     const numberCompare = (num1, num2) =>{
    //         return num1.distance-num2.distance
    //     };

    //     locations.map((location) => {
    //         const latLongs = [ contextUserLocation, {latitude: location.latitude,
    //             longitude: location.longitude}];
    //         let thisDistance = geolib.getDistance(contextUserLocation, latLongs[1]);
    //         let convertedDistance = geolib.convertDistance(thisDistance, 'mi')
    //         let roundedDistance = parseFloat(convertedDistance.toFixed(2))
    //         const updatedLocation = {...location, distance: roundedDistance}
    //         newLocations.push(updatedLocation)
    //     });

    //     let sortedByDistance = newLocations.sort(numberCompare);
    //     setSortedLocations(sortedByDistance)
    // };

    const LocationsScroll = styled(Scroll)`
        margin-left: 0px;
    `;

    const twentyFiveLocations = contextLocations.slice(0, 25).map((location) => {
        return <LocationItem key={location.id} handlePress={handlePress} distance={distance} setDistance={setDistance} setSelectedLocation={setSelectedLocation} location={location} />
    })

    return (
        <LocationsScroll>
            {twentyFiveLocations}
        </LocationsScroll>
        
    )

}

export default AllLocationsList