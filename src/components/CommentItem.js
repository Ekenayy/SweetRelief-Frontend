import React from 'react';
import styled from "styled-components";

function CommentItem ( {comment, inModal}) {

    const {description, rating, still_open} = comment

    const RatingView = styled.View`
        borderBottomWidth:  ${props => props.inModal ? '0px' : '.25px'}
        border-color: ${props => props.inModal ? '#1C1C1C' : '#F7F8F3'}
        margin-top: 10px;
        min-width: 100%;
    `

    const AuthorDetails = styled.View`
        flex-direction: row;
    `
    const Avatar = styled(AuthorDetails)`
    `

    const AvatarImage = styled.Image`
        width: 40px;
        height: 40px;
        border-radius: 20px;
    `

    const TextView = styled.View`
        margin-top: 10px;
        padding-bottom: 15px;
        max-width: 95%
    `

    const Text = styled.Text`
        color: ${props => props.inModal ? '#1C1C1C' : '#F7F8F3'}
        margin-left: 5px;
    `
    const Name = styled(Text)`
        align-self: flex-start;
        margin-left: 5px;
        font-weight: bold;
        color: ${props => props.inModal ? '#1C1C1C' : '#F7F8F3'}
    `
    const InfoView = styled.View`
        align-self: center;
    `

    return( 
        <RatingView inModal={inModal}>
            <AuthorDetails>
                <Avatar>
                    <AvatarImage source={{uri: 'https://media.defense.gov/2020/Feb/19/2002251686/700/465/0/200219-A-QY194-002.JPG'}}/>
                </Avatar>
                <InfoView>
                    <Name inModal={inModal}>{comment.user.name}</Name>
                    {comment.still_open && <Text inModal={inModal}>Says the bathroom is {comment.still_open ? 'open' : 'closed'}</Text>}
                </InfoView>
            </AuthorDetails>
            <TextView>
                <Text inModal={inModal}>{rating} out of 5</Text>
                <Text inModal={inModal}>{description}</Text>
            </TextView>
        </RatingView>
    )
}

export default CommentItem