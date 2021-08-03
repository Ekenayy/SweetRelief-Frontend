import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DarkText, H2, CloseView, CloseText, Wrapper, Button, Span, PurpButton, ModalHolder, ModalForm } from '../styles/Styles'
import { FontAwesome5 } from '@expo/vector-icons';

function ErrorMsg ( {setModalVisible}) {

    const SmileyView = styled.View`
        margin-bottom: 20px;
    `

    const WordView = styled.View`
        padding-bottom: 10px;
    `

    return (
        <ModalHolder>
            <ModalForm>
                <CloseView onPress={() => setModalVisible(false)}>
                    <CloseText>❌</CloseText>
                </CloseView>
                <SmileyView>
                    <FontAwesome5 name="sad-cry" size={80} color="#F4A261" />
                </SmileyView>
                <WordView>
                    <H2>Oops! That didn't work. Please try again.</H2>
                </WordView>
            </ModalForm>
        </ModalHolder>
    )
}

export default ErrorMsg