import React from 'react'
import { Text, Scroll, Wrapper, Button } from '../styles/Styles'


function LocationShow ({setSelectedLocation, selectedLocation}) {

    // The Name of the location
    // The address

    // The details


    // Comments and Reviews Plus ability to vote up and down
    return (
        <Wrapper>
            <Text> Hello from Location Show</Text>
            <Button onPress={() => setSelectedLocation(null)}>
                <Text>Clear Search</Text>
            </Button>
        </Wrapper>
    )

}

export default LocationShow 