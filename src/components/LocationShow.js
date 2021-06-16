import React, {useState, useEffect} from 'react'
import { Text, H2, Wrapper, Button, Scroll } from '../styles/Styles'
import styled from 'styled-components'
import LocationContext from '../LocationContext'
import ShowBar from './ShowBar'
import CommentItem from './CommentItem'
import { createOpenLink } from 'react-native-open-maps';


function LocationShow ({modalContent, setModalContent, modalVisible, currentUser, comments, setComments, setModalVisible, setSelectedLocation, selectedLocation}) {

    const {name, address, locType, free, walkTime, distance, upvotes, downvotes, price_cents, unisex, key_required, wheelchair_accessible, id} = selectedLocation
    const {locations} = React.useContext(LocationContext)
    const [contextLocations, setContextLocations] = locations


    // Add a navigate feature that pulls up the coordinates on google maps 

    const [stateUpVotes, setStateUpvotes] = useState(upvotes)
    const [stateDownVotes, setStateDownvotes] = useState(downvotes)

    const Span = styled(Text)`
        align-self: center;
        color: black;
        margin-top: 5px;
        font-weight: bold;
    `

    const DetailsText = styled(Text)`
        color: black;
        margin-bottom: 5px;
    `

    const SectionWrapper = styled(Wrapper)`
        margin-left: 0px;
        margin-top: 20px;
        margin-right: 15px;        
        padding: 15px;
        background-color: #fcfafa;
        border-radius: 15px;
    `

    const DetailsWrapper = styled(Wrapper)`
        margin-top: 5px;
        borderTopWidth: .5px;
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
        padding-bottom: 100px;
    `

    // useEffect(() => {
    //     setStateUpvotes(upvotes)
    //     setStateDownvotes(downvotes)
    // }, [selectedLocation])

    const AllComments = () => 
        comments.map((comment) => {
            return <CommentItem key={comment.id} comment={comment}/>
    })
    // Comments and Reviews Plus ability to vote up and down
    // Add icons for each detail 
    // Figure out how to provide an answer for null attributes (What if we don't know?)
    // There's a qwerk where the number of votes doesn't reset when you click a new location 
    return (
        <BigWrapper>
            <ShowBar modalContent={modalContent} setModalContent={setModalContent} currentUser={currentUser} comments={comments} setModalVisible={setModalVisible} modalVisible={modalVisible} selectedLocation={selectedLocation}/>
            <ShowScroll
            contentContainerStyle={{
                flexGrow: 1,
            }}
            >
                <SectionWrapper>
                    <H2>
                    Location
                        <ButtonView>
                            <ClearButton onPress={() => setSelectedLocation(null)}>
                                <Span>Clear Search</Span>
                            </ClearButton>
                        </ButtonView>
                    </H2>
                    <DetailsWrapper>
                        {/* <DetailsText>{distance} miles away</DetailsText> */}
                        <DetailsText>{`${name} is ${distance} miles away`}</DetailsText>
                        <DetailsText>{address}</DetailsText>
                        <DetailsText>{locType}</DetailsText>
                    </DetailsWrapper>
                </SectionWrapper>
                <SectionWrapper>
                    <H2>Details</H2>
                    <DetailsWrapper>
                        <DetailsText>{free ? 'This location is free' : 'This location is not free'}</DetailsText>
                        <DetailsText>{key_required ? 'Requires a key' : 'No key needed'}</DetailsText>
                        <DetailsText>{unisex ? 'Unisex' : 'Gender separated'}</DetailsText>
                    </DetailsWrapper>
                </SectionWrapper>
                <SectionWrapper>
                    <H2>Comments</H2>
                    <DetailsWrapper>
                        {comments.length ? <AllComments/> : null}
                    </DetailsWrapper>
                </SectionWrapper>
                <SectionWrapper>
                    <H2>Votes</H2>
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
                </SectionWrapper>
            </ShowScroll>
        </BigWrapper>
    )
}

export default LocationShow 