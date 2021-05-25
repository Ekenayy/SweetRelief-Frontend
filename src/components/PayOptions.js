import React from 'react' 
import styled from 'styled-components'
import { Text, DarkText, Wrapper, Span, H2 } from '../styles/Styles'

function PayOptions( {modalVisible, setModalVisible}) {

    const Button = styled.TouchableOpacity`
        background: #E379DF;
        width: 150px;
        border-radius:20px;
        align_self: center;
        margin-top: 5px;
        margin-right: 5px;
    `

    const MoneyButton = styled(Button)`
        background-color: #F3F5F6;
    `

    const OptionsView = styled(Wrapper)`
        margin-bottom: 20px;
        margin-top: 10px;
        margin-left: 0px;
    `

    const OptionsText = styled(Span)`
        color: black;
    `

    return (
        <>
            <H2>Pay with</H2>
            <OptionsView>
                <MoneyButton>
                    <OptionsText>Money</OptionsText>
                </MoneyButton>
            </OptionsView>
            <Button onPress={() => setModalVisible(!modalVisible)}>
                <Span>Close Me</Span>
            </Button>
        </>
    )
}

export default PayOptions