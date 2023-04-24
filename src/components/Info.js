import React from 'react'
import { Text, Wrapper, H2, CloseView, WebHead, WebViewCon } from '../styles/Styles'
import styled from "styled-components";
import { MaterialIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import {HOME_URL, SUPPORT_MAIL} from '@env'

function Info ( {setModalVisible} ) {

    const BigView = styled(WebViewCon)`
        background-color: 'rgba(52, 52, 52, 0.85)';
        height: 100%;
    `
    const HeaderView = styled(WebHead)`
        background-color: transparent;
        padding-top: 5px;
    `

    const HeaderText = styled(H2)`
        color: #F7F8F3
        font-weight: 500;
    `

    const MainSection = styled(Wrapper)`
        margin-top: 20px;
    `

    const SectionWrapper = styled.View`
        margin-left: 0px;
        margin-top: 0px;
        margin-right: 5px;        
        padding: 15px;
        padding-left: 5px;
        border-bottom-width: .5px;
        border-color: #F7F8F3;
    `

    const DetailsWrapper = styled(Wrapper)`
        margin-top: 2px;
        padding-top: 10px;
        margin-left: 10px;
    `

    const DetailsText = styled(Text)`
        color: #F7F8F3;
        margin-bottom: 3px;
        font-weight: 400;
        padding-bottom: 10px;
    `

    const TouchView = styled.TouchableOpacity`
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
                <SectionWrapper>
                    <HeaderText>About</HeaderText>
                    <DetailsWrapper>
                        <TouchView onPress={() => Linking.openURL(SUPPORT_MAIL)}>
                            <DetailsText>Contact us</DetailsText>
                        </TouchView>
                        <TouchView onPress={() => Linking.openURL(`${HOME_URL}/privacy`)}> 
                            <DetailsText>Privacy Policy</DetailsText>
                        </TouchView>
                        <TouchView onPress={() => Linking.openURL(`${HOME_URL}/terms`)}> 
                            <DetailsText>Terms of Service</DetailsText>
                        </TouchView>
                    </DetailsWrapper>
                </SectionWrapper>
            </MainSection>
        </BigView>
    )
}

export default Info