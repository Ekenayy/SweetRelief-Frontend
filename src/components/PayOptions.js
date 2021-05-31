import React, {useRef, useState} from 'react' 
import styled from 'styled-components'
import { Text, DarkText, Wrapper, Span, H2 } from '../styles/Styles'
import { MaterialIcons } from '@expo/vector-icons';

function PayOptions( {modalVisible, setModalVisible}) {

    const [selected, setSelected] = useState("")

    const moneyButton = useRef()

    const Button = styled.TouchableOpacity`
        background: #E379DF;
        width: 150px;
        border-radius:20px;
        align_self: center;
        margin-top: 5px;
        margin-right: 5px;
    `

    const MoneyButton = styled(Button)`
        background-color: ${props => props.selected == 'money' ? '#aab3af' : '#F3F5F6'}
    `

    const AllOptionsView = styled(Wrapper)`
        margin-bottom: 20px;
        margin-top: 10px;
        margin-left: 0px;
    `

    const OptionsText = styled(Span)`
        color: black;
    `

    const OneOptionView = styled.View`
        flex-direction: row;
    `

    const CloseView = styled.TouchableOpacity`
        align-self: flex-start;
        padding: 0;
    `

    const CloseText = styled.Text`
        align-self: flex-start;
    `

    const changeColors = (word) => {
        let startingColor = '#F3F5F6'

        if (word == 'money') {
            moneyButton.current.setNativeProps({
                backgroundColor: '#aab3af'
            })
        }
    }

    return (
        <>
            <CloseView onPress={() => setModalVisible(!modalVisible)}>
                <CloseText>❌</CloseText>
            </CloseView>
            <H2>Pay with</H2>
            <AllOptionsView>
                    <MoneyButton selected={selected} onPress={() => setSelected('money')} >
                            <OptionsText>Money</OptionsText>
                    </MoneyButton>                
            </AllOptionsView>
            {selected ? <Button onPress={() => setModalVisible(!modalVisible)}>
                <Span>Confirm</Span>
            </Button> : null}
        </>
    )
}

export default PayOptions