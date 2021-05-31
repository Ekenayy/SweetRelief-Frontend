import React, {useRef, useState} from 'react' 
import styled from 'styled-components'
import { Text, DarkText, Wrapper, Span, H2 } from '../styles/Styles'
import { MaterialIcons } from '@expo/vector-icons';

function PayOptions( {modalVisible, setModalVisible}) {

    const [selected, setSelected] = useState("")
    const [id, setId] = useState("")

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

    const handleClick = () => {
        if (selected == 'money') {
            makePayment()
        }
    }

    const makePayment = () => {

        // I need to collect this information and send it over as params to the backend
        let formBody = {
            "intent": "CAPTURE",
                "purchase_units": [{
                    "amount": {
                        "currency_code": "USD",
                        "value": "100.00"
                    },
                    "payer": {
                        "email_address": "sb-4bgqp6345050@personal.example.com"
                    },
                    "payee": {
                        "email_address": "sb-yqqld6344344@business.example.com"
                    },
                    "payment_instruction": {
                        "disbursement_mode": "INSTANT",
                    }
                }],
        }

        fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer A21AAKP5HJPkiw6gihmakQDotbgv2-eYCu-dVvas-IGVsWkvkicg8rr2tRzkxda46rTmizc_JYz16ilnzYOfEqOkZN9PrKrwQ",
                'PayPal-Partner-Attribution-Id': 'FLAVORsb-yqqld6344344_MP'
            },
            body: JSON.stringify(formBody)
        })
            .then(r => r.json())
            .then(data => {
                setId(data.id)
                let url = data.links[1].href
                // console.log(data.links[1].href)
                approvePayment(data.id, url)
            })
        
        // if (response) {
        //     setModalVisible(!modalVisible)
        // }
    }

    const approvePayment = (fetchId, url) => {

        fetch(`${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer A21AAKP5HJPkiw6gihmakQDotbgv2-eYCu-dVvas-IGVsWkvkicg8rr2tRzkxda46rTmizc_JYz16ilnzYOfEqOkZN9PrKrwQ",
                'PayPal-Partner-Attribution-Id': 'FLAVORsb-yqqld6344344_MP'
            },
        })
            .then(r => r.json())
            .then(data => {
                console.log('in authorize...')
                console.log(data)
                // capturePayment()
            })
    }

    // Once I receive a response back from the DB I use the id to capture payment OR redirect in backend
    const capturePayment = () => {

        fetch(`https://api.sandbox.paypal.com/v2/checkout/orders/${id}/capture`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer A21AAKP5HJPkiw6gihmakQDotbgv2-eYCu-dVvas-IGVsWkvkicg8rr2tRzkxda46rTmizc_JYz16ilnzYOfEqOkZN9PrKrwQ",
                'PayPal-Partner-Attribution-Id': 'FLAVORsb-yqqld6344344_MP'
            },
            body: JSON.stringify({})
        })
            .then(r => r.json())
            .then(data => {
                console.log('in capture payments')
                console.log(data)
            })
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
            {selected ? 
            <Button onPress={handleClick}>
                <Span>Confirm</Span>
            </Button> : 
            null}
        </>
    )
}

export default PayOptions