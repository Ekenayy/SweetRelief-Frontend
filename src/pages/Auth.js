import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form';
import { BASE_URL } from '@env'
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, ActivityIndicator } from 'react-native'
import { Input, Span, BrownButton, DarkText, Form } from '../styles/Styles'

const H1 = styled.Text`
font-size: 24px;
color: blue;
`

const TitleView = styled.View`
padding:12px;
margin-bottom:0px;
`

const FormTitle = styled.Text`
font-size: 24px;
color: #F7F8F3;
`

const SubmitBtn = styled(BrownButton)`
  margin-top: 10px;
`

const ErrorSpan = styled(Span)`
color: red;
`

const Body = styled.View`
background: #BEA7E5;
flex: 1;
`
const LoginView = styled.TouchableOpacity`
align-self: center;
margin-top: 15px;
`

const ResetView = styled(LoginView)`
margin-top: 30px;
`

function Auth ( {navigation, setCurrentUser, handleSkip, currentUser} ) {

  const {register, handleSubmit, setValue} = useForm();
  const [errors, setErrors] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("Login");
  const [userCreated, setUserCreated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    register('name')
    register('email')
    register('password')
    register('email_token')
  }, [register])

  const handleLogin = data => {
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
            if (!newUser.user.email_verified) {
                console.log('email not verified');
            }
        }
        setIsLoading(false);
      })
  }

  const handleSignUp = data => {
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
            setErrors(newUser.errors);
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

  const sendEmailVerification = (newUser) => {

    fetch(`${BASE_URL}/send_email_verification`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
          {email: newUser.email}
      )
    })
      .then(r => r.json())
      .then(newUser => {
        if (newUser.errors) {
            setErrors(newUser.errors);
        } else {
            Alert.alert(newUser.success);
            setContent("Verify Email");
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

  return (
    <Body>
        <Form>
        <TitleView>            
            <FormTitle>{content}</FormTitle>
        </TitleView>
        { content == 'Sign Up' &&
          <Input 
            placeholder="First and Last Name"
            onChangeText={text => setValue('name', text)} 
            autoCorrect={false}
          /> 
        }
        { content != "Verify Email" && 
          <Input 
            placeholder="Email"
            onChangeText={text => setValue('email', text)}
          />
        }
        { (content == "Sign Up" || content == "Login") && 
          <Input 
            placeholder="Passsword"
            secureTextEntry={true}
            onChangeText={text => setValue('password', text)}
          />
        }
        { content == "Verify Email" && 
        <Input 
          placeholder="Verification Code"
          onChangeText={text => setValue('email_token', text)}
          autoCorrect={false}
        />
        }
        {errors ? <ErrorSpan>{errors}</ErrorSpan> : null}
        { content == 'Login' && 
          <SubmitBtn onPress={handleSubmit(handleLogin)}>
            {isLoading ? <ActivityIndicator size="large" /> : <Span>Log in</Span>}
          </SubmitBtn>
        }
        { content == 'Sign Up' && 
          <SubmitBtn onPress={handleSubmit(handleSignUp)}>
            {isLoading ? <ActivityIndicator size="large" /> : <Span>Sign Up</Span>}
          </SubmitBtn>
        }
        { content == "Verify Email" &&
          <SubmitBtn onPress={handleSubmit(onVerificationSubmit)}>
            {isLoading ? <ActivityIndicator size="large"/> : <Span>Verify</Span> }
          </SubmitBtn>
        }
        {content == 'Login' && <LoginView onPress={() => setContent('Sign Up')}>
            <DarkText>Don't have an account yet? Sign up</DarkText>
        </LoginView>}
        {content == 'Sign Up' && <LoginView onPress={() => setContent('Login')}>
            <DarkText>Already have an account? Tap here to log in</DarkText>
        </LoginView>}
        <LoginView onPress={() => handleSkip('Login')}>
            <DarkText>Skip login for now</DarkText>
        </LoginView>
        {attempts >= 3 ? <ResetView onPress={() => navigation.navigate('Reset Password')}>
            <DarkText>Forgot your password?</DarkText>
        </ResetView> : null}
        </Form>  
    </Body>   
  )
}

export default Auth;