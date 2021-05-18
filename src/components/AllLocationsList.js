import React, {useEffect, useState} from 'react'
import LocationItem from './LocationItem'
import { Text, Scroll } from '../styles/Styles'
import LocationContext from '../LocationContext'
import styled from 'styled-components'
import * as geolib from 'geolib'


function AllLocationsList ({filterBy, setFilterBy, handlePress, distance, setDistance, selectedLocation, setSelectedLocation, filters}) {

    const {locations, userLocation} = React.useContext(LocationContext)
    const [contextLocations, setContextLocations] = locations
    const [contextUserLocation, setContextUserLocation] = userLocation
    const [sortedLocations, setSortedLocations] = useState([])

    const LocationsScroll = styled(Scroll)`
        margin-left: 0px;
    `;

    const twentyFiveLocations = contextLocations.slice(0, 25).map((location) => {
        return <LocationItem key={location.id} handlePress={handlePress} distance={distance} setDistance={setDistance} setSelectedLocation={setSelectedLocation} location={location} />
    })

    let filterName = filterBy 

    const filteredLocations = twentyFiveLocations.filter((location) => 
        location.filterName !== false
        // console.log( "line 28 all")
        )


    return (
        <LocationsScroll>
            {filteredLocations}
        </LocationsScroll>
        
    )

}

export default AllLocationsList