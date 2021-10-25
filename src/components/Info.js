import React, {useState}  from 'react'
import { Text, DarkText, Wrapper, Span, H2, Modal, ModalHolder, CloseView, WebHead, WebViewCon, CloseText } from '../styles/Styles'
import { Foundation } from '@expo/vector-icons';
import styled from "styled-components";
import { MaterialIcons } from '@expo/vector-icons';


function Info ( {setModalVisible, modalVisible, setModalContent} ) {

    const BigView = styled(WebViewCon)`
        background-color: 'rgba(52, 52, 52, 0.85)';
        height: 100%;
    `
    const HeaderView = styled(WebHead)`
        background-color: transparent;
        padding-top: 10px;
    `

    const HeaderText = styled(H2)`
        color: #F7F8F3
        font-weight: 500;
        text-align: center;
    `

    const MainSection = styled(Wrapper)`
    `

    return (
        <BigView>
            <HeaderView>
                <CloseView onPress={() => setModalVisible(false)}>
                    <MaterialIcons name="cancel" size={30} color="#bea7e5" />
                </CloseView>
                <HeaderText>Information</HeaderText>
            </HeaderView>
            <MainSection>
                <Text>Hello from Info</Text>
            </MainSection>
        </BigView>
    )
}

export default Info