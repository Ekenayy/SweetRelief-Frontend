import React, {useState}  from 'react'
import { Text, DarkText, Wrapper, Span, H2, Modal, ModalHolder, CloseView, WebHead, WebViewCon, CloseText } from '../styles/Styles'
import { Foundation } from '@expo/vector-icons';

function Info ( {setModalVisible, modalVisible, setModalContent} ) {

    return (
        <WebViewCon>
            <CloseView onPress={() => setModalVisible(false)}>
                <Foundation name="x" size={24} color="black" />
            </CloseView>
            <Text>Hello from Info</Text>
        </WebViewCon>
    )
}

export default Info