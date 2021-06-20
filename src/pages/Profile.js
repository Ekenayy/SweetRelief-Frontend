import React, { useState } from 'react'
import styled from 'styled-components'
import { DarkText, H2, Wrapper, PurpButton, Scroll, Span, } from '../styles/Styles'


function Profile ( {navigation, currentUser, setCurrentUser}) {

    // Account details option -- Name and email next to a pencil icon. Name is in a solid header of color 
    // Past 5 orders in a list with an option to make it bigger
    // Settings?
    // Help and Support 

    const [selected, setSelected] = useState(null)

    const Body = styled.View`
        flex: 1;
    `

    const Header = styled.View`
        padding-top: 50px;
        background: #bea7e5;
        height: 20%;
    `

    const TextView = styled.View`
        align-self: center;
        padding-top: 30px;
    `

    const OptionsView = styled.View`
        flex-direction: row;
        justify-content: space-around;
        margin-top: 50px;
    `

    const TouchView = styled.TouchableOpacity`
    `


    return (
        <Body>
            <Header>
                <TextView>
                    <H2>{currentUser.name}</H2>
                </TextView>
                <OptionsView>
                    <TouchView>
                        <DarkText>Account info</DarkText>
                    </TouchView>
                    <TouchView>
                        <DarkText>Past Orders</DarkText>
                    </TouchView>
                    <TouchView>
                        <DarkText>Support</DarkText>
                    </TouchView>
                </OptionsView>
            </Header>
            <PurpButton onPress={() => navigation.navigate('Main')}>
                    <Span>To Main</Span>
            </PurpButton>
        </Body>
    )

}

export default Profile