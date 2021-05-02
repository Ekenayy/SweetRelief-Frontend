import React from 'react'
import LocationItem from './LocationItem'
import { Text, Scroll } from '../styles/Styles'
import LocationContext from '../LocationContext'

function AllLocationsList ({selectedLocation, setSelectedLocation}) {

    const {locations} = React.useContext(LocationContext)

    const tenLocations = locations.slice(0, 10).map((location) => {
        return <LocationItem key={location.id} setSelectedLocation={setSelectedLocation} location={location} />
    })

    return (
        <Scroll>
            {tenLocations}
        </Scroll>
        
    )

}

export default AllLocationsList