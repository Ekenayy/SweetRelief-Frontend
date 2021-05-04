import React from 'react'
import LocationItem from './LocationItem'
import { Text, Scroll } from '../styles/Styles'
import LocationContext from '../LocationContext'
import styled from 'styled-components'

function AllLocationsList ({selectedLocation, setSelectedLocation, filters}) {

    const {locations} = React.useContext(LocationContext)
    const [contextLocations, setContextLocations] = locations

    // Given the paramters that comes back from the filter bar, I want to filter these locations
    // I need to do it by their attributes but I don't want to hardcode each one in

    const LocationsScroll = styled(Scroll)`
        margin-left: 0px;
    `
    const twentyFiveLocations = contextLocations.slice(0, 25).map((location) => {
        return <LocationItem key={location.id} setSelectedLocation={setSelectedLocation} location={location} />
    })

    return (
        <LocationsScroll>
            {twentyFiveLocations}
        </LocationsScroll>
        
    )

}

export default AllLocationsList