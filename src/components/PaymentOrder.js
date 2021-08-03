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
        border-bottom-width: ${props => props.modalVisible ? '0px' : '.5px'};
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
        margin-left: ${props => props.modalVisible ? '15px' : '40px'};
        align-self: center;
        flex-direction: row;
    `

    const StatusText = styled(DarkText)`
        color: ${props => props.status == 'paid' ? 'green' : 'red'}
    `

    const OrderText = styled(DarkText)`
        margin-bottom: ${props => props.modalVisible ? '7px' : '2px'}
    `

    const OrderH2 = styled(H2)`
        font-size: ${props => props.modalVisible ? '30px' : '20px'}
    `
    
    const handlePress = () => {
        setChosenOrder(order)
        setModalVisible(true)
    }

    return (
        <OneOrderTouch modalVisible={modalVisible} onPress={handlePress}>
                <TopView>
                    <DateView>
                        <Fontisto name="date" size={20} color="#F4A261" style={{marginRight: 7}} />
                        <DarkText modalVisible={modalVisible}>{formatted_date}</DarkText>
                    </DateView>
                    <TimeView>
                        <MaterialCommunityIcons name="clock-outline" size={24} color="#F4A261" style={{marginRight: 7}} />
                        <DarkText modalVisible={modalVisible}>{formatted_time}</DarkText>
                    </TimeView>
                    <StatusView modalVisible={modalVisible}>
                        <DarkText modalVisible={modalVisible}>Status: </DarkText>
                        <StatusText status={status} >{status}</StatusText>
                    </StatusView>
                </TopView>
                <OrderH2 modalVisible={modalVisible}>{location.name}</OrderH2>
                <OrderText modalVisible={modalVisible}>{location.address}</OrderText>
                <OrderText modalVisible={modalVisible}>${price_cents}</OrderText>
                <OrderText modalVisible={modalVisible}>#{token}</OrderText>
        </OneOrderTouch>
    )

}

export default PaymentOrder