import React from 'react' 
import styled from 'styled-components'
import { Text, DarkText, Scroll } from '../styles/Styles'

function PayOptions( {modalVisible, setModalVisible}) {

    const Button = styled.TouchableOpacity`
        background: #03DAC5;
        width: 150px;
        border-radius:20px;
        align_self: center;
        margin-top: 5px;
        margin-right: 5px;
    `
    return (
        <>
            <DarkText>Hello From Pay Options</DarkText>
            <Button onPress={() => setModalVisible(!modalVisible)}>
                <Text>Close Me</Text>
            </Button>
        </>
    )
}

export default PayOptions