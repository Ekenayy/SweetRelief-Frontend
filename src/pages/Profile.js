import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DarkText, H2, Wrapper, PurpButton, Scroll, Span, } from '../styles/Styles'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { BASE_URL } from '@env'



function Profile ( {navigation, currentUser, setCurrentUser}) {

    // Account details option -- Name and email next to a pencil icon. Name is in a solid header of color 
    // Past 5 orders in a list with an option to make it bigger
    // Settings?
    // Help and Support 

    const [selected, setSelected] = useState('view')
    const [orders, setOrders] = useState([])
    const [chosenOrder, setChosenOrder] = useState(null)
    const [limit, setLimit] = useState(5)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        let formBody = {
            user_id: currentUser.id,
            limit: 5,
            offset: 0,
        }

        fetch(`${BASE_URL}/user_orders`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(r => r.json())
            .then(data => setOrders(data))
    }, [offset])

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
        margin-top: 40px;
    `

    const TouchView = styled.TouchableOpacity`
        flex-direction: row;
        align-items: center;
    `
    const MainInfoView = styled.ScrollView`
        margin-top: 10px;
    `

    const AllInfoView = styled.View`
        margin-bottom: 10px;
    `
    const HeaderName = styled(H2)`
        font-size: 30px;
    `
    const Title = styled(H2)`
        align-self: center;
        margin-bottom: 15px;
        font-weight: bold;
    `
    const OneInfoView = styled.View`
        flex-direction: row;
        padding-left: 30px;
        margin-bottom: 5px;
        border-bottom-width: .5px;
        border-color: #a6a3a8;
        padding-bottom: 10px;
        padding-top: 10px;
    `

    const InfoText = styled(DarkText)`
        align-self: center;
        margin-left: 40px;
        font-size: 18px;
    `
    const OneOrderTouch = styled.TouchableOpacity`
        padding-left: 30px;
        border-bottom-width: .5px;
        border-color: #a6a3a8;
        padding-bottom: 10px;
        padding-top: 10px;
    `
    const DateTimeView = styled.View`
        flex-direction: row;
        margin-bottom: 5px;
    `
    const DateView = styled.View`
        flex-direction: row;
        align-items: center;
    `
    const TimeView = styled.View`
        flex-direction: row;
        margin-left: 15px;
        align-items: center;
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
                        <Ionicons name="person-outline" size={26} color="#F4A261" style={{marginRight: 20}} />
                        <InfoText>{currentUser.name}</InfoText>
                    </OneInfoView>
                    <OneInfoView>
                        <Fontisto name="email" size={26} color="#F4A261" style={{marginRight: 20}} />
                        <InfoText>{currentUser.email}</InfoText>
                    </OneInfoView>
                    <OneInfoView>
                        <Ionicons name="eye-outline" size={26} color="#F4A261" style={{marginRight: 20}} />
                        <InfoText>******</InfoText>
                    </OneInfoView>
                </AllInfoView>
                {orders ? <PastOrders/> : null}
                {/* <PastOrders/> */}
            </>
        )
    }
    // Date next to calendar icon
    // Name of the location
    // Amount 
    // 5 last orders read from currentUser.last_5_payment_orders

    // Should be able to enlarge the order onPress in a modal

    const last5Orders = orders.map((order) => {
        return (
            <OneOrderTouch>
                <DateTimeView>
                    <DateView>
                        <Fontisto name="date" size={20} color="#F4A261" style={{marginRight: 7}} />
                        <DarkText>{order.formatted_date}</DarkText>
                    </DateView>
                    <TimeView>
                        <MaterialCommunityIcons name="clock-outline" size={24} color="#F4A261" style={{marginRight: 7}} />
                        <DarkText>{order.formatted_time}</DarkText>
                    </TimeView>
                </DateTimeView>
                <H2>{order.location.name}</H2>
                <DarkText>{order.location.address}</DarkText>
                <DarkText>${order.price_cents}</DarkText>
                <DarkText>#{order.token}</DarkText>
            </OneOrderTouch>
        )
    })
    const PastOrders = () => {
        return (
            <>
                <Title>Order History</Title>
                <AllInfoView>
                    {last5Orders}
                </AllInfoView>
            </>
        )
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
                    <HeaderName>{currentUser.name}</HeaderName>
                </TextView>
                <OptionsView>
                    <TouchView onPress={() => setSelected('view')}>
                        <MaterialCommunityIcons name="magnify" size={24} color="black" style={{marginRight: 5}}/>
                        <DarkText>View</DarkText>
                    </TouchView>
                    <TouchView onPress={() => setSelected('edit')}>
                        <SimpleLineIcons name="pencil" size={22} color="black" style={{marginRight: 5}}/>
                        <DarkText>Edit</DarkText>
                    </TouchView>
                </OptionsView>
            </Header>
            <MainInfoView>
                <MainInfo/>
                <PurpButton onPress={() => navigation.navigate('Main')}>
                    <Span>To Map</Span>
                </PurpButton>
            </MainInfoView>
        </Body>
    )

}

export default Profile