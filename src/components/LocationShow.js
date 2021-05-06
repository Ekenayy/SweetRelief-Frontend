import React, {useState, useEffect} from 'react'
import { Text, H2, Wrapper, Button, Scroll } from '../styles/Styles'
import styled from 'styled-components'
import LocationContext from '../LocationContext'


function LocationShow ({setSelectedLocation, selectedLocation}) {

    const {name, address, locType, free, upvotes, downvotes, price_cents, unisex, key_required, wheelchair_accessible, id} = selectedLocation


    const {locations} = React.useContext(LocationContext)
    const [contextLocations, setContextLocations] = locations
    // Add a navigate feature that pulls up the coordinates on google maps 

    const [stateUpVotes, setStateUpvotes] = useState(upvotes)
    const [stateDownVotes, setStateDownvotes] = useState(downvotes)

    const Span = styled(Text)`
        align-self: center;
        color: black;
        margin-top: 5px;
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
        border-radius: 5px;
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
        background-color: #f75348;
        width: 100px;
        margin-top: 10px;
        height: 30px;
    `

    const ButtonView = styled(Wrapper)`
        flex-direction: row;
        align-self: center;
    `

    useEffect(() => {
        setStateUpvotes(upvotes)
        setStateDownvotes(downvotes)
    }, [selectedLocation])
    // Comments and Reviews Plus ability to vote up and down
    // Add icons for each detail 
    // Figure out how to provide an answer for null attributes (What if we don't know?)
    // There's a qwerk where the number of votes doesn't reset when you click a new location 
    return (
        <Scroll>
            <SectionWrapper>
                <H2>Location</H2>
                <DetailsWrapper>
                    <DetailsText>{name}</DetailsText>
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
            <ButtonView>
                <ClearButton onPress={() => setSelectedLocation(null)}>
                    <Span>Clear Search</Span>
                </ClearButton>
            </ButtonView>
        </Scroll>
    )
}

export default LocationShow 