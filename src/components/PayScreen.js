import React, {useRef, useState, useEffect} from 'react' 
import styled from 'styled-components'
import { Text, DarkText, Wrapper, Span, H2, CloseView, PurpButton, ErrorSpan, CloseText} from '../styles/Styles'
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import { BASE_URL, STRIPE_TEST_KEY } from '@env'
import {Alert, Button, View, StyleSheet, TouchableOpacity, Switch, ActivityIndicator} from 'react-native'
import { initStripe } from '@stripe/stripe-react-native';
import { FontAwesome } from '@expo/vector-icons';

function PayScreen( { navigation, modalVisible, setModalContent, setModalVisible, setCurrentUser, currentUser, selectedLocation} ) {

    const { confirmPayment, loading } = useConfirmPayment()
    const [errors, setErrors] = useState('')
    const [saveCard, setSaveCard] = useState(true)
    const [localUser, setLocalUser] = useState(currentUser)
    const [cardDetails, setCardDetails] = useState()
    const [hasPayMethod, setHasPayMethod] = useState(false)
    const [payMethods, setPayMethods] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)

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

    const PayButton = styled.TouchableOpacity`
        width: 70%;
        border-radius: 10px;  
        align-items: center;
        border-radius: 10px;
        align-self: center;
        background-color: #bea7e5;
    `

    const SubButton = styled(PayButton)`
        background-color: #F4A261
    `

    const SwitchView = styled.View`
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        padding: 5px;
    `

    const CardView = styled.TouchableOpacity`
        flex-direction: row;
        margin-bottom: 5px;
        min-width: 90%;
        margin-top: 10px;
        margin-bottom: 10px;
    `

    const CardText = styled(DarkText)`
        font-size: 22px;
        margin-right: 5px;
    `


    useEffect(() => {
        // If the user doesn't have a stripe_id, then send a request to make an account
        // If they do then don't do anything.
        if (!currentUser.stripe_user_id) {
            createAccount()
            setIsLoaded(true)
        } else {
            fetch(`${BASE_URL}/user_payment_methods/${currentUser.id}`)
                .then(r => r.json())
                .then(data => {
                    if (data.blank || data.error) {
                        console.log(data)
                        setIsLoaded(true)
                    } else {
                        setHasPayMethod(true)
                        setPayMethods(data.payment_methods)
                        setIsLoaded(true)
                    }
                })
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
                    setLocalUser(data.user)
                    console.log(data.subscription)
                }
            })
    }

    const fetchPaymentIntentClientSecret = async () => {

        let formBody = {
            currency: 'usd',
            location_id: selectedLocation.id,
            user_id: currentUser.id,
            save_card: saveCard,
        }

        if (hasPayMethod) {
            formBody.selectedMethod = payMethods[0].id
        }

        const response = await fetch(`${BASE_URL}/create_payment_intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formBody),
        });

            const {clientSecret, error} = await response.json()
            return {clientSecret, error}
        };

        // console.log(payMethods[0].id)
    const handleSavedCardPay = async () => {
        triggerPaySequence()
    }

    const triggerPaySequence = async () => {

        const billingDetails = {
            name: currentUser.name,
            email: currentUser.email
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
                    console.log('Error message', error.message, error)
                } else if (paymentIntent) {
                    Alert.alert('Payment Successful')
                    console.log('success', paymentIntent)
                    setModalVisible(!modalVisible)
                }
            }
        } catch (e) {   
            console.log(e)
        }
    }

    const handleNewCardPay = async () => {
        if (!cardDeets?.complete || !currentUser.email) {
            Alert.alert('Please enter card details')
            return;
        }

        triggerPaySequence()

        // const billingDetails = {
        //     name: currentUser.name,
        //     email: currentUser.email
        // }

        
        // try {
        //     const {clientSecret, error} = await fetchPaymentIntentClientSecret()

        //     console.log(clientSecret)
        //     if (error) {
        //         console.log(error)
        //     } else {
        //         const {paymentIntent, error} = await confirmPayment(clientSecret, {
        //             type: 'Card',
        //             billingDetails: billingDetails,
        //             // cardDetails: cardDeets
        //         })

        //         if (error) {
        //             Alert.alert(`Error message: ${error.message} `)
        //             console.log(error.message, error)
        //         } else if (paymentIntent) {
        //             Alert.alert('Payment Successful')
        //             console.log('success', paymentIntent)
        //             setModalVisible(!modalVisible)
        //         }
        //     }
        // } catch (e) {   
        //     console.log(e)
        // }
    }

    const handleClose = () => {
        // If the user hasn't changed it well setCurrentUser to the same object
        setCurrentUser(localUser)
        setModalVisible(false)
    }

    // These two buttons will call different functions
    // If they have a saved payment method then create an invoice item if not then create a payment Intent
    const ConditionalButton = () => {
        switch (hasPayMethod) {
            case true:
                return (
                    <PayButton onPress={handleSavedCardPay} disabled={loading}>
                        {loading ? <ActivityIndicator size='large' color='#F7F8F3'/> : <Span>{`Pay $${selectedLocation.price_cents}`}</Span>}
                    </PayButton>
                )
            case false:
                return (
                    <SubButton onPress={handleNewCardPay} disabled={loading}>
                        {loading ? <ActivityIndicator size='large' color='#F7F8F3'/> : <Span>{`Pay $${selectedLocation.price_cents}`}</Span>}
                    </SubButton>
                )
        }
    }

    const ConditionalIcon = ({brand}) => {
        switch (brand) {
            case 'visa':
                return <FontAwesome name="cc-visa" size={30} color="black" style={{marginRight: 10}}/>
            case 'discover':
                return <FontAwesome name="cc-discover" size={30} color="black" style={{marginRight: 10}}/>
            case 'mastercard':
                return <FontAwesome name="cc-mastercard" size={30} color="black" style={{marginRight: 10}}/>
            case 'american express':
                return <FontAwesome name="cc-amex" size={30} color="black" style={{marginRight: 10}}/>
            default:
                return <FontAwesome name="credit-card" size={30} color="black" style={{marginRight: 10}}/>
        }
    }

    const VirtualCard = ( {payMeth} ) => {
        const {id, card} = payMeth

        return (
            <CardView>
                <ConditionalIcon brand={card.brand} />
                <CardText>{card.brand}</CardText>
                <CardText>{card.last4}</CardText>
            </CardView>
        )
    }

    const CardComponents = () => {
        if (payMethods.length > 0) {
            return (
                payMethods.map(payMeth => {
                    return <VirtualCard key={payMeth.id} payMeth={payMeth}/>
                })
            )
        } else {
            return null;
        }
    }

    const MainPage = () => {
        if (!isLoaded && !hasPayMethod) {
            return null;
        } else if (hasPayMethod) {
            return <CardComponents/>
        } else if (isLoaded && !hasPayMethod) {
            return (
                <> 
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
                                    marginBottom: 10,
                                }}
                                onCardChange={(cardStuff) => {
                                    cardDeets = cardStuff
                                }}
                            />
                            <SwitchView>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#F4A261" }}
                                    value={saveCard}
                                    onValueChange={() => setSaveCard(!saveCard)}
                                    style={{marginRight: 10}}
                                />
                                <DarkText>Save card for future use</DarkText>
                            </SwitchView> 
                        </>
            )
        }
    }

    useEffect(() => {
        async function initialize() {
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
                    <MainPage/>
                        {/* {isLoaded && hasPayMethod ? 
                        <CardComponents/> : 
                        <> 
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
                                    marginBottom: 10,
                                }}
                                onCardChange={(cardStuff) => {
                                    cardDeets = cardStuff
                                }}
                            />
                            <SwitchView>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#F4A261" }}
                                    value={saveCard}
                                    onValueChange={() => setSaveCard(!saveCard)}
                                    style={{marginRight: 10}}
                                />
                                <DarkText>Save card for future use</DarkText>
                            </SwitchView> 
                        </>
                        } */}
                    {errors ? errors.map( (error) => <ErrorSpan key={error}>*{error}</ErrorSpan>) : null}
                    <ConditionalButton/>
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
    },
    payButton: {
        width: '70%',
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#bea7e5'
    }
})