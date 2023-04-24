import React, { useState } from 'react'
import { Text, H2, Wrapper, Button, Scroll } from '../styles/Styles'
import styled from 'styled-components'
import ShowBar from './ShowBar'
import CommentItem from './CommentItem'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';

function LocationShow ({commentCount, setAvgRating, setCommentCount, avgRating, commented, favoriteLocIds, setFavoriteLocIds, setModalContent, modalVisible, currentUser, comments, setModalVisible, setSelectedLocation, selectedLocation}) {

    const {name, address, description, promotions, locType, free, distance, baby_changing_station, price_cents, unisex, key_required, wheelchair_accessible, walkTime} = selectedLocation
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

    const AttrView = styled.View`
        flex-direction: row;
        padding-right: 5px;
    `

    const AttrText = styled(Text)`
        margin-right: 7px;
    `
    const gotComments = comments.length > 0

    const AllComments = () => 
        comments.slice(0, 3).map((comment) => {
            return <CommentItem key={comment.id} comment={comment}/>
    })

    const RatingComp = () => {
        switch (true) {
            case (comments.length > 0):
                return (
                    <>
                        <Text>{avgRating}</Text>
                            <AntDesign name="heart" size={14} color="#FF7070" style={{marginLeft: 6, marginRight: 6}} /> 
                        <Text> ({commentCount})</Text>
                    </>
                )
            case (comments.length === 0): 
                    return (
                        <Text>No Reviews yet</Text>
                    )
            default:
                return null
        }
    }

    const allPromotions = promotions.map(prom => {
        return <DetailsText key={uuid.v4()}>{prom}</DetailsText>
    })

    const handleClear = () => {
        setFavoriteLocIds(localLocIds)
        setAvgRating(null)
        setCommentCount(null)
        setSelectedLocation(null)
    }

    const handleButtonPress = (keyword) => {
        setModalContent(keyword)
        setModalVisible(!modalVisible)
    }

    // Figure out how to provide an answer for null attributes (What if we don't know?)
    
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
                    <RatingComp/>
                </RatingView>
                <RatingView>
                    <Text>{locType}</Text>
                    <Text> * </Text>
                    <Text>{`${distance} mi`}</Text>
                    <Text> * </Text>
                    <Text>{`${walkTime} mins`}</Text>
                </RatingView>
                <AttrView>
                    {unisex && <AttrText>Gender neutral</AttrText>}
                    {wheelchair_accessible && <AttrText>Wheelchair accessible</AttrText>}
                    {baby_changing_station && <AttrText>Changing station</AttrText>}
                </AttrView>
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
                    <DetailsWrapper numberOfLines={1}>
                        <DetailsText>{free ? 'This location is free' : `This location charges $${price_cents}`}</DetailsText>
                        <DetailsText>{key_required ? 'Requires a key' : 'No key needed'}</DetailsText>
                        <DetailsText>{unisex ? 'Gender Neutral' : 'Gender separated'}</DetailsText>
                    </DetailsWrapper>
                </SectionWrapper>
                { description ? <SectionWrapper>
                    <SectionTitle>Overview</SectionTitle>
                    <DetailsWrapper>
                        <DetailsText>{description}</DetailsText>
                        <DetailsText>{address}</DetailsText>
                    </DetailsWrapper>
                </SectionWrapper> : null}
                {promotions.length ? 
                    <SectionWrapper>
                        <SectionTitle>Promotions</SectionTitle>
                        <DetailsWrapper>
                            {allPromotions}
                        </DetailsWrapper>
                    </SectionWrapper> 
                    : null
                }
                <SectionWrapper>
                    <HeaderWrapper>
                        <SectionTitle>Reviews</SectionTitle>
                        <RatingView>
                            {comments.length ? 
                            <> 
                                <SectionTitle>{`${avgRating} / 5`}</SectionTitle>
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