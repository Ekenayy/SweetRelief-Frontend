import React from 'react'
import { Text, H2, Wrapper, Button } from '../styles/Styles'
import styled from 'styled-components'


function LocationShow ({setSelectedLocation, selectedLocation}) {

    const {name, address, locType, free, upvotes, downvotes, price_cents, unisex, key_required, wheelchair_accessible, id} = selectedLocation
    // The Name of the location
    // The address

    // The details

    const Span = styled(Text)`
        align-self: center;
        padding-top 50px;
    `

    const AddressText = styled(Text)`
        color: black;
    `

    const AddressWrapper = styled(Wrapper)`
        margin-left: 0px;
        margin-top: 20px;
        margin-right: 15px;        
        padding: 15px;
        background-color: #fcfafa;
        border-radius: 5px;
    `

    const AddressDetails = styled(Wrapper)`
        margin-top: 5px;
        borderTopWidth: .5px;
        padding-top: 10px;
    `


    // Comments and Reviews Plus ability to vote up and down
    return (
        <Wrapper>
            <AddressWrapper>
                <H2>Location</H2>
                <AddressDetails>
                    <AddressText>{name}</AddressText>
                    <AddressText>{address}</AddressText>
                </AddressDetails>
            </AddressWrapper>
            <Button onPress={() => setSelectedLocation(null)}>
                <Span>Clear Search</Span>
            </Button>
        </Wrapper>
    )

}

export default LocationShow 