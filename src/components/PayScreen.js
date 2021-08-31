import React, {useRef, useState, useEffect} from 'react' 
import styled from 'styled-components'
import { Text, DarkText, Wrapper, Span, H2, CloseView, PurpButton, ErrorSpan, CloseText} from '../styles/Styles'
import { Foundation } from '@expo/vector-icons';
import { CardField, useStripe, CardForm } from '@stripe/stripe-react-native';
import {View} from 'react-native'
import { BASE_URL } from '@env'


function PayScreen( { navigation, modalVisible, setModalContent, setModalVisible, setCurrentUser, currentUser, selectedLocation} ) {

    const { confirmPayment, loading } = useStripe();
    const [errors, setErrors] = useState('')
    const [saveCard, setSaveCard] = useState(true)
    const [localUser, setLocalUser] = useState(currentUser)

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

    const PayButton = styled(PurpButton)`
        width: 70%;
        border-radius: 10px;
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
                    setErrors([data.error])
                } else {
                    setLocalUser(data)
                }
            })
    }

    // console.log(selectedLocation.stripe_plan_name)
    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${BASE_URL}/create_payment_intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currency: 'usd',
                location_id: selectedLocation.id,
                user_id: currentUser.id,
                save_card: saveCard,
                // Here I should be sending over a stipe_plan_id
            }),
            });

            const {clientSecret} = await response.json();
        
            return clientSecret.seret;
        };

    const handlePayPress = async () => {

        let details = {
            email: currentUser.email
        }
        
        const clientSecret = await fetchPaymentIntentClientSecret();

        const { paymentIntent, error } = await confirmPayment(clientSecret, {
            type: 'Card',
            billingDetails: details,
            setupFutureUsage: 'OnSession',
        });
        if (error) {
            console.log('Payment confirmation error', error);
        } else if (paymentIntent) {
            console.log('Success from promise', paymentIntent);
        }
    }

    const handleClose = () => {
        // If the user hasn't changed it well setCurrentUser to the same object
        setCurrentUser(localUser)
        setModalVisible(false)
    }

    return (
        <ModalHolder>
            <ModalForm>
                <CloseView onPress={handleClose}>
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
                    {errors ? errors.map( (error) => <ErrorSpan key={error}>*{error}</ErrorSpan>) : null}
                    <PayButton onPress={handlePayPress}>
                        <Span>Pay ${selectedLocation.price_cents}</Span>
                    </PayButton>
            </ModalForm>
        </ModalHolder>
    )
}

export default PayScreen