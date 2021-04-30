import React from 'react'
import { Text, Wrapper, TouchView } from '../styles/Styles'
import styled from 'styled-components'
import LocationContext from '../LocationContext'

function LocationItem ( {location}) {

    const {name, address, locType, free, upvotes, downvotes, price_cents, unisex, key_required, wheelchair_accessible, id} = location


    const LocationView = styled(TouchView)`
        borderBottomWidth: .5px;
    `

    const DetailsView = styled(Wrapper)`
        flex-direction: row;
        padding: 10px;
    `

    return (
        <LocationView onPress={() => console.log(location.id)}>
            <DetailsView>
                <Text>
                    {address}
                </Text>
            </DetailsView>
        </LocationView>
    )
}

export default LocationItem