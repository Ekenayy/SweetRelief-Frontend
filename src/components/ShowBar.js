import React, {useState}  from 'react'
import { Text, H2, Wrapper, Button, Scroll, TouchView } from '../styles/Styles'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components'
import { createOpenLink } from 'react-native-open-maps';
import { BASE_URL } from '@env'

function ShowBar ( {modalContent, favoriteLocIds, setFavoriteLocIds, setModalContent, selectedLocation, setSelectedLocation, currentUser, comments, setModalVisible, modalVisible} ) {

    const [localLocIds, setLocalLocIds] = useState(favoriteLocIds)

    const Options = styled(Button)`
        margin: 5px 15px;
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

    const myComments = comments.find(comment => comment.user.id === currentUser.id)
    const favorited = localLocIds.includes(selectedLocation.id);

    const handleIconPress = (keyword) => {
        setModalContent(keyword)
        setModalVisible(!modalVisible)
    }

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

    const handleClear = () => {
        setFavoriteLocIds(localLocIds)
        setSelectedLocation(null)
    }

    return (
        <ShowScroll
            horizontal={true}
            showsHorizontalScrollIndicator={true}
        >
            <Options onPress={handleClear}>
                <MaterialIcons name="cancel" size={24} color="#bea7e5" />
                <OptionsText>Clear Search</OptionsText>
            </Options>
            <Options onPress={openDirections}>
                <FontAwesome5 name="directions" size={24} color="#F4A261" />
                <OptionsText>Directions</OptionsText>
            </Options>
            { selectedLocation.free ? null : 
            <Options onPress={() => handleIconPress('pay')}>
                    <FontAwesome name="exchange" size={24} color="#F4A261" />
                    <OptionsText>Pay</OptionsText>
            </Options>}
            {myComments ? null : 
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