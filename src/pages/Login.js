import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form';
import { BASE_URL } from '@env'
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native'
import { Input, Span, BrownButton, DarkText} from '../styles/Styles'

function Login ( {navigation, currentUser, setCurrentUser}) {

    const {register, handleSubmit, setValue} = useForm()
    const [errors, setErrors] = useState("")
    const [attempts, setAttempts] = useState(0)

    const H1 = styled.Text`
    font-size: 24px;
    color: blue;
    `
    useEffect(() => {
        register('email')
        register('password')
    }, [register])

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
            {/* {errors ? errors.map( (error) => <ErrorSpan key={error}>*{error}</ErrorSpan>) : null} */}
            <LoginButton onPress={handleSubmit(onSubmit)}>
                <Span>Log in</Span>
            </LoginButton>
            <SignUpView onPress={() => navigation.navigate('SignUp')}>
                <DarkText>Don't have an account yet? Tap here to sign up</DarkText>
            </SignUpView>
            {attempts >= 3 ? <ResetView onPress={() => console.log('tapped')}>
                <DarkText>Forgot your password? Tap here to reset</DarkText>
            </ResetView> : null}
            </Form>  
        </Body>   
    )

}

export default Login