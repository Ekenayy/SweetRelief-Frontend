import React, {useRef, useState, useEffect} from 'react' 
import styled from 'styled-components'
import { Text, DarkText, Wrapper, Span, H2, CloseView, PurpButton, ErrorSpan, CloseText} from '../styles/Styles'
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import { BASE_URL, STRIPE_TEST_KEY } from '@env'
import {Alert, Button, View, StyleSheet, TouchableOpacity, Switch, ActivityIndicator} from 'react-native'
import { initStripe } from '@stripe/stripe-react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { convertSpeed } from 'geolib';
import { MaterialIcons } from '@expo/vector-icons';

function PayScreen( { navigation, modalVisible, setModalContent, setModalVisible, setCurrentUser, currentUser, selectedLocation} ) {

    const { confirmPayment, loading } = useConfirmPayment()
    const {createPaymentMethod } = useStripe()
    const [errors, setErrors] = useState('')
    const [saveCard, setSaveCard] = useState(true)
    const [localUser, setLocalUser] = useState(currentUser)
    const [hasPayMethod, setHasPayMethod] = useState(false)
    const [payMethods, setPayMethods] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [payLoading, setPayLoading] = useState(false)
    const [selectedMethod, setSelectedMethod] = useState('')
    const [showList, setShowList] = useState(false)
    const [addClicked, setAddClicked] = useState(false)

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
        background-color: #F4A261;
    `

    const SwitchView = styled.View`
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        padding: 5px;
    `

    const CardView = styled.TouchableOpacity`
        display: flex;
        flex-direction: row;
        margin-bottom: 5px;
        min-width: 90%;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
        border-bottom-width: ${props => props.showList ? '.5px' : '0px'}
    `
    // background-color: ${props => props.selected ? 'grey' : 'white'}

    const CardText = styled(DarkText)`
        font-size: 22px;
        margin-right: 5px;
    `

    const ArrowView = styled(Wrapper)`
        align-self: center;
        margin-left: 0px;
        padding-left: 0px;
        justify-content: flex-end;
    `

    const DetailsView = styled(Wrapper)`
        flex-direction: row;
        padding: 10px;
        padding-left: 10px;
        margin-left: 0px;
        margin-right: 0px;
        width: 85%;
    `

    const RowView = styled.View`
        flex-direction: row;
        
    `

    const TrashIconView = styled.TouchableOpacity`
        align-self: center;
        justify-content: flex-start
        margin-right: 5px;
    `

// UseEffects ------ 
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
                        setIsLoaded(true)
                    } else {
                        setHasPayMethod(true)
                        setPayMethods(data.payment_methods)
                        setIsLoaded(true)
                    }
                })
        }
    }, [])

    useEffect(() => {
        async function initialize() {
            await initStripe({
                publishableKey: STRIPE_TEST_KEY,
            });
            }
        initialize().catch(console.error);
    }, []);

// Functions ------ 
    const createAccount = () => {
        fetch(`${BASE_URL}/create_user_stripe_account/${currentUser.id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })
            .then( r => r.json())
            .then(data =>{ 
                if (data.error) {
                    setErrors([data.error])
                } else {
                    setLocalUser(data.user)
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

        //  In this first case -- If a user has a paymethod and there's a selected method
        // make the selectedMethod the method that is used here. hasPayMethod doesn't matter if there's a selectedMethod
        // If the user has many payment methods and picks one
        // And if the user doesn't select anything
        if (selectedMethod) {
            // Find the paymentMethod with the selected Id
            formBody.selectedMethod = selectedMethod.id
            formBody.save_card = false
        } else if (hasPayMethod && !addClicked) {
            formBody.save_card = false
            // In the defaults state where this a pay method but the user hasn't selected anything
            formBody.selectedMethod = payMethods[0].id
        }

        const response = await fetch(`${BASE_URL}/create_payment_intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formBody),
        });

            const {clientSecret, payment_method_id, payment_order_id, error, succeeded} = await response.json()
            return {clientSecret, payment_method_id, error, payment_order_id, succeeded}
        };

    const handleSavedCardPay = async () => {

        try {
            setPayLoading(true)
            const {clientSecret, error, succeeded, payment_order_id, payment_method_id} = await fetchPaymentIntentClientSecret()

            if (error) {
                setPayLoading(false)
                console.log(error)
                setErrors([error])
            } else if (succeeded === true) {
                console.log('succeeded', succeeded)
                setPayLoading(false)
                setModalContent('receipt')            
            } else if (succeeded === false) {
                handleConfirmPayment(clientSecret, payment_order_id, payment_method_id)
                setPayLoading(false)
                // If there's another kind of error than try to confirm the payment on the frontend 
            }
        } catch (e) {
            console.log(e)
        }
    }


    // It needs access to the paymentMethodId somehow. State isn't getting set fast enough
    const handleConfirmPayment = async (secret, orderId, payId) => {
        const billingDetails = {
            name: currentUser.name,
            email: currentUser.email
        }

        const {paymentIntent, error} = await confirmPayment(secret, {
            type: 'Card',
            billingDetails: billingDetails,
            paymentMethodId: payId
        })

        if (error) {
            Alert.alert(`Error: ${error.message} `)
            console.log('Error message from confirm payment', payId, error.message, error)
            updatePaymentOrder(orderId, 'failed')
        } else if (paymentIntent) {
            updatePaymentOrder(orderId, 'paid')
            // Send an update message to your backend
        }
    }

    const triggerPaySequence = async () => {

        const billingDetails = {
            name: currentUser.name,
            email: currentUser.email
        }
        
        
        try {
            // const {paymentMethod, error} = await createPaymentMethod({
            //     type: 'Card',
            //     billingDetails,
            //     setUpFutureUsage: 'OnSession',
            // })
    
            // if (paymentMethod) {
            //     // console.log(paymentMethod)
            // }            
            const {clientSecret, error, payment_order_id, payment_method_id, succeeded} = await fetchPaymentIntentClientSecret()
            if (error) {
                console.log(error)
            } else {
                handleConfirmPayment(clientSecret, payment_order_id, payment_method_id)
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

    }

    const updatePaymentOrder = (id, status) => {
        fetch(`${BASE_URL}/payment_orders/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({status})
        })
            .then(r => r.json())
            .then(data => {
                if (data.update_error) {
                    console.log(data)
                } else if (data.payment_order.status === 'paid') {
                    // handlePaySuccess()
                    setModalContent('receipt')
                } else {
                    console.log(data)
                }
            })
    }

    const handleClose = () => {
        // If the user hasn't changed it well setCurrentUser to the same object
        setCurrentUser(localUser)
        setModalVisible(false)
    }

    const handleCardPress = (payMeth) => {
        // If the id of the payMeth is the same as the first one in the stack and showList is false
        // Isn't already open then open up the payment list
        // Else setSelectedMethod(payMeth) 
        if (payMeth.id === payMethods[0].id && !showList) {
            setShowList(true)
        } 
        setSelectedMethod(payMeth)
    }

    const handleDeletePress = (payMeth) => {
        Alert.alert(
            "Confirm Delete",
            "Delete this payment method?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Delete", onPress: () => deletePaymentMethod(payMeth.id) }
            ]
        )
    }

    const deletePaymentMethod = (payMethId) => {
        console.log(payMethId)
        fetch(`${BASE_URL}/detach_payment_method`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({payMethId})
        })
            .then(r => r.json())
            .then(data => {
                if (data.error) {
                    setErrors([data.error])
                    Alert.alert(`Error ${data.error}`)
                } else {
                    Alert.alert(`Success! ${data.success}.`)
                    let newArr = payMethods.filter(method => method.id !== payMethId)
                    console.log(newArr)
                    setPayMethods(newArr)
                }
            })
    }
    // Logic for cardfield and switch
    const cardLogic = ((addClicked) || (isLoaded && !hasPayMethod))
// Comoponents ------- 
    // These two buttons will call different functions
    // If they have a saved payment method then create and confirm the payment intent on the backend
    // If not then create a paymentintent on the backend and confirm on the frontend
    const ConditionalButton = () => {
        switch (hasPayMethod && !addClicked) {
            case true:
                return (
                    <PayButton onPress={handleSavedCardPay} disabled={payLoading}>
                        {payLoading ? <ActivityIndicator size='large' color='#F7F8F3'/> : <Span>{`Pay $${selectedLocation.price_cents}`}</Span>}
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

        const selected = selectedMethod.id === id

            return (
                <RowView >
                    {showList ? <TrashIconView onPress={() => handleDeletePress(payMeth)}>
                        <MaterialIcons name="delete" size={24} color="black" />
                    </TrashIconView> : null}
                    <CardView showList={showList} onPress={() => handleCardPress(payMeth)}>
                        <DetailsView> 
                            <ConditionalIcon brand={card.brand} />
                            <CardText>{card.brand}</CardText>
                            <CardText>{card.last4}</CardText>
                        </DetailsView>
                        {showList ? null : 
                            <ArrowView> 
                                <Fontisto name="angle-right" size={30} color="black" /> 
                            </ArrowView>
                        }
                        <ArrowView> 
                            {selected ? <Ionicons name="ios-checkmark-sharp" size={30} color="#F4A261" /> : null}
                        </ArrowView>
                    </CardView>
                </RowView>

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

    const PayMethodsList = () => {
        return (
            <>
                <CardComponents/>
                <CardView onPress={() => setAddClicked(true)}>
                    <FontAwesome name="plus" size={30} color="black" style={{marginRight: 10}}/>
                    <CardText>Add Payment Method</CardText>
                </CardView>
            </>
        )
    }

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
                                style={[
                                    styles.cardField,
                                    cardLogic ? styles.noPayMethod : styles.hasPayMethod 
                                ]}
                                onCardChange={(cardStuff) => {
                                    cardDeets = cardStuff
                                }}
                                onFocus={(card) => setSelectedMethod(null)}
                            />
                            { cardLogic ? 
                                <SwitchView>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#F4A261" }}
                                        value={saveCard}
                                        onValueChange={() => setSaveCard(!saveCard)}
                                        style={{marginRight: 10}}
                                    />
                                    <DarkText>Save card for future use</DarkText>
                                </SwitchView> : null
                            }
                            {payMethods.length > 0 && !showList ? <VirtualCard payMeth={payMethods[0]}/> : null}
                            {showList && !addClicked ? <PayMethodsList/> : null}
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
    },
    cardField: {
        width: '100%',
        height: 70,
        marginVertical: 30,
        marginBottom: 10,
    },
    hasPayMethod: {
        display: 'none',
    },
    noPayMethod: {
        display: 'flex'
    }
})