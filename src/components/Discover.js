import React, {useState}  from 'react'
import { Text, DarkText, Wrapper, Span, H2, CloseView, WebHead, WebViewCon, CloseText } from '../styles/Styles'
import { Modal, ActivityIndicator } from 'react-native'
import {WebView} from 'react-native-webview';
import styled from 'styled-components'
import { Foundation } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

function Discover ( {headerText, setModalVisible, passValue, uri, showGateway, setShowGateway, onMessage} ) {
    
    const [progClr, setProgClr] = useState("#000")
    const [prog, setProg] = useState(false)

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

    return (
        <Modal
                visible={showGateway}
                onDismiss={() => {
                    setShowGateway(false)
                    setModalVisible(false)
                }}
                onRequestClose={() => {
                    setShowGateway(false)
                    setModalVisible(false)
                }}
                animationType={'fade'}
                transparent={true}
            >
            <WebViewCon>
                <WebHead>
                    <CloseView onPress={() => {
                        setShowGateway(false)
                        setModalVisible(false)
                    }}> 
                        <MaterialIcons name="cancel" size={30} color="#bea7e5" />
                    </CloseView>
                    <HeaderText>{headerText}</HeaderText>
                    <IndicatorView progress={prog}>
                        <ActivityIndicator size={24} color={progClr} />
                    </IndicatorView>
                </WebHead>
                    <WebView
                        source={{uri: uri}}
                        // source={{uri: 'https://sweet-relief-web.web.app/'}}
                        style={{flex: 1}}
                        onLoadStart={() => {
                            setProg(true);
                            setProgClr('#00457C');
                            // passValue()
                        }}
                        // onLoadProgress={() => {
                        //     setProg(true);
                        //     setProgClr('#00457C');
                        // }}
                        onLoadEnd={() => setProg(false)}
                        // onLoad={() => {
                        //     setProg(false);
                        // }}
                        // onMessage={onMessage}
                    />
            </WebViewCon>
        </Modal>
    )

}

export default Discover