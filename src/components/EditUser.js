import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DarkText, PurpButton, Span, Input } from '../styles/Styles'
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '@env'
import {useForm} from 'react-hook-form'
import {Alert} from 'react-native'

function EditUser ( {currentUser, setCurrentUser}) {

    const {register, handleSubmit, setValue} = useForm()
    
    const [errors, setErrors] = useState("")
    const [passwordClicked, setPasswordClicked] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        register('name')
        register('password')
        register('email')
        register('newPassword')
    }, [register])

    const Form = styled.View`
        padding-left: 12px;
        margin-bottom: 20px;
    `

    const EditInput = styled(Input)`
        background: #F4A261
        opacity: .6
    `
    const ButtonView = styled.View`
        margin-top: 10px;
        flex-direction: row;
        align-self: center;
    `
    const ErrorSpan = styled(Span)`
        color: red;
    `

    const ChangePassView = styled.TouchableOpacity`
        align-self: center;
        flex-direction: row;
        align-items: center;
    `

    const handleInfoEdit = data => {
        
        let formBody = {}

        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined) {
                formBody[key]=value
            }
        }
        

        fetch(`${BASE_URL}/users/${currentUser.id}`, {
            method: 'PATCH', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(r=> r.json())
            .then(updatedUser => {
                if (updatedUser.errors) {
                    setErrors(updatedUser.errors)
                    Alert.alert('Whoops! There was a problem updating your profile. Please try again.')
                } else if (formBody.password) {
                    setCurrentUser(updatedUser)
                    Alert.alert('Password sucessfully changed!')
                } else {
                    setCurrentUser(updatedUser)
                    Alert.alert('Success!')
                }
            })
    }

    const handleCheckPassword = data => {

        let formBody = {
            password: data.password,
            email: currentUser.email
        }

        fetch(`${BASE_URL}/check_password`, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(r=> r.json())
            .then(result => {
                if (result.success) {
                    setSuccess(true)
                    setErrors(null)
                } else if (result.error) {
                    setErrors(result.error)
                }
            })
    }

    const handleChangePassowrd = data => {

        if (data.password === data.newPassword) {
            handleInfoEdit({password: data.password})
        } else {
            setErrors("Passwords do not match")
        }
        
    }
    
    const EditInfo = () => {

        return (
            <>
                <EditInput
                    placeholder="Name..."
                    defaultValue={currentUser.name}
                    multline={true}
                    onChangeText={text => setValue('name', text)}
                />
                <EditInput
                    placeholder="Email.."
                    defaultValue={currentUser.email}
                    onChangeText={text => setValue('email', text)}
                />
                {errors ? errors.map( (error) => <ErrorSpan key={error}>*{error}</ErrorSpan>) : null}
                <ChangePassView onPress={() => setPasswordClicked(true)}>
                    <Ionicons name="eye-outline" size={26} color="#F4A261" style={{marginRight: 10}} />
                    <DarkText>Change Password</DarkText>
                </ChangePassView>
                <ButtonView>
                    <PurpButton onPress={handleSubmit(handleInfoEdit)}>
                        <Span>Submit</Span>
                    </PurpButton>
                </ButtonView>
            </>
        )
    }

    const EditPassword = () => {

        if (!success) {
            return (
                <>
                <EditInput
                    placeholder="Type your last password here.."
                    placeholderTextColor="black"
                    secureTextEntry={true}
                    onChangeText={text => setValue('password', text)}
                />
                {errors && <ErrorSpan>{errors}</ErrorSpan>}
                <ButtonView>
                    <PurpButton onPress={handleSubmit(handleCheckPassword)}>
                        <Span>Submit</Span>
                    </PurpButton>
                </ButtonView>
                </>
            )
        } 
        else {
            return (
                <> 
                    <EditInput
                        placeholder="Type new password here.."
                        placeholderTextColor="black"
                        secureTextEntry={true}
                        onChangeText={text => setValue('newPassword', text)}
                    />
                    <EditInput
                        placeholder="Re-type pasword.."
                        placeholderTextColor="black"
                        secureTextEntry={true}
                        onChangeText={text => setValue('password', text)}
                    /> 
                    {errors && <ErrorSpan>{errors}</ErrorSpan>}
                    <ButtonView>
                        <PurpButton onPress={handleSubmit(handleChangePassowrd)}>
                            <Span>Change Password</Span>
                        </PurpButton>
                    </ButtonView>
                </>
            )
        }
    }

    return (
        <Form>
            {passwordClicked ? <EditPassword/> : <EditInfo/>}
        </Form>
    )

}

export default EditUser