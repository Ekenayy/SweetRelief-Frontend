import React from 'react'
import styled from 'styled-components'
import logo from '../photos/Logo_purp_bg.png'
import {ActivityIndicator} from 'react-native'

function SplashScreen () {

    const Body = styled.View`
        flex: 1;
        background-color: #BEA7E5
    `

    const Words = styled.Text`
        font-size: 16px;
        color: #1C1C1C;
        align-self: center;
        padding-top: 30px;
    `

    const LogoView = styled.View`
        padding-top: 100px;
        align-self: center;
        height: 50%;
        width: auto;
    `

    const Logo = styled.Image`
    `

    const LoadingView = styled.View`
        flex-direction: row;
        align-items: center;
    `


    return (
        <Body>
            <LogoView>
                <Logo source={logo}/>
            </LogoView>
                <ActivityIndicator size='large' color='#F7F8F3'/>
        </Body>
    )
}

export default SplashScreen