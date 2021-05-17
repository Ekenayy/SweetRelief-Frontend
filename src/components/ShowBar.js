import React from 'react'
import { Text, H2, Wrapper, Button, Scroll, TouchView } from '../styles/Styles'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components'
import { createOpenLink } from 'react-native-open-maps';

function ShowBar ( {selectedLocation, setModalVisible, modalVisible} ) {

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
        end: selectedLocation.address,
        provider: 'google',
        zoom: 30,
        travelType: 'walk'
    })


    return (
        <ShowScroll
            horizontal={true}
            showsHorizontalScrollIndicator={true}
        >
            <Options onPress={openDirections}>
                <FontAwesome5 name="directions" size={24} color="black" />
                <OptionsText>Directions</OptionsText>
            </Options>
            <Options>
                <FontAwesome name="exchange" size={24} color="black" />
                <OptionsText>Pay</OptionsText>
            </Options>
            <Options onPress={() => setModalVisible(!modalVisible)}>
                <MaterialIcons name="add-comment" size={24} color="black" />
                <OptionsText>Comment</OptionsText>
            </Options>
            <Options>
                <MaterialIcons name="favorite" size={24} color="black" />
                <OptionsText>Favorite</OptionsText>
            </Options>
            <Options>
                <MaterialIcons name="add-location-alt" size={24} color="black" />
                <OptionsText>Add location</OptionsText>
            </Options>
        </ShowScroll>
    )
}

export default ShowBar