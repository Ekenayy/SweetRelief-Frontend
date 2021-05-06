import React from 'react'
import { Text, H2, Wrapper, Button, Scroll, TouchView } from '../styles/Styles'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components'

function ShowBar () {

    const Options = styled(Button)`
        margin: 5px 20px;
        flex-direction: row;
    `

    const ShowScroll = styled(Scroll)`
    `

    const OptionsText = styled(Text)`
        padding-left: 5px;
        padding-right: 10px;
        padding-bottom: 2px;
    `


    return (
        <ShowScroll
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <Options>
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