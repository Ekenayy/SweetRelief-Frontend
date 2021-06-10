import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DarkText, H2, CloseView, CloseText, Wrapper, Button, Scroll, TouchView } from '../styles/Styles'
import { BASE_URL } from '@env'


function Receipt( {currentUser, selectedLocation, modalVisible, setModalVisible}) {

    const [paymentOrder, setPaymentOrder] = useState(null)

    useEffect(() => {
        fetch(`${BASE_URL}/last_payment/${currentUser.id}`)
            .then(r => r.json())
            .then(data => setPaymentOrder(data))
    }, [])

    return (
        <>
            <CloseView onPress={() => setModalVisible(!modalVisible)}>
                <CloseText>❌</CloseText>
            </CloseView>
            <H2>Thank you for your order {currentUser.name}!</H2>
            <Wrapper>
                {paymentOrder ? <DarkText>$1 paid to {selectedLocation.name} at {paymentOrder.time} on {paymentOrder.date}</DarkText> : null}
            </Wrapper>
        </>
    )
}

export default Receipt 