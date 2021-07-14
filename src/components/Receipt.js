import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DarkText, H2, CloseView, CloseText, Wrapper, Button, Span, PurpButton, ModalHolder, ModalForm } from '../styles/Styles'
import { BASE_URL } from '@env'
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


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

    const ConfirmView = styled.View`
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        align-items: center;
    `

    const InfoView = styled.View`
    `

    const IconView = styled.View`
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
    `

    const SmileyView = styled.View`
    `

    const InfoWords = styled(DarkText)`
        font-size: 20px;
        margin-left: 5px;
    `

    // Encourage people to comment by prompting them to rate the bathroom on the receipt 

    const myComments = comments.find(comment => comment.user.id === currentUser.id)

    return (
        <ModalHolder>
            <ModalForm>
                <CloseView onPress={() => setModalVisible(!modalVisible)}>
                    <CloseText>❌</CloseText>
                </CloseView>
                <Title>Thank you for your order {currentUser.name}!</Title>
                {/* <View>
                    {paymentOrder ? 
                        <DarkText> ${String(paymentOrder.payment_order.price_cents)} paid to {selectedLocation.name} at {paymentOrder.time} on {paymentOrder.date}</DarkText>
                        : null
                    }
                </View> */}
                <ConfirmView>
                    <SmileyView>
                        <Ionicons name="happy-outline" size={60} color="#F4A261" />
                    </SmileyView>
                    <InfoView>
                        <IconView>
                            <FontAwesome5 name="store-alt" size={18} color="#F4A261" />
                            <InfoWords numberOfLines={2} ellipsizeMode='tail'>{selectedLocation.name}</InfoWords>
                        </IconView>
                        <IconView>
                            <FontAwesome name="dollar" size={24} color="#F4A261" />
                            <InfoWords>{paymentOrder.payment_order.price_cents}</InfoWords>
                        </IconView>
                        <IconView>
                            <MaterialCommunityIcons name="clock-outline" size={22} color="#F4A261" />
                            <InfoWords>{paymentOrder.time}</InfoWords>
                        </IconView>
                    </InfoView>
                </ConfirmView>
                <View>
                    <DarkText>Show this to someone at the location. This receipt will also be availabe on your profile page.</DarkText>
                </View>
                    {myComments ? null : 
                    <CommentButton onPress={() => setModalContent('comment')}>
                        <Span>Rate your experience</Span>
                    </CommentButton>}
            </ModalForm>
        </ModalHolder>
    )
}

export default Receipt 