import React, {useState, useEffect} from 'react'
import { Text, H2, Wrapper, Button, PurpButton, CloseView, CloseText, Scroll } from '../styles/Styles'
import styled from 'styled-components'
import LocationContext from '../LocationContext'
import ShowBar from './ShowBar'
import CommentItem from './CommentItem'
import { createOpenLink } from 'react-native-open-maps';
import { AntDesign } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { MaterialIcons } from '@expo/vector-icons';
import { BASE_URL } from '@env'

function LocationShow ({commentCount, setCommentCount, avgRating, commented, modalContent, favoriteLocIds, setFavoriteLocIds, setModalContent, modalVisible, currentUser, comments, setComments, setModalVisible, setSelectedLocation, selectedLocation}) {

    const {name, address, locType, free, walkTime, distance, baby_changing_station, upvotes, downvotes, price_cents, unisex, key_required, wheelchair_accessible, id} = selectedLocation
    const {locations} = React.useContext(LocationContext)
    const [contextLocations, setContextLocations] = locations

    const [localLocIds, setLocalLocIds] = useState(favoriteLocIds)
    

    const Span = styled(Text)`
        align-self: center;
        color: #F7F8F3;
        margin-top: 5px;
        font-weight: bold;
    `

    const DetailsText = styled(Text)`
        color: #F7F8F3;
        margin-bottom: 3px;
        font-weight: 400;
    `

    const SectionWrapper = styled(Wrapper)`
        margin-left: 0px;
        margin-top: 0px;
        margin-right: 5px;        
        padding: 15px;
        padding-left: 5px;
        border-bottom-width: .5px;
        border-color: #F7F8F3;
    `

    const DetailsWrapper = styled(Wrapper)`
        margin-top: 2px;
        padding-top: 10px;
        margin-left: 0px;
    `

    const VoteButton = styled(Button)`
        margin: 10px;
    `

    const ClearButton = styled(Button)`
        background-color: #bea7e5;
        width: 140px;
        margin-top: 10px;
        height: 30px;
    `

    const ButtonView = styled(Wrapper)`
        flex-direction: row;
        align-self: center;
        align-items: center;
        margin-left: 0px;
    `

    const BigWrapper = styled(Wrapper)`
        margin-left: 0px;
        flex: 1;
    `
    
    const ShowScroll = styled(Scroll)`
        padding-bottom: ${props => props.comments ? '150px' : '220px'}
    `

    const HeaderWrapper = styled.View`
        flex-direction: row;
        justify-content: space-between;
    `

    const RatingView = styled.View`
        flex-direction: row;
        align-items: center;
    `

    const InfoText = styled(Text)`
        font-size: 20px;
    `
    const HeaderView = styled(Wrapper)`
        display: flex;
        flex-direction: column;
        margin-left: 22px;
    `

    const SectionTitle = styled(H2)`
        color: #F7F8F3
        font-weight: 500;
    `

    const TitleView = styled.View`
        flex-direction: row;
        justify-content: space-between;
    `

    const CancelView = styled.TouchableOpacity`
        padding-right: 15px;
    `

    const gotComments = comments.length > 0

    const AllComments = () => 
        comments.slice(0, 3).map((comment) => {
            return <CommentItem key={comment.id} comment={comment}/>
    })

    const averageRating = () => {

        if (avgRating > 1) {
            // let totalNumber = comments.reduce( (a, b) => ({rating: a.rating + b.rating}))
            // console.log(comments)
            // let averageNumber = (totalNumber / comments.length)
            return avgRating
        } else {
            return 'No reviews yet'
        }
    }

    const handleClear = () => {
        setFavoriteLocIds(localLocIds)
        setSelectedLocation(null)
    }

    const handleButtonPress = (keyword) => {
        setModalContent(keyword)
        setModalVisible(!modalVisible)
    }



    // Figure out how to provide an answer for null attributes (What if we don't know?)
    // Use the first part for the bathroom details
    // Use the second part to allow the business to load up their value prop

    return (
        <BigWrapper>
            <HeaderView>
                <TitleView>
                    <InfoText numberOfLines={2}>{name}</InfoText>
                    <CancelView onPress={handleClear}>
                        <MaterialIcons name="cancel" size={24} color="#bea7e5" />
                    </CancelView>
                </TitleView>
                <RatingView>
                    <Text>{averageRating()}</Text>
                    {gotComments ? 
                        <AntDesign name="heart" size={14} color="#FF7070" style={{marginLeft: 6, marginRight: 6}} /> 
                        :
                        null }
                    {gotComments ? <Text> ({commentCount})</Text> : null}
                    {baby_changing_station ? <Text>Changing station</Text> : null}
                </RatingView>
                <RatingView>
                    <Text>{locType}</Text>
                    <Text>  *  </Text>
                    <Text>{`${distance} mi`}</Text>
                </RatingView>
                <RatingView>
                    {free ? <Text>Free</Text> : null}
                    {unisex ? <Text>Gender neutral</Text> : null}
                    {wheelchair_accessible ? <Text>Wheelchair accessible</Text> : null}
                </RatingView>
            </HeaderView>
            <ShowBar commented={commented} handleIconPress={handleButtonPress} localLocIds={localLocIds} setLocalLocIds={setLocalLocIds} currentUser={currentUser} comments={comments} selectedLocation={selectedLocation}/>
            <ShowScroll
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                comments={comments.length > 0}
            >
                <SectionWrapper>
                    <SectionTitle>Details</SectionTitle>
                    <DetailsWrapper>
                        <DetailsText>{free ? 'This location is free' : `This location charges $${price_cents}`}</DetailsText>
                        <DetailsText>{key_required ? 'Requires a key' : 'No key needed'}</DetailsText>
                        <DetailsText>{unisex ? 'Unisex' : 'Gender separated'}</DetailsText>
                    </DetailsWrapper>
                </SectionWrapper>
                <SectionWrapper>
                    <SectionTitle>
                    Overview
                    </SectionTitle>
                    <DetailsWrapper>
                        <DetailsText>A deep menu of Indian dishes served in a classic setting delivery available</DetailsText>
                        <DetailsText>{address}</DetailsText>
                    </DetailsWrapper>
                </SectionWrapper>
                <SectionWrapper>
                    <HeaderWrapper>
                        <SectionTitle>Reviews</SectionTitle>
                        <RatingView>
                            {comments.length ? 
                            <> 
                                <SectionTitle>{`${averageRating()} / 5`}</SectionTitle>
                                <AntDesign name="heart" size={18} color="#FF7070" style={{marginLeft: 5}} />  
                            </> : 
                            <SectionTitle>No reviews yet</SectionTitle>}
                        </RatingView>
                    </HeaderWrapper>
                    <DetailsWrapper>
                        {comments.length ? <AllComments/> : null}
                        { comments.length > 3 ? <ClearButton onPress={() => handleButtonPress('comment list')}>
                                <Span>More Reviews</Span>
                            </ClearButton> : null}
                    </DetailsWrapper>
                </SectionWrapper>
            </ShowScroll>
        </BigWrapper>
    )
}

export default LocationShow 