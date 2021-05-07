import React from 'react'
import { Text, H2, Wrapper, Button, Scroll, TouchView } from '../styles/Styles'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components'
import { createOpenLink } from 'react-native-open-maps';

function ShowBar ( {selectedLocation} ) {

    const Options = styled(Button)`
        margin: 5px 20px;
        flex-direction: row;
    `

    const ShowScroll = styled(Scroll)`
        margin-top: 5px;
    `

    const OptionsText = styled(Text)`
        padding-left: 5px;
        padding-right: 10px;
        padding-bottom: 2px;
    `

    const openDirections = createOpenLink({
        latitude: selectedLocation.latitude, 
        longitude: selectedLocation.longitude,
        provider: 'google',
        zoom: 30
    })


    return (
        <ShowScroll
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <Options onPress={openDirections}>
                <FontAwesome5 name="directions" size={24} color="black" />
                <OptionsText>Directions</OptionsText>
            </Options>
            <Options>
                <MaterialIcons name="add-comment" size={24} color="black" />
                <OptionsText>Comment</OptionsText>
            </Options>
            <Options>
                <MaterialIcons name="favorite" size={24} color="black" />
                <OptionsText>Favorite</OptionsText>
            </Options>
        </ShowScroll>
    )
}

export default ShowBar