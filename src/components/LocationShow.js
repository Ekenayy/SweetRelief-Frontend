import React, {useState, useEffect} from 'react'
import { Text, H2, Wrapper, Button, Scroll } from '../styles/Styles'
import styled from 'styled-components'
import LocationContext from '../LocationContext'
import ShowBar from './ShowBar'
import CommentItem from './CommentItem'
import { createOpenLink } from 'react-native-open-maps';
import { AntDesign } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';

function LocationShow ({modalContent, favoriteLocIds, setFavoriteLocIds, setModalContent, modalVisible, currentUser, comments, setComments, setModalVisible, setSelectedLocation, selectedLocation}) {

    const {name, address, locType, free, walkTime, distance, baby_changing_station, upvotes, downvotes, price_cents, unisex, key_required, wheelchair_accessible, id} = selectedLocation
    const {locations} = React.useContext(LocationContext)
    const [contextLocations, setContextLocations] = locations

    const [stateUpVotes, setStateUpvotes] = useState(upvotes)
    const [stateDownVotes, setStateDownvotes] = useState(downvotes)

    const Span = styled(Text)`
        align-self: center;
        color: #F7F8F3;
        margin-top: 5px;
        font-weight: bold;
    `

    const DetailsText = styled(Text)`
        color: #F7F8F3;
        margin-bottom: 5px;
    `

    const SectionWrapper = styled(Wrapper)`
        margin-left: 0px;
        margin-top: 0px;
        margin-right: 15px;        
        padding: 15px;
        border-radius: 15px;
    `

    const DetailsWrapper = styled(Wrapper)`
        margin-top: 5px;
        borderTopWidth: .5px;
        border-color: #F7F8F3
        padding-top: 10px;
    `

    const VoteButton = styled(Button)`
        margin: 10px;
    `

    const ClearButton = styled(Button)`
        background-color: #bea7e5;
        width: 100px;
        margin-top: 10px;
        height: 30px;
        margin-left: 170px;
    `

    const ButtonView = styled(Wrapper)`
        flex-direction: row;
        align-self: center;
    `

    const BigWrapper = styled(Wrapper)`
        margin-left: 0px;
        flex: 1;
    `
    
    const ShowScroll = styled(Scroll)`
        padding-bottom: ${props => props.comments ? '100px' : '220px'}
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
        margin-left: 26px;
    `

    const SectionTitle = styled(H2)`
        color: #F7F8F3
    `

    const gotComments = comments.length > 0

    const AllComments = () => 
        comments.map((comment) => {
            return <CommentItem key={comment.id} comment={comment}/>
    })

    const averageRating = () => {

        if (comments.length > 1) {
            let totalNumber = comments.reduce( (a, b) => a.rating + b.rating)
            let averageNumber = (totalNumber / comments.length)
            return averageNumber
        } else if (comments.length == 1) {
            return comments[0].rating
        } else {
            return 'No ratings yet'
        }
    }

    // Figure out how to provide an answer for null attributes (What if we don't know?)
    // Use the first part for the bathroom details
    // Use the second part to allow the business to load up their value prop

    return (
        <BigWrapper>
            <HeaderView>
                <InfoText>{name}</InfoText>
                <RatingView>
                    <Text>{averageRating()}</Text>
                    {gotComments ? 
                        <AntDesign name="heart" size={14} color="#FF7070" style={{marginLeft: 6, marginRight: 6}} /> 
                        :
                        null }
                    {gotComments ? <Text> ({comments.length})</Text> : null}
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
            <ShowBar setSelectedLocation={setSelectedLocation} setFavoriteLocIds={setFavoriteLocIds} favoriteLocIds={favoriteLocIds} modalContent={modalContent} setModalContent={setModalContent} currentUser={currentUser} comments={comments} setModalVisible={setModalVisible} modalVisible={modalVisible} selectedLocation={selectedLocation}/>
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
                        <SectionTitle>Comments</SectionTitle>
                        <RatingView>
                            {comments.length ? 
                            <> 
                                <SectionTitle>{`${averageRating()} / 5`}</SectionTitle>
                                <AntDesign name="heart" size={18} color="#FF7070" style={{marginLeft: 5}} />  
                            </> : 
                            <SectionTitle>No Reviews yet</SectionTitle>}
                        </RatingView>
                    </HeaderWrapper>
                    <DetailsWrapper>
                        {comments.length ? <AllComments/> : null}
                    </DetailsWrapper>
                </SectionWrapper>
                {/* <SectionWrapper>
                    <SectionTitle>Votes</SectionTitle>
                    <ButtonView>
                        <VoteButton>
                            <Span onPress={() => setStateUpvotes(stateUpVotes + 1)}> 
                                {stateUpVotes} 👍 
                            </Span>
                        </VoteButton>
                        <VoteButton >
                            <Span onPress={() => setStateDownvotes(stateDownVotes + 1)}>
                                👎 {stateDownVotes}
                            </Span>
                        </VoteButton>
                    </ButtonView>
                </SectionWrapper> */}
            </ShowScroll>
        </BigWrapper>
    )
}

export default LocationShow 