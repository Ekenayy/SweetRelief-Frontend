import React, {useEffect, useState} from 'react'
import LocationItem from './LocationItem'
import { Text, Scroll } from '../styles/Styles'
import LocationContext from '../LocationContext'
import styled from 'styled-components'


function AllLocationsList ({filterBy, favoriteLocIds, setFilterBy, handlePress, distance, setDistance, selectedLocation, setSelectedLocation, filters}) {

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

    const favoriteLocations = contextLocations.filter(location => {
        return favoriteLocIds.includes(location.id)
    }).map(location => {
        return <LocationItem key={location.id} handlePress={handlePress} distance={distance} setDistance={setDistance} setSelectedLocation={setSelectedLocation} location={location} />
    })


    const filterLocations = (locations) => {
        if (filterBy === null) {return locations}
        if (filterBy === "free") {
            return locations.filter((location) => location.props.location.free === true)
    }  if (filterBy === "key_required") {
            return locations.filter((location) => location.props.location.key_required === false)
    }  if (filterBy === "unisex") {
            return locations.filter((location) => location.props.location.unisex === true)
    }   if (filterBy === "wheelchair_accessible") {
            return locations.filter((location) => location.props.location.wheelchair_accessible === true)
        }
    };

    return (
        <LocationsScroll>
            {filterBy === 'favorites' ? favoriteLocations : filterLocations(twentyFiveLocations)}
        </LocationsScroll>
        
    )
};

export default AllLocationsList