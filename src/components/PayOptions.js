import React, {useRef, useState} from 'react' 
import styled from 'styled-components'
import { Text, DarkText, Wrapper, Span, H2 } from '../styles/Styles'
import { MaterialIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { BASE_URL } from '@env'
import { Modal, ActivityIndicator } from 'react-native'
import { Foundation } from '@expo/vector-icons';
import {WebView} from 'react-native-webview';



function PayOptions( {modalVisible, setModalVisible}) {

    const [selected, setSelected] = useState("")
    const [id, setId] = useState("")
    const [showGateway, setShowGateway] = useState(false)
    const [progClr, setProgClr] = useState("#000")
    const [prog, setProg] = useState(false)

    const Button = styled.TouchableOpacity`
        background: #E379DF;
        width: 150px;
        border-radius:20px;
        align_self: center;
        margin-top: 5px;
        margin-right: 5px;
    `

    const MoneyButton = styled(Button)`
        background-color: ${props => props.selected == 'money' ? '#aab3af' : '#F3F5F6'}
    `

    const AllOptionsView = styled(Wrapper)`
        margin-bottom: 20px;
        margin-top: 10px;
        margin-left: 0px;
    `

    const OptionsText = styled(Span)`
        color: black;
    `

    const OneOptionView = styled.View`
        flex-direction: row;
    `

    const CloseView = styled.TouchableOpacity`
        align-self: flex-start;
        padding: 13px;
    `

    const CloseText = styled.Text`
        align-self: flex-start;
    `
    const WebViewCon = styled.View`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    `
    const WebHead = styled.View`
        flex-direction: row;
        alignItems: center;
        background-color: #f9f9f9
        zIndex: 25;
        elevation: 2;
        padding-top: 30px;
    `

    const HeaderText = styled(DarkText)`
        font-weight: bold;
        flex: 1;
        text-align: center;
        font-size: 16;
    `
    const IndicatorView = styled.View`
        padding: 13px;
        opacity: ${props => props.progress ? 1 : 0}
    `

    const handleClick = () => {
        if (selected == 'money') {
            createPayment()
        }
    }

    const createPayment = () => {

        let formBody = {
            email_address: 'sb-yqqld6344344@business.example.com'
        }

        fetch(`${BASE_URL}/create_order`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(r => r.json())
            .then(data => {
                setId(data.id)
                let webUrl = Linking.createURL('https://sweet-relief-web.web.app/', {
                    queryParams: {id: data.id}
                })
                console.log(Linking.canOpenURL(webUrl))
            })
        // Linking.openURL('https://sweet-relief-web.web.app/')

        // I need to send over a payee based on the location

        // I need to collect this information and send it over as params to the backend
        // let formBody = {
        //     "intent": "CAPTURE",
        //         "purchase_units": [{
        //             "amount": {
        //                 "currency_code": "USD",
        //                 "value": "100.00"
        //             },
        //             "payer": {
        //                 "email_address": "sb-4bgqp6345050@personal.example.com"
        //             },
        //             "payee": {
        //                 "email_address": "sb-yqqld6344344@business.example.com"
        //             },
        //             "payment_instruction": {
        //                 "disbursement_mode": "INSTANT",
        //             }
        //         }],
        // }

        // console.log(formBody)

        // if (response) {
        //     setModalVisible(!modalVisible)
        // }
    }

    function onMessage(e) {
        let data = e.nativeEvent.data;
        setShowGateway(false);
        console.log(data);
        let payment = JSON.parse(data);
        if (payment.status === 'COMPLETED') {
            alert('PAYMENT MADE SUCCESSFULLY!');
            } else {
            alert('PAYMENT FAILED. PLEASE TRY AGAIN.');
            }
        }

    return (
        <>
            <CloseView onPress={() => setModalVisible(!modalVisible)}>
                <CloseText>❌</CloseText>
            </CloseView>
            <H2>Pay with</H2>
            <AllOptionsView>
                    <MoneyButton selected={selected} onPress={() => setSelected('money')} >
                            <OptionsText>Money</OptionsText>
                    </MoneyButton>                
            </AllOptionsView>
            {selected ? 
            <Button onPress={() => setShowGateway(!showGateway)}>
                <Span>Confirm</Span>
            </Button> : 
            null}
            {showGateway ? (
            <Modal
                visible={showGateway}
                onDismiss={() => setShowGateway(false)}
                onRequestClose={() => setShowGateway(false)}
                animationType={'fade'}
                transparent={true}
            >
                <WebViewCon>
                    <WebHead>
                        <CloseView onPress={() => setShowGateway(false)}> 
                            <Foundation name="x" size={24} color="black" />
                        </CloseView>
                        <HeaderText>PayPal Gateway</HeaderText>
                        <IndicatorView progress={prog}>
                            <ActivityIndicator size={24} color={progClr} />
                        </IndicatorView>
                    </WebHead>
                    <WebView
                        source={{uri: 'https://sweet-relief-web.web.app/'}}
                        style={{flex: 1}}
                        onLoadStart={() => {
                            setProg(true);
                            setProgClr('#00457C');
                        }}
                        // onLoadProgress={() => {
                        //     setProg(true);
                        //     setProgClr('#00457C');
                        // }}
                        onLoadEnd={() => {
                            console.log('done loading')
                            // setProg(false);
                        }}
                        // onLoad={() => {
                        //     setProg(false);
                        // }}
                        onMessage={onMessage}
                    />
                </WebViewCon>
            </Modal>
                ) : null}
        </>
    )
}

export default PayOptions