import React, {useRef, useState, useEffect} from 'react' 
import styled from 'styled-components'
import { Text, DarkText, Wrapper, Span, H2, CloseView, PurpButton, ErrorSpan, CloseText} from '../styles/Styles'
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import { BASE_URL, STRIPE_TEST_KEY } from '@env'
import {Alert, Button, View, StyleSheet} from 'react-native'
import { initStripe } from '@stripe/stripe-react-native';

function PayScreen( { navigation, modalVisible, setModalContent, setModalVisible, setCurrentUser, currentUser, selectedLocation} ) {

    const { confirmPayment, loading } = useConfirmPayment()
    const cardRef = useRef()
    const [errors, setErrors] = useState('')
    const [saveCard, setSaveCard] = useState(true)
    const [localUser, setLocalUser] = useState(currentUser)
    const [cardDetails, setCardDetails] = useState()
    const [type, setType] = useState('card')

    let cardDeets

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

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${BASE_URL}/create_payment_intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({
            //     currency: 'usd',
            //     location_id: selectedLocation.id,
            //     user_id: currentUser.id,
            //     save_card: saveCard,
            // }),
            });

            const {clientSecret, error} = await response.json()
            return {clientSecret, error}
        };

    const handlePayPress = async () => {
        if (!cardDeets?.complete || !currentUser.email) {
            Alert.alert('Please enter card details')
            return;
        }

        const billingDetails = {
            // name: currentUser.name,
            email: 'test@stripe.com'
        }

        
        try {
            const {clientSecret, error} = await fetchPaymentIntentClientSecret()

            console.log(clientSecret)
            if (error) {
                console.log(error)
            } else {
                const {paymentIntent, error} = await confirmPayment(clientSecret, {
                    type: 'Card',
                    billingDetails: billingDetails,
                    // cardDetails: cardDeets
                })

                if (error) {
                    Alert.alert(`Error message: ${error.message} `)
                    console.log(error.message, error)
                } else if (paymentIntent) {
                    Alert.alert('Payment Successful')
                    console.log('success', paymentIntent)
                }
            }
        } catch (e) {   
            console.log(e)
        }
    }

    const handleClose = () => {
        // If the user hasn't changed it well setCurrentUser to the same object
        setCurrentUser(localUser)
        setModalVisible(false)
    }

    useEffect(() => {
        async function initialize() {
            console.log('starting initailizing ')
            await initStripe({
                publishableKey: STRIPE_TEST_KEY,
            });
            }
        initialize().catch(console.error);
    }, []);

    return (
        <View style={styles.modalHolder}>
            <View style={styles.modalForm}> 
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
                        onCardChange={(cardStuff) => {
                            cardDeets = cardStuff
                        }}
                        // onFocus={(focusedField) => {
                        //     console.log('focusField', focusedField);
                        // }}
                        // onBlur={(obj) => console.log(obj)}
                    />
                    {errors ? errors.map( (error) => <ErrorSpan key={error}>*{error}</ErrorSpan>) : null}
                    <Button onPress={handlePayPress} disabled={loading} title={`Pay $${selectedLocation.price_cents}`}>
                        {/* <Span>Pay ${selectedLocation.price_cents}</Span> */}
                    </Button>
            </View> 
        </View>
    )
}

export default PayScreen

const styles = StyleSheet.create({
    modalForm: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
    },
    modalHolder: {
        flex: 1,
        marginTop: 300,
        width: '90%',
        alignSelf: 'center'
    }
})