import React from 'react'
import {ModalHolder, ModalForm, H1, CloseView, DarkText, PurpButton, Span } from '../../styles/Styles'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components';

function NoUser ({setModalVisible, setLoginSkipped}) {

  const handleSignUpPress = () => {
    setModalVisible(false);
    setLoginSkipped(false);
  }

    return (
        <ModalHolder>
            <ModalForm>
              <CloseView onPress={() => setModalVisible(false)}>
                <MaterialIcons name="cancel" size={30} color="#bea7e5" />
              </CloseView>
              <ModalContent>
                <HeaderWrapper>
                  <IconView>
                    <MaterialCommunityIcons name="account-question" size={100} color="#F4A261" />
                  </IconView>
                  <HeadingView>
                    <H1>Looks like you forgot to log in</H1>
                  </HeadingView>
                </HeaderWrapper>
                <TextWrapper>
                    <DarkText>Login to access this feature</DarkText>
                    <PurpButton onPress={handleSignUpPress}>
                      <Span>Login</Span>
                    </PurpButton>
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
  align-self: center;
`

const HeadingView = styled.View`
  width: 60%;
`

const TextWrapper = styled.View`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
`

const ModalContent = styled.View`
  padding: 13px 30px;
`
export default NoUser