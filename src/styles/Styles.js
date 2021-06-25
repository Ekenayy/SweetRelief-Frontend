import React from 'react'
import styled from 'styled-components'


export const Text = styled.Text`
    font-size: 14px;
    color: #F7F8F3;
`

export const DarkText = styled.Text`
    font-size: 14px;
    color: #1C1C1C;
`
export const Span = styled.Text`
    color: #F7F8F3
    padding: 12px;
    align-self: center
    font-weight: bold;
`
export const H2 = styled.Text`
    font-size: 20px;
    color: #1C1C1C;
`

export const Scroll = styled.ScrollView`
    margin-left: 15px;
`
export const Wrapper = styled.View`
    margin-left: 15px;
`

export const TouchView = styled.TouchableOpacity`
    padding-left: 15px;
`

export const Button = styled.TouchableOpacity`
    align-items: center;
    border-radius: 20px;
    width: 100px;
    align-self: center;
`

export const PurpButton = styled(Button)`
    background-color: #bea7e5;
`
export const BrownButton = styled(Button)`
    background-color: #F4A261
`
export const CloseView = styled.TouchableOpacity`
        align-self: flex-start;
        padding: 13px;
`

export const CloseText = styled.Text`
`

export const Input = styled.TextInput`
    background: #F3F5F6;
    width: 97%;
    border-radius:20px;
    padding-left: 12px;
    height: 50px;
    margin-top: 20px;
    border-radius: 20px;
`
export const Form = styled.View`
    padding-left:12px;
    padding-top: 30px;
`
export const Modal1 = styled.Modal`
`

export const ModalHolder = styled.View`
        flex: 1;
        margin-top: 200px;
        width: 90%;
        align-self: center;
    `

export const ModalForm = styled.View`
        padding:10px;
        background-color: white;
        border-radius: 20px;
        align-items: center;
    `
