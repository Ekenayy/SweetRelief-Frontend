import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form';
import { BASE_URL } from '@env'
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native'
import { Input, Span, BrownButton} from '../styles/Styles'

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

function Login ( {navigation, currentUser, setCurrentUser}) {

    const {register, handleSubmit, setValue} = useForm()
    const [errors, setErrors] = useState("")

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
        padding-top: 30px;
    `

    const TitleView = styled.View`
        padding:12px;
        margin-bottom:0px;
    `
    // const Input = styled.TextInput`
    //     background: #F3F5F6;
    //     width: 100%;
    //     border-radius:20px;
    //     padding-left: 12px;
    //     height: 50px;
    //     margin-top: 20px;
    //     border-radius: 20px;
    // `

    const FormTitle = styled.Text`
        font-size: 24px;
        color: #F7F8F3;
    `

    const LoginButton = styled(BrownButton)`
        margin-top: 10px;
    `

    // const Button = styled.TouchableOpacity`
    //     background: #03DAC5;
    //     width: 140px;
    //     margin: 12px;
    //     border-radius:20px;
    //     align-self: center
    // `

    // const Span = styled.Text`
    //     color: #F7F8F3
    //     padding: 12px;
    //     align-self: center
    // `

    const ErrorSpan = styled(Span)`
        color: white
    `

    const Body = styled.View`
        background: #BEA7E5;
        flex: 1;
    `
    const onSubmit = data => {

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

    // useEffect(() => {
    //     if (currentUser) {
    //         navigation.navigate('Main')
    //     }
    // }, [currentUser])

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
                <Span>Log in</Span>
            </LoginButton>
            <LoginButton onPress={() => navigation.navigate('SignUp')}>
                <Span>Sign Up</Span>
            </LoginButton>
            </Form>  
        </Body>   
    )

}

export default Login