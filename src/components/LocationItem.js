import React from 'react'
import { Text, Wrapper, TouchView } from '../styles/Styles'
import styled from 'styled-components'

function LocationItem ( {location}) {

    const {name, address, locType, free, upvotes, downvotes, price_cents, unisex, key_required, wheelchair_accessible, id} = location

    const LocationView = styled(TouchView)`
        margin-top: 10px;
        borderBottomWidth: .5px;
    `

    const DetailsView = styled(Wrapper)`
        flex-direction: row;
        padding-bottom: 10px;
    `

    return (
        <LocationView>
            <DetailsView>
                <Text>
                    {address}
                </Text>
            </DetailsView>
        </LocationView>
    )
}

export default LocationItem