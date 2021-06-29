import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Alert } from 'react-native'
import {useForm} from 'react-hook-form'
import { BASE_URL } from '@env'
import { Input, Span, DarkText, Button, BrownButton} from '../styles/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignUp ( {navigation, currentUser, setCurrentUser} ) {

    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState("")

    const {register, handleSubmit, setValue} = useForm()

    useEffect(() => {
        register('name')
        register('email')
        register('password')
    }, [register])

    const Form = styled.View`
        padding-left:12px;
        padding-top: 30px;
    `

    const TitleView = styled.View`
        padding:12px;
        margin-bottom:0px;
    `
    const FormTitle = styled.Text`
        font-size: 24px;
        color: #F7F8F3;
    `
    const ErrorSpan = styled(Span)`
        color: red
    `
    const Body = styled.View`
        background: #BEA7E5;
        flex: 1;
    `
    const SignUpButton = styled(BrownButton)`
        margin-top: 10px;
    `
    const LoginView = styled.TouchableOpacity`
        align-self: center;
        margin-top: 15px;
    `
    const onSubmit = data => {
        
        let formBody = {
            name: data.name,
            email: data.email.toLowerCase(),
            password: data.password
        }


        fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(r => r.json())
            .then(newUser => {
                if (newUser.errors) {
                    setErrors(newUser.errors)
                } else {
                    setCurrentUser(newUser.user)
                    saveData(newUser.token)
                }
            })
    }

    const saveData = async (thisToken) => {
        try {
            await AsyncStorage.setItem('token', thisToken)
        } catch (e) {
            Alert.alert('Failed to save the token to storage')
        }
    }

    return (
        <Body>
            <Form>
                <TitleView>            
                    <FormTitle>Sign Up</FormTitle>
                </TitleView>
                <Input 
                    placeholder="First and Last Name"
                    onChangeText={text => setValue('name', text)} 
                    autoCorrect={false}
                /> 
                <Input 
                    placeholder="Passsword"
                    secureTextEntry={true}
                    onChangeText={text => setValue('password', text)}
                />
                <Input 
                    placeholder="Email"
                    onChangeText={text => setValue('email', text)}
                    autoCorrect={false}
                />
                {/* {errors ? <ErrorSpan>{errors}</ErrorSpan> : null} */}
                {errors ? errors.map( (error) => <ErrorSpan key={error}>*{error}</ErrorSpan>) : null}
                <SignUpButton onPress={handleSubmit(onSubmit)}>
                    <Span>Create account</Span>
                </SignUpButton>
                <LoginView onPress={() => navigation.navigate('Login')}>
                    <DarkText>Already have an account? Tap here to log in</DarkText>
                </LoginView>
            </Form>   
        </Body> 
    )

}

export default SignUp