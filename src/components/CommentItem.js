import React from 'react';
import styled from "styled-components";

function CommentItem ( {comment}) {

    const {description, rating, still_open} = comment

    const RatingView = styled.View`
        borderBottomWidth: .5px;
        margin-top: 10px;
    `

    const AuthorDetails = styled.TouchableOpacity`
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
    `

    const Text = styled.Text`
        color: black;
        margin-left: 5px;
    `
    const Name = styled(Text)`
        align-self: flex-start;
        margin-left: 5px;
        font-weight: bold;
    `
    const InfoView = styled.View`
        align-self: center;
    `

    return( 
        <RatingView>
            <AuthorDetails>
                <Avatar>
                    <AvatarImage  source={{uri: 'https://media.defense.gov/2020/Feb/19/2002251686/700/465/0/200219-A-QY194-002.JPG'}}/>
                </Avatar>
                <InfoView>
                    <Name>{comment.user.name}</Name>
                </InfoView>
            </AuthorDetails>
            <TextView>
                <Text>{rating} out of 5</Text>
                <Text>{description}</Text>
            </TextView>
        </RatingView>
    )
}

export default CommentItem