import React, { useState } from 'react'
import styled from 'styled-components'
import { DarkText, H2, Wrapper, PurpButton, Scroll, Span, } from '../styles/Styles'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';



function Profile ( {navigation, currentUser, setCurrentUser}) {

    // Account details option -- Name and email next to a pencil icon. Name is in a solid header of color 
    // Past 5 orders in a list with an option to make it bigger
    // Settings?
    // Help and Support 

    const [selected, setSelected] = useState('view')

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
    const MainInfoView = styled.View`
        margin-top: 10px;
    `

    const AllInfoView = styled.View`
    `
    const Title = styled(H2)`
        align-self: center;
    `
    const OneInfoView = styled.View`
        flex-direction: row;
        padding-left: 20px;
        margin-bottom: 5px;
        border-bottom-width: .5px;
        border-color: #a6a3a8;
    `

    // Name with an optional input component based on selected 
    // Email
    // Password 

    const ViewInfo = () => {
        return (
            <>
                <Title>View Info</Title>
                <AllInfoView>
                    <OneInfoView>
                        <Ionicons name="person-outline" size={24} color="#1C1C1C" style={{marginRight: 20}} />
                        <DarkText>{currentUser.name}</DarkText>
                    </OneInfoView>
                    <OneInfoView>
                        <Fontisto name="email" size={24} color="black" style={{marginRight: 20}} />
                        <DarkText>{currentUser.email}</DarkText>
                    </OneInfoView>
                    <OneInfoView>
                        <Ionicons name="eye-outline" size={24} color="black" style={{marginRight: 20}} />
                        <DarkText>******</DarkText>
                    </OneInfoView>
                </AllInfoView>
                {/* <PastOrders/> */}
            </>
        )
    }
    
    // 5 last orders read from currentUser.last_5_payment_orders
    const PastOrders = () => {

    }

    const EditInfo = () => {
        return (
            <>
                <DarkText>Hello from edit Info</DarkText>
            </>
        )
    }

    const MainInfo = () => {
        switch (selected) {
            case 'view': 
                return <ViewInfo/>
            case 'edit':
                return <EditInfo/>
            default: 
                return <ViewInfo/>
        }
    }

    return (
        <Body>
            <Header>
                <TextView>
                    <H2>{currentUser.name}</H2>
                </TextView>
                <OptionsView>
                    <TouchView onPress={() => setSelected('view')}>
                        <DarkText>View</DarkText>
                    </TouchView>
                    <TouchView onPress={() => setSelected('edit')}>
                        <DarkText>Edit</DarkText>
                    </TouchView>
                    {/* <TouchView onPress={() => setSelected('support')}>
                        <DarkText>Support</DarkText>
                    </TouchView> */}
                </OptionsView>
            </Header>
            <MainInfoView>
                <MainInfo/>
            </MainInfoView>
            <PurpButton onPress={() => navigation.navigate('Main')}>
                    <Span>To Main</Span>
            </PurpButton>
        </Body>
    )

}

export default Profile