import React from 'react'
import styled from 'styled-components'

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


    return (
        <Body>
            <Title>SweetRelief</Title>
        </Body>
    )
}

export default SplashScreen