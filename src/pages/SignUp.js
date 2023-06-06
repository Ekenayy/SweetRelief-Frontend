import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Alert, ActivityIndicator } from 'react-native'
import {useForm} from 'react-hook-form'
import { BASE_URL } from '@env'
import { Input, Span, DarkText, BrownButton } from '../styles/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignUp ( {navigation, setCurrentUser, handleSkip} ) {

    const [errors, setErrors] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

    const {register, handleSubmit, setValue} = useForm()

    useEffect(() => {
        register('name')
        register('email')
        register('password')
        register('email_token')
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
                    // setCurrentUser(newUser.user);
                    setUserCreated(true);
                    sendEmailVerification(newUser.user);
                    saveData(newUser.token);
                    setUserEmail(newUser.user.email);
                }
                setIsLoading(false);
            })
    }

    const sendEmailVerification = (stateUser) => {

        fetch(`${BASE_URL}/send_email_verification`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {email: stateUser.email}
            )
        })
            .then(r => r.json())
            .then(newUser => {
                if (newUser.errors) {
                    setErrors(newUser.errors)
                } else {
                    Alert.alert(newUser.success)
                }
            })
    }

    const onVerificationSubmit = data => {

        let formBody = {
            token: data.email_token,
            email: userEmail
        }

        fetch(`${BASE_URL}/verify_email`, {
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
                    Alert.alert(newUser.success)
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

    const SignupForm = () => {
        return (
            <>
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
            </>
        )
    }

    const VerifyForm = () => {
        return (
            <>
                <Input 
                    placeholder="Verification Code"
                    onChangeText={text => setValue('email_token', text)}
                    autoCorrect={false}
                />
                <SignUpButton onPress={handleSubmit(onVerificationSubmit)}>
                    {isLoading ? <ActivityIndicator size="large"/> : <Span>Verify</Span> }
                </SignUpButton>
            </>
        )
    }

    return (
        <Body>
            <Form>
                <TitleView>            
                    <FormTitle>Sign Up</FormTitle>
                    <DarkText>No unwanted emails. No data selling.</DarkText>
                </TitleView>
                {userCreated ? <VerifyForm/> : <SignupForm/>}
                <SignUpView onPress={() => handleSkip('Signup')}>
                    <DarkText>Skip sign up for now</DarkText>
                </SignUpView>
            </Form>   
        </Body> 
    )

}

export default SignUp