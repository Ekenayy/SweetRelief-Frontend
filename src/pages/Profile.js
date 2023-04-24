import React, { useState } from 'react'
import styled from 'styled-components'
import { DarkText, H2, CloseView } from '../styles/Styles'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import EditUser from '../components/EditUser'
import { BlurView } from 'expo-blur';
import logo from '../photos/WaterdropWordless1.png'
import {StyleSheet} from 'react-native'

function Profile ( {navigation, currentUser, setCurrentUser}) {

    const [selected, setSelected] = useState('view')
    const [modalVisible, setModalVisible] = useState(false)

    const Body = styled.View`
        flex: 1;
    `

    const Header = styled.View`
        padding-top: 15px;
        background: #bea7e5;
        height: 20%;
    `

    const TextView = styled.View`
        align-self: center;
        padding-top: 0px;
    `

    const OptionsView = styled.View`
        flex-direction: row;
        justify-content: space-around;
        margin-top: 30px;
    `

    const TouchView = styled.TouchableOpacity`
        flex-direction: row;
        align-items: center;
        border-bottom-width: ${props => props.selected ? '2px': '0px'}
        border-color: #F7F8F3
        padding-bottom: 3px;
    `
    const EditView = styled(TouchView)`
    `
    const MainInfoView = styled.View`
        flex: 1;
        margin-top: 10px;
    `

    const AllInfoView = styled.View`
        margin-bottom: 10px;
    `
    const HeaderName = styled(H2)`
        font-size: 30px;
    `
    const Title = styled(H2)`
        align-self: center;
        margin-bottom: 15px;
        font-weight: bold;
    `
    const OneInfoView = styled.View`
        flex-direction: row;
        padding-left: 30px;
        margin-bottom: 5px;
        border-bottom-width: .5px;
        border-color: #a6a3a8;
        padding-bottom: 10px;
        padding-top: 10px;
    `

    const InfoText = styled(DarkText)`
        align-self: center;
        margin-left: 40px;
        font-size: 18px;
    `

    const LogoView = styled(CloseView)`
        padding-bottom: 0px;
        padding-top: 0px;
        height: 70px;
        width: 100%;
    `

    const Logo = styled.Image`
        height: 70px;
        width: 70px;
    `

    const ViewInfo = () => {
        return (
            <>
                <Title>View Info</Title>
                <AllInfoView>
                    <OneInfoView>
                        <Ionicons name="person-outline" size={26} color="#F4A261"  />
                        <InfoText>{currentUser.name}</InfoText>
                    </OneInfoView>
                    <OneInfoView>
                        <Fontisto name="email" size={26} color="#F4A261"  />
                        <InfoText numberOfLines={2}>{currentUser.email}</InfoText>
                    </OneInfoView>
                    <OneInfoView>
                        <Ionicons name="eye-outline" size={26} color="#F4A261"  />
                        <InfoText>******</InfoText>
                    </OneInfoView>
                </AllInfoView>
            </>
        )
    }


    const EditInfo = () => {
        return (
            <>
                <Title>Edit Info</Title>
                <EditUser currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </>
        )
    }

    const MainInfo = () => {
        switch (selected) {
            case 'view': 
                return <ViewInfo/>
            case 'edit':
                return <EditInfo/>
            default: 
                return <ViewInfo/>
        }
    }

    return (
        <Body>
                <Header>
                    <LogoView onPress={() => navigation.navigate('Main')}>
                        <Logo source={logo}></Logo>
                    </LogoView>
                    <TextView>
                        <HeaderName>{currentUser.name}</HeaderName>
                    </TextView>
                    <OptionsView>
                        <TouchView selected={selected == 'view'} onPress={() => setSelected('view')}>
                            <MaterialCommunityIcons name="magnify" size={24} color="black" style={{marginRight: 5}}/>
                            <DarkText>View</DarkText>
                        </TouchView>
                        <EditView selected={selected == 'edit'} onPress={() => setSelected('edit')}>
                            <SimpleLineIcons name="pencil" size={22} color="black" style={{marginRight: 5}}/>
                            <DarkText>Edit</DarkText>
                        </EditView>
                    </OptionsView>
                </Header>
                <MainInfoView modalVisible={modalVisible} showsVerticalScrollIndicator={false}>
                    <MainInfo/>
                </MainInfoView>
                {modalVisible ? <BlurView intensity={100} blurTint='light' style={[StyleSheet.absoluteFill]}> 
                </BlurView> : null}                
        </Body>
    )
}

export default Profile