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

    const Title = styled(H2)`
        margin-bottom: 10px;
    `

    const View = styled(Wrapper)`
        margin: 15px;
    `

    return (
        <>
            <CloseView onPress={() => setModalVisible(!modalVisible)}>
                <CloseText>❌</CloseText>
            </CloseView>
            <Title>Thank you for your order {currentUser.name}!</Title>
            <View>
                {paymentOrder ? 
                    <DarkText> ${String(paymentOrder.payment_order.price_cents)} paid to {selectedLocation.name} at {paymentOrder.time} on {paymentOrder.date}</DarkText>
                    : null
                }
            </View>
            <View>
                <DarkText>Show this confirmation to an employee at this location to use the bathroom. This receipt will also be availabe on your profile page.</DarkText>
            </View>
        </>
    )
}

export default Receipt 