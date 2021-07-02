import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DarkText, H2, Wrapper, PurpButton, Scroll, Span, } from '../styles/Styles'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { BASE_URL } from '@env'

function PaymentOrder ( { order, chosenOrder, setChosenOrder, modalVisible, setModalVisible } ) {
    
    const {formatted_time, status, formatted_date, location, price_cents, token} = order

    const OneOrderTouch = styled.TouchableOpacity`
        padding-left: 30px;
        border-bottom-width: .5px;
        border-color: #a6a3a8;
        padding-bottom: 10px;
        padding-top: 10px;
    `
    const TopView = styled.View`
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

    const StatusView = styled.View`
        margin-left: 40px;
        align-self: center;
        flex-direction: row;
    `

    const StatusText = styled(DarkText)`
        color: ${props => props.status == 'paid' ? 'green' : 'red'}
    `
    
    const handlePress = () => {
        setChosenOrder(order)
        setModalVisible(true)
    }

    return (
        <OneOrderTouch onPress={handlePress}>
                <TopView>
                    <DateView>
                        <Fontisto name="date" size={20} color="#F4A261" style={{marginRight: 7}} />
                        <DarkText>{formatted_date}</DarkText>
                    </DateView>
                    <TimeView>
                        <MaterialCommunityIcons name="clock-outline" size={24} color="#F4A261" style={{marginRight: 7}} />
                        <DarkText>{formatted_time}</DarkText>
                    </TimeView>
                    <StatusView>
                        <DarkText>Status: </DarkText>
                        <StatusText status={status} >{status}</StatusText>
                    </StatusView>
                </TopView>
                <H2>{location.name}</H2>
                <DarkText>{location.address}</DarkText>
                <DarkText>${price_cents}</DarkText>
                <DarkText>#{token}</DarkText>
        </OneOrderTouch>
    )

}

export default PaymentOrder