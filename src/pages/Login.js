import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form';
import { BASE_URL } from '@env'
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, ActivityIndicator } from 'react-native'
import { Input, Span, BrownButton, DarkText, Text} from '../styles/Styles'

function Login ( {navigation, setCurrentUser}) {

    const {register, handleSubmit, setValue} = useForm()
    const [errors, setErrors] = useState("")
    const [attempts, setAttempts] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        register('email')
        register('password')
    }, [register])

    const H1 = styled.Text`
    font-size: 24px;
    color: blue;
    `

    const Form = styled.View`
        padding-left:12px;
        padding-top: 50px;
    `

    const TitleView = styled.View`
        padding:12px;
        margin-bottom:0px;
    `

    const FormTitle = styled.Text`
        font-size: 24px;
        color: #F7F8F3;
    `

    const LoginButton = styled(BrownButton)`
        margin-top: 10px;
    `

    const ErrorSpan = styled(Span)`
        color: red;
    `

    const Body = styled.View`
        background: #BEA7E5;
        flex: 1;
    `
    const SignUpView = styled.TouchableOpacity`
        align-self: center;
        margin-top: 15px;
    `

    const ResetView = styled(SignUpView)`
        margin-top: 30px;
    `
    const onSubmit = data => {
        setIsLoading(true);
        setErrors("")

        let formBody = {
            email: data.email.toLowerCase(),
            password: data.password
        }

        fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(r => r.json())
            .then(newUser => {
                if (newUser.error) {
                    setErrors(newUser.error)
                    setAttempts(attempts + 1)
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

    const handleSkip = () => {
        Alert.alert(
            "Without an account you won't have access to somey key features like reviewing or saving your favorite locations.",
            "Skip login",
            [
                {
                    text: "Login",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Skip Login", onPress: () => console.log('ok') }
            ]
          )
    }

    return (
        <Body>
            <Form>
            <TitleView>            
                <FormTitle>Login</FormTitle>
            </TitleView>
            <Input 
                placeholder="Email"
                onChangeText={text => setValue('email', text)}
            />
            <Input 
                placeholder="Passsword"
                secureTextEntry={true}
                onChangeText={text => setValue('password', text)}
            />
            {errors ? <ErrorSpan>{errors}</ErrorSpan> : null}
            <LoginButton onPress={handleSubmit(onSubmit)}>
                {isLoading ? <ActivityIndicator size="large" /> : <Span>Log in</Span>}
            </LoginButton>
            <SignUpView onPress={() => navigation.navigate('SignUp')}>
                <DarkText>Don't have an account yet? Sign up</DarkText>
            </SignUpView>
            <SignUpView onPress={() => handleSkip()}>
                <DarkText>Skip login for now</DarkText>
            </SignUpView>
            {attempts >= 3 ? <ResetView onPress={() => navigation.navigate('ResetPass')}>
                <DarkText>Forgot your password?</DarkText>
            </ResetView> : null}
            </Form>  
        </Body>   
    )

}

export default Login