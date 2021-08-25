import React, {useRef, useState, useEffect} from 'react' 
import styled from 'styled-components'
import { Text, DarkText, Wrapper, Span, H2, ModalHolder, ModalForm, CloseView, CloseText } from '../styles/Styles'
import { Foundation } from '@expo/vector-icons';

function PayScreen( { modalVisible, setModalContent, setModalVisible, currentUser, selectedLocation} ) {

    return (
        <ModalHolder>
            <ModalForm>
                <CloseView onPress={() => setModalVisible(false)}>
                    <CloseText>❌</CloseText>
                </CloseView>
                <H2>Hello from PayScreen! </H2>
            </ModalForm>
        </ModalHolder>
    )
}

export default PayScreen