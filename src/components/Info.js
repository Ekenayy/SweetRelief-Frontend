import React, {useState}  from 'react'
import { Text, DarkText, Wrapper, Span, H2, Modal, ModalHolder, CloseView, WebHead, WebViewCon, CloseText } from '../styles/Styles'
import { Foundation } from '@expo/vector-icons';
import styled from "styled-components";


function Info ( {setModalVisible, modalVisible, setModalContent} ) {

    const BigView = styled(WebViewCon)`
        background-color: 'rgba(52, 52, 52, 0.85)';
    `
    return (
        <BigView>
            <CloseView onPress={() => setModalVisible(false)}>
                <Foundation name="x" size={24} color="black" />
            </CloseView>
            <Text>Hello from Info</Text>
        </BigView>
    )
}

export default Info