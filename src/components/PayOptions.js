import React, {useRef, useState, useEffect} from 'react' 
import styled from 'styled-components'
import { Text, DarkText, Wrapper, Span, H2, ModalHolder, ModalForm } from '../styles/Styles'
import { MaterialIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { BASE_URL } from '@env'
import { Modal, ActivityIndicator, Alert } from 'react-native'
import { Foundation } from '@expo/vector-icons';
import {WebView} from 'react-native-webview';



// Send over the current user and the location 
function PayOptions( {orderToken, setOrderToken, modalVisible, setModalContent, setModalVisible, currentUser, selectedLocation}) {

    const [selected, setSelected] = useState("")
    const [orderId, setOrderId] = useState("")
    const [showGateway, setShowGateway] = useState(false)
    const [progClr, setProgClr] = useState("#000")
    const [prog, setProg] = useState(false)
    const webRef = useRef()

    const Button = styled.TouchableOpacity`
        background: #BEA7E5;
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
        color: #1C1C1C;
    `

    const CloseView = styled.TouchableOpacity`
        align-self: flex-start;
        padding: 13px;
    `

    const WebViewCon = styled.View`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 80%;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 150px;
        border-radius: 20px;
        padding: 30px;
        background-color: #ffffff;
    `
    const WebHead = styled.View`
        flex-direction: row;
        alignItems: center;
        background-color: #ffffff;
        zIndex: 25;
        elevation: 2;
        padding-top: 30px;
        width: 100%
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

    const handleClick = () => {
        if (selected == 'money') {
            setModalContent(selected)
        }
    }

    function onMessage(e) {
        let data = e.nativeEvent.data;
        let paymentFromWeb = JSON.parse(data);
        setShowGateway(false)

        if (paymentFromWeb.status === 'COMPLETED') {
            setModalContent('receipt')
        } else if (paymentFromWeb && paymentFromWeb.status !== 'COMPLETED') {
            setModalContent('error')
        }
    }

    function passValue() {
        let data = {
            id: orderId
        }

        webRef.current.injectJavaScript(`orderId = ${JSON.stringify(orderId)}; true;`)
    }

    return (
        <ModalHolder>
            <ModalForm>
                <CloseView onPress={() => setModalVisible(!modalVisible)}>
                    <MaterialIcons name="cancel" size={30} color="#bea7e5" />
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
                            source={{uri: 'https://sweet-relief-web.web.app/pay'}}
                            style={{flex: 1}}
                            ref={webRef}
                            onLoadStart={() => {
                                setProg(true);
                                setProgClr('#00457C');
                                passValue()
                            }}
                            onMessage={onMessage}
                        />
                    </WebViewCon>
                </Modal>
                    ) : null}
            </ModalForm>
        </ModalHolder>
    )
}

export default PayOptions