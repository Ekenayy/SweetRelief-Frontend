import React from 'react'
import LocationItem from './LocationItem'
import { Text, Scroll } from '../styles/Styles'
import LocationContext from '../LocationContext'

function AllLocationsList ({selectedLocation, setSelectedLocation}) {

    const {locations} = React.useContext(LocationContext)
    const [contextLocations, setContextLocations] = locations

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