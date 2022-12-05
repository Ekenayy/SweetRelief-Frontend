import React, {useState}  from 'react'
import { Text, H2, Wrapper, Button, Scroll, TouchView } from '../styles/Styles'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components'
import { createOpenLink } from 'react-native-open-maps';
import { BASE_URL } from '@env'

function ShowBar ( {handleIconPress, commented, localLocIds, setLocalLocIds, selectedLocation, currentUser, comments} ) {

    
    const Options = styled(Button)`
        margin: 5px 15px;
        margin-top: 0px;
        margin-bottom: 0px;
        flex-direction: row;
    `

    const FirstOption = styled(Options)`
        margin-left: 2px
    `

    const ShowScroll = styled(Scroll)`
        margin-top: 5px;
        height: 40px;
    `

    const OptionsText = styled(Text)`
        padding-left: 5px;
        padding-right: 10px;
        padding-bottom: 2px;
    `

    const LogoView = styled.View`
        border-radius: 600px; 
        align-items: center;
        border-width: 2px;
        border-color: #F4A261
    `

    const openDirections = createOpenLink({
        end: selectedLocation.address,
        provider: 'google',
        zoom: 30,
        travelType: 'walk'
    })

    // const myComments = comments.find(comment => comment.user.id === currentUser.id)
    const favorited = localLocIds.includes(selectedLocation.id);

    const handleFavorite = () => {
        let formBody = {
            user_id: currentUser.id,
            location_id: selectedLocation.id
        }

        fetch(`${BASE_URL}/favorites`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(r => r.json())
            .then(data => setLocalLocIds([...localLocIds, data.location.id]))
    }

    const handleUnFavorite = () => {
        let formBody = {
            user_id: currentUser.id,
            location_id: selectedLocation.id
        }

        fetch(`${BASE_URL}/custom_delete`, {
            method: 'DELETE', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(r => r.json())
            .then(data => {
                let newList = localLocIds.filter((locId) => locId !== data.location_id)
                setLocalLocIds(newList)
            })
    }
    
    console.log(commented);
    return (
        <ShowScroll
            horizontal={true}
            showsHorizontalScrollIndicator={true}
        >
            <FirstOption onPress={openDirections}>
                        <FontAwesome5 name="directions" size={24} color="#F4A261" />
                    <OptionsText>Directions</OptionsText>
            </FirstOption>
            {selectedLocation.marketing_link ? <Options onPress={() => handleIconPress('discover')}>
                <FontAwesome5 name="hiking" size={24} color="#F4A261" />
                <OptionsText>Discover</OptionsText>
            </Options> : null}
            { selectedLocation.free ? null : 
            <Options onPress={() => handleIconPress('pay')}>
                    <FontAwesome name="exchange" size={24} color="#F4A261" />
                    <OptionsText>Pay</OptionsText>
            </Options>}
            {commented ? null : 
                <Options onPress={() => handleIconPress('comment')}>
                    <MaterialIcons name="add-comment" size={24} color="#F4A261" />
                    <OptionsText>Comment</OptionsText>
                </Options>}
            {favorited ? 
                <Options onPress={handleUnFavorite}>
                    <FontAwesome5 name="heart-broken" size={24} color="#F4A261" />
                    <OptionsText>Unfavorite</OptionsText> 
                </Options>
                : 
                <Options onPress={handleFavorite}>
                    <MaterialIcons name="favorite" size={24} color="#F4A261" />
                    <OptionsText>Favorite</OptionsText> 
                </Options>
            }
            {/* <Options>
                <MaterialIcons name="add-location-alt" size={24} color="#DDF8E8" />
                <OptionsText>Add location</OptionsText>
            </Options> */}
        </ShowScroll>
    )
}

export default ShowBar