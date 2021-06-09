import React, {useRef, useState, useEffect} from 'react' 
import styled from 'styled-components'
import { Text, DarkText, Wrapper, Span, H2 } from '../styles/Styles'
import { MaterialIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { BASE_URL } from '@env'
import { Modal, ActivityIndicator } from 'react-native'
import { Foundation } from '@expo/vector-icons';
import {WebView} from 'react-native-webview';


// Send over the current user and the location 
function PayOptions( {modalVisible, setModalVisible, currentUser, selectedLocation}) {

    const [selected, setSelected] = useState("")
    const [orderId, setOrderId] = useState("")
    const [showGateway, setShowGateway] = useState(false)
    const [progClr, setProgClr] = useState("#000")
    const [prog, setProg] = useState(false)
    const [payment, setPayment] = useState(null)
    const webRef = useRef()

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
        font-size: 16px;
    `
    const IndicatorView = styled.View`
        padding: 13px;
        opacity: ${props => props.progress ? 1 : 0}
    `

    useEffect(() => {
        if (payment && payment.status === 'COMPLETED') {
            setPayment(null)
            alert('PAYMENT MADE SUCCESSFULLY!')
            setModalVisible(false)
        } else if (payment && payment.status !== 'COMPLETED') {
            setPayment(null)
            alert('PAYMENT FAILED. PLEASE TRY AGAIN.')
            setModalVisible(false)
        }
    }, [payment])

    const handleClick = () => {
        if (selected == 'money') {
            createPayment()
        }
    }

    const createPayment = () => {

        let formBody = {
            email_address: 'sb-yqqld6344344@business.example.com',
            user_id: currentUser.id,
            location_id: selectedLocation.id
        }

        fetch(`${BASE_URL}/create_order`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(r => r.json())
            .then(data => {
                setOrderId(data.id)
                setShowGateway(!showGateway)
            })
        
    }

    function onMessage(e) {
        let data = e.nativeEvent.data;
        console.log(data);
        let paymentFromWeb = JSON.parse(data);
        setPayment(paymentFromWeb)
        setShowGateway(false)

    }

    function passValue() {
        let data = {
            id: orderId
        }

        webRef.current.injectJavaScript(`orderId = ${JSON.stringify(orderId)}; true;`)
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
            <Button onPress={handleClick}>
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
                        source={{uri: 'http://localhost:3001'}}
                        // source={{uri: 'https://sweet-relief-web.web.app/'}}
                        style={{flex: 1}}
                        ref={webRef}
                        onLoadStart={() => {
                            setProg(true);
                            setProgClr('#00457C');
                            passValue()
                        }}
                        // onLoadProgress={() => {
                        //     setProg(true);
                        //     setProgClr('#00457C');
                        // }}
                        // onLoadEnd={passValue}
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