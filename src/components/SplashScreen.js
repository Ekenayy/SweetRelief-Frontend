import React from 'react'
import styled from 'styled-components'
import logo from '../photos/Logo_purp_bg.png'

function SplashScreen () {

    const Body = styled.View`
        flex: 1;
        background-color: #BEA7E5
    `

    const Title = styled.Text`
        font-size: 34px;
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


    return (
        <Body>
            <LogoView>
                <Logo source={logo}/>
            </LogoView>
        </Body>
    )
}

export default SplashScreen