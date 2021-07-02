import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DarkText, H2, CloseView, CloseText, Wrapper, Button, Span, PurpButton, Scroll, TouchView } from '../styles/Styles'
import { BASE_URL } from '@env'


function Receipt( {currentUser, comments, setModalContent, selectedLocation, modalVisible, setModalVisible}) {

    const [paymentOrder, setPaymentOrder] = useState(null)

    // What are the drawbacks of doing it this way? 
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

    const CommentButton = styled(PurpButton)`
        width: 150px;
        border-radius:20px;
        align_self: center;
        margin-top: 5px;
        margin-right: 5px;
    `

    // Encourage people to comment by prompting them to rate the bathroom on the receipt 

    const myComments = comments.find(comment => comment.user.id === currentUser.id)

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
                {myComments ? null : 
                <CommentButton onPress={() => setModalContent('comment')}>
                    <Span>Rate your experience</Span>
                </CommentButton>}
        </>
    )
}

export default Receipt 