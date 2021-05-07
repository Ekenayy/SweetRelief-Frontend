import React from 'react'
import { Text, Wrapper, TouchView } from '../styles/Styles'
import styled from 'styled-components'
import * as geolib from 'geolib'
import LocationContext from '../LocationContext'

function LocationItem ( {location, setSelectedLocation}) {

    const {name, address, latitude, longitude, locType, free, upvotes, downvotes, price_cents, unisex, key_required, wheelchair_accessible, id} = location

    const {distance, userLocation} = React.useContext(LocationContext)
    const [contextDistance, setcontextDistance] = distance
    const [contextUserLocation, setcontextUserLocation] = userLocation

    const LocationView = styled(TouchView)`
        borderBottomWidth: .5px;
        padding-left: 0px;
    `

    const DetailsView = styled(Wrapper)`
        flex-direction: row;
        padding: 10px;
        padding-left: 20px;
        margin-left: 0px;
    `

    // const handlePress = () => {
    //     setSelectedLocation(location)
    //     let thisDistance = geolib.getDistance(contextUserLocation, {
    //         latitude,
    //         longitude
    //     })
    //     let convertedDistance = geolib.convertDistance(thisDistance, 'mi')
    //     // console.log(geolib.getDistance(contextUserLocation, {
    //     //     latitude,
    //     //     longitude
    //     // }))
    //     setcontextDistance(convertedDistance)
    // }

    console.log(contextDistance)


    return (
        <LocationView onPress={() => setSelectedLocation(location)}>
            <DetailsView>
                <Text>
                    {address}
                </Text>
            </DetailsView>
        </LocationView>
    )
}

export default LocationItem