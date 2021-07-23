import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form';
import { BASE_URL } from '@env'
import styled from 'styled-components';
import { Input, Span, BrownButton, DarkText, ErrorSpan, H2, Wrapper} from '../styles/Styles'
import {Alert} from 'react-native'

function ResetPass ( {navigation, currentUser, setCurrentuser}) {

    const {register, handleSubmit, setValue} = useForm()
    const [errors, setErrors] = useState("")

    useEffect(() => {
        register('email')
    }, [register])

    const Title = styled(H2)`
        align-self: center;
    `

    const SubmitBtn = styled(BrownButton)`
        width: 140px;
        margin-top: 25px;
    `

    const Body = styled.View`
        background: #BEA7E5;
        flex: 1;
    `

    const Form = styled.View`
        padding-top: 80px;
        margin-left: 20px;
    `

    const onSubmit = data => {

        fetch(`${BASE_URL}/check_email`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: data.email.toLowerCase()})
        })
            .then(r => r.json())
            .then(data => {
                if (data.error) {
                    setErrors(data.error)
                } else {
                    Alert.alert('Success! Password reset email sent')
                    navigation.navigate('Login')
                }
            })
        setErrors(null)
    }

    return (
        <Body>
            <Form>
                <Title>Forgotten Password?</Title>
                <Input
                    placeholder="Email..."
                    onChangeText={text => setValue('email', text)}
                />
                {errors ? <ErrorSpan>{errors}</ErrorSpan> : null}
                <SubmitBtn onPress={handleSubmit(onSubmit)}>
                    <Span>Send email</Span>
                </SubmitBtn>
            </Form>
        </Body>
    )
}

export default ResetPass