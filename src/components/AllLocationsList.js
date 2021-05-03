import React from 'react'
import LocationItem from './LocationItem'
import { Text, Scroll } from '../styles/Styles'
import LocationContext from '../LocationContext'

function AllLocationsList ({selectedLocation, setSelectedLocation, filters}) {

    const {locations} = React.useContext(LocationContext)
    const [contextLocations, setContextLocations] = locations

    // Given the paramters that comes back from the filter bar, I want to filter these locations
    // I need to do it by their attributes but I don't want to hardcode each one in

    const twentyFiveLocations = contextLocations.slice(0, 25).map((location) => {
        return <LocationItem key={location.id} setSelectedLocation={setSelectedLocation} location={location} />
    })

    return (
        <Scroll>
            {twentyFiveLocations}
        </Scroll>
        
    )

}

export default AllLocationsList