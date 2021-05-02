import React from 'react'
import LocationItem from './LocationItem'
import { Text, Scroll } from '../styles/Styles'
import LocationContext from '../LocationContext'

function AllLocationsList ({selectedLocation, setSelectedLocation}) {

    const {locations} = React.useContext(LocationContext)
    const [contextLocations, setContextLocations] = locations

    const fifteenLocations = contextLocations.slice(0, 15).map((location) => {
        return <LocationItem key={location.id} setSelectedLocation={setSelectedLocation} location={location} />
    })

    return (
        <Scroll>
            {fifteenLocations}
        </Scroll>
        
    )

}

export default AllLocationsList