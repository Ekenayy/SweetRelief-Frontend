import React, {useState} from 'react'
import { Text, H2, Wrapper, Button, Scroll } from '../styles/Styles'
import styled from 'styled-components'


function LocationShow ({setSelectedLocation, selectedLocation}) {

    const {name, address, locType, free, upvotes, downvotes, price_cents, unisex, key_required, wheelchair_accessible, id} = selectedLocation
    // The Name of the location
    // The address

    const [stateUpVotes, setStateUpvotes] = useState(upvotes)
    const [stateDownVotes, setStateDownvotes] = useState(downvotes)

    const Span = styled(Text)`
        align-self: center;
        padding-top 50px;
        color: black;
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

    const ButtonView = styled(Wrapper)`
        flex-direction: row;
        align-self: center;
    `


    // Comments and Reviews Plus ability to vote up and down
    // Add icons for each detail 
    // Figure out how to provide an answer for null attributes (What if we don't know?)
    return (
        <Wrapper>
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
            <Button onPress={() => setSelectedLocation(null)}>
                <Span>Clear Search</Span>
            </Button>
        </Wrapper>
    )

}

export default LocationShow 