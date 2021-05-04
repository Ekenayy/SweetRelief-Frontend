import React from 'react'
import { Text, Wrapper, TouchView } from '../styles/Styles'
import styled from 'styled-components'

function LocationItem ( {location, setSelectedLocation}) {

    const {name, address, locType, free, upvotes, downvotes, price_cents, unisex, key_required, wheelchair_accessible, id} = location

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