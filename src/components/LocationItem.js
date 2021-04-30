import React from 'react'
import { Text, Wrapper } from '../styles/Styles'

function LocationItem ( {location}) {

    const {name, address, locType, free, upvotes, downvotes, price_cents, unisex, key_required, wheelchair_accessible, id} = location

    return (
    <Wrapper>
        <Text>
            {name}
        </Text>
    </Wrapper>
        
    )
}

export default LocationItem