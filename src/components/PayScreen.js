import React, {useRef, useState, useEffect} from 'react' 
import styled from 'styled-components'
import { Text, DarkText, Wrapper, Span, H2, CloseView, PurpButton, CloseText} from '../styles/Styles'
import { Foundation } from '@expo/vector-icons';
import { CardField, useStripe, CardForm } from '@stripe/stripe-react-native';
import {View} from 'react-native'
import { BASE_URL } from '@env'


function PayScreen( { navigation, modalVisible, setModalContent, setModalVisible, setCurrentUser, currentUser, selectedLocation} ) {

    const { confirmPayment } = useStripe();
    const [error, setError] = useState('') 

    const CardView = styled.View`
    `

    const ModalHolder = styled.View`
        flex: 1;
        margin-top: 300px;
        width: 90%;
        align-self: center;
    `

    const ModalForm = styled.View`
        padding: 10px;
        background-color: white;
        border-radius: 20px;
        align-items: center;
    `

    const TitleText = styled(DarkText)`
        font-size: 24px;
    `
    useEffect(() => {
        // If the user doesn't have a stripe_id, then send a request to make an account
        // If they do then don't do anything.
        if (!currentUser.stripe_user_id) {
            createAccount()
        } else {
            // console.log(stripe_user_id)
        }

    }, [])

    const createAccount = () => {
        fetch(`${BASE_URL}/create_user_stripe_account/${currentUser.id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })
            .then( r => r.json())
            .then(data =>{ 
                // console.log(data)
                if (data.error) {
                    setError(data.error)
                } else {
                    setCurrentUser(data)
                }
            })
    }

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/create_payment_intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currency: 'usd',
                location_id: selectedLocation.id,
            }),
            });
            const {clientSecret} = await response.json();
        
            return clientSecret;
        };

    const handlePayPress = async () => {
        
        const clientSecret = await fetchPaymentIntentClientSecret();
    }


    return (
        <ModalHolder>
            <ModalForm>
                <CloseView onPress={() => setModalVisible(false)}>
                    <CloseText>❌</CloseText>
                </CloseView>
                <TitleText>Payment information</TitleText>
                    <CardField
                        postalCodeEnabled={true}
                        placeholder={{
                        number: '4242 4242 4242 4242',
                        }}
                        cardStyle={{
                            backgroundColor: '#191818',
                            textColor: '#ffffff',
                        }}
                        style={{
                            width: '100%',
                            height: 70,
                            marginVertical: 30,
                        }}
                        onCardChange={(cardDetails) => {
                            console.log('cardDetails', cardDetails);
                        }}
                        onFocus={(focusedField) => {
                            console.log('focusField', focusedField);
                        }}
                        // onBlur={(obj) => console.log(obj)}
                    />
                    <PurpButton>
                        <Span>Pay</Span>
                    </PurpButton>
            </ModalForm>
        </ModalHolder>
    )
}

export default PayScreen