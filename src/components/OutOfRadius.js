import React from 'react'
import {ModalHolder, ModalForm, H1, CloseView, DarkText } from '../styles/Styles'
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import styled from 'styled-components';

function OutOfRadius ({setModalVisible}) {
    return (
        <ModalHolder>
            <ModalForm>
              <CloseView onPress={() => setModalVisible(false)}>
                <MaterialIcons name="cancel" size={30} color="#bea7e5" />
              </CloseView>
              <ModalContent>
                <HeaderWrapper>
                  <IconView>
                    <Fontisto name="beach-slipper" size={100} color="#F4A261" />
                  </IconView>
                  <HeadingView>
                    <H1>Looks like you might be out of town!</H1>
                  </HeadingView>
                </HeaderWrapper>
                <TextWrapper>
                    <DarkText>Some functions will be limited until you move closer to the NYC metro area</DarkText>
                </TextWrapper>
              </ModalContent>
            </ModalForm>
        </ModalHolder>
    )
}

const HeaderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  position: relative; 
  margin-bottom: 40px;
`

const IconView = styled.View`
  width: 40%;
`

const HeadingView = styled.View`
  width: 60%;
`

const TextWrapper = styled.View`
`

const ModalContent = styled.View`
  padding: 13px 50px;
`
export default OutOfRadius