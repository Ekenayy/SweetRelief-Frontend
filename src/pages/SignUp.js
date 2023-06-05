import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Alert, ActivityIndicator } from 'react-native'
import {useForm} from 'react-hook-form'
import { BASE_URL } from '@env'
import { Input, Span, DarkText, BrownButton } from '../styles/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignUp ( {navigation, setCurrentUser, handleSkip} ) {

    const [errors, setErrors] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const {register, handleSubmit, setValue} = useForm()

    useEffect(() => {
        register('name')
        register('email')
        register('password')
    }, [register])

    const Form = styled.View`
        padding-left:12px;
        padding-top: 50px;
    `

    const TitleView = styled.View`
        display: flex;
        flex-direction: column;
        gap: 10px;
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
    const SignUpView = styled.TouchableOpacity`
        align-self: center;
        margin-top: 15px;
    `
    const onSubmit = data => {
        setIsLoading(true);

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
                setIsLoading(false);
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
                    <DarkText>No unwanted emails. No data selling.</DarkText>
                </TitleView>
                <Input 
                    placeholder="First and Last Name"
                    onChangeText={text => setValue('name', text)} 
                    autoCorrect={false}
                /> 
                <Input 
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => setValue('password', text)}
                />
                <Input 
                    placeholder="Email"
                    onChangeText={text => setValue('email', text)}
                    autoCorrect={false}
                />
                {errors ? errors.map( (error) => <ErrorSpan key={error}>*{error}</ErrorSpan>) : null}
                <SignUpButton onPress={handleSubmit(onSubmit)}>
                    {isLoading ? <ActivityIndicator size="large"/> : <Span>Create account</Span> }
                </SignUpButton>
                <SignUpView onPress={() => navigation.navigate('Login')}>
                    <DarkText>Already have an account? Tap here to log in</DarkText>
                </SignUpView>
                <SignUpView onPress={() => handleSkip('Signup')}>
                    <DarkText>Skip sign up for now</DarkText>
                </SignUpView>
            </Form>   
        </Body> 
    )

}

export default SignUp